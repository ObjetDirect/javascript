/* jshint jQuery: false, define: false */

/**
 * @file This jQuery plugin add a new method to serialize a form as a JSON object
 * @version 1.0
 * @author Julien Roche
 * @copyright MIT
 */

(function(){
	"use strict";

	function definition($){
		$.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();

            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }

                    o[this.name].push(this.value || "");

                } else {
                    o[this.name] = this.value || "";
                }
            });

            return o;
        };
	}

	if (typeof module === "object" && typeof module.exports === "object") {
		// Node approach
		var jqInstance = window.jQuery ? window.jQuery : module.require("jquery");
		jqInstance && definition(jqInstance);

	} else if (typeof define === "function" && define.amd) {
		// AMD approach
		define("jquery.serializeObject", ["jquery"], definition);

	} else if (window.jQuery) {
		// Classical way
		definition(jQuery);
	}
}());