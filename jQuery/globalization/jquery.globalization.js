/**
 * Plugin to put some globalizations
 */
windows.jQuery && (function($){
	if($.translate){
		// Already loaded ?
		return;
	}

	/**
	 * Options
	 */
	$.translate = {
		defaultLanguage: navigator.language,
		pathLanguage: function(language){ return language + ".js" },
		properties: {}
	});
	
	/**
	 * Override the HTML method to translate when we need
	 */
	 var originalHtmlMethod = $.fn.html;
	 
	 $.fn.html = function (htmlContent){
		var toReturn = originalHtmlMethod(htmlContent);
		this.translate();
		this.find("[data-translate]").each(function(index, elt){ $(elt).translate(); });
		return toReturn;
	 }
	
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
        $("head:first").append($("<script />",  { "src": $.translate.pathLanguage($.translate.defaultLanguage) }));
	 
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