/*
* Copyright 2012 (c) Objet Direct
* Dual licensed under the MIT or GPL Version 2 licenses.
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

/**
 * Plugin to put some globalizations
 */
window.jQuery && (function($){
	if($.translate){
		// Already loaded ?
		return;
	}

	/**
	 * Options
	 */
	$.translate = {
		defaultLanguage: navigator.language,
		pathLanguage: function(language){ 
		    return language + ".js"; 
		},
		loadLanguage: function(){
		    $("head:first").append($("<script />",  { "src": $.translate.pathLanguage($.translate.defaultLanguage) }));
		},
		autoLoad: true,
		properties: {}
	};
	
	/**
	 * Try to translate the inner text, or the attribute if needed
	 */
	$.fn.translate = function() {
	    if(!$.translate || !$.translate.properties){
			// The plugin is not really available ...
	        return;
	    }
	    
        var jSelf = $(this), dataTranslate = jSelf.attr("data-translate");
        if(dataTranslate){
            $.each(dataTranslate.split(";"), function(index, translate){
                var index = translate.indexOf(":");
            
                if(index > 0){ // We need an attribute name !
                    jSelf.attr(translate.substring(0, index), $.translate.properties[translate.substring(index + 1)]);
                    
                } else {
                    jSelf.text($.translate.properties[translate]);
                }
            });
            
            jSelf.removeAttr("data-translate"); // Shall we keep it ? In the case that we change the globalization on the fly ?
        }
    };
	
	/**
	 * When the DOM is ready, we try to translate the elements
	 */
	 $(document).ready(function(){
		if(!$.translate || !$.translate.properties){
			// The plugin is not really available ...
	        return;
	    }
		
		// Now, we try to load the default globalization language. We will check first which one we will use.
        $.translate.autoLoad && $.translate.loadLanguage();
	 
		// We try to translate the elements
        $("[data-translate]").each(function (index, elt) { $(elt).translate(); });
		
		// Each time a node is inserted, we try to translate it !     
		$(document).bind("DOMNodeInserted", function(event){
			var jElement = $(event.srcElement ? event.srcElement : event.target);
			jElement.translate();
			jElement.find("[data-translate]").each(function(index, elt){ $(elt).translate(); });
		});
    });
})(jQuery);