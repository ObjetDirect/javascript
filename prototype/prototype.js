/* jshint define: false */

/**
 * @file This plugin adds on primitive Object (like string, number, array ...) additionnals methods
 * @version 1.0
 * @author Julien Roche
 * @copyright MIT
 */

(function(){
	"use strict";

	function definition($){
		/* String part */
		String.prototype.endWith = function (needle) { 
			return this && this.match(needle + "$") == needle;
		};
		
        String.prototype.repeat = function (num) { 
//			return new Array(num + 1).join(this);
			var arr = [];
			arr.length = num + 1;
			return arr.join(this);
		};
		
        String.prototype.startWith = function (needle) {
			return this && this.match("^" + needle) == needle;
		};
		
		/* Number part */
		Number.prototype.toPaddedString = function (length, radix) {
			var string = this.toString(radix || 10), slength = string.length;
			for (var i = 0; i < (length - slength); i++) {
				string = "0" + string;
			} 
			return string;
		};
		
		/* Array part */
		
		// See http://www.to-string.com/2012/05/29/fixing-splice-in-older-versions-of-internet-explorer-8-and-olders/
		if (document.documentMode && document.documentMode < 9) {
			// save original function of splice
			var originalSplice = Array.prototype.splice;
			
			// provide a new implementation
			Array.prototype.splice = function() {
				
				// since we can't modify 'arguments' array, 
				// let's create a new one and copy all elements of 'arguments' into it
				var arr = [],
					i = 0,
					max = arguments.length;
				
				for (; i < max; i++){
					arr.push(arguments[i]);
				}
				
				// if this function had only one argument
				// compute 'deleteCount' and push it into arr
				if (arr.length==1) {
					arr.push(this.length - arr[0]);
				}
				
				// invoke original splice() with our new arguments array
				return originalSplice.apply(this, arr);
			};
		}
		
		// See https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
		if(!Array.prototype.forEach) {
			Array.prototype.forEach = function forEach(callback, thisArg) {
				var T, k;

				if(this == null) {
					throw new TypeError("this is null or not defined");
				}

				// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
				var O = Object(this);

				// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
				// 3. Let len be ToUint32(lenValue).
				var len = O.length >>> 0;
				// Hack to convert O.length to a UInt32

				// 4. If IsCallable(callback) is false, throw a TypeError exception.
				// See: http://es5.github.com/#x9.11
				if( {}.toString.call(callback) !== "[object Function]") {
					throw new TypeError(callback + " is not a function");
				}

				// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if(thisArg) {
					T = thisArg;
				}

				// 6. Let k be 0
				k = 0;

				// 7. Repeat, while k < len
				while(k < len) {

					var kValue;

					// a. Let Pk be ToString(k).
					//   This is implicit for LHS operands of the in operator
					// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
					//   This step can be combined with c
					// c. If kPresent is true, then
					if(Object.prototype.hasOwnProperty.call(O, k)) {

						// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
						kValue = O[k];

						// ii. Call the Call internal method of callback with T as the this value and
						// argument list containing kValue, k, and O.
						callback.call(T, kValue, k, O);
					}
					// d. Increase k by 1.
					k++;
				}
				// 8. return undefined
			};
		}
	}

	if (typeof module === "object" && typeof module.exports === "object") {
		// Node approach
		definition();

	} else if (typeof define === "function" && define.amd) {
		// AMD approach
		define("prototype", [], definition);

	} else if (window.jQuery) {
		// Classical way
		definition();
	}
}());