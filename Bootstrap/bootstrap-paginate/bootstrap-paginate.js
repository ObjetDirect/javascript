/**
 * Paginate plugin for Boostrap
 * An example of HTML to use it:
 * 
<div id="paginate"></div>

 * And the JavaScript:
 * 
 $("#paginate").paginate({
	pages: 5,
	pageChange: function(index) {
		$("table tbody").load("/user/paginate/" + index);
	}
});
 */

!function($) {
	"use strict";

	/* PAGINATE PUBLIC CLASS DEFINITION
	 * ============================== */

	var Paginate = function(element, options) {
		var self = this;
		
		// Base
		this.$element = $(element);
		this.options = $.extend({}, $.fn.paginate.defaults, options);
		this.index = 0;
		this.maxLink = 10;
		this.indexMin = 0;
		this.indexMax = this.indexMin + this.maxLink;
		
		// Decoration
		this.$element.addClass("pagination");
		this.options.align && this.$element.addClass("pagination-" + this.options.align);
		this.options.size && this.$element.addClass("pagination-" + this.options.size);
		
		// Childs
		this.$ul = $("<ul></ul>");
		
		if(this.options.previousPlacement == "detached"){
			this.$previous = $("<li class='previous'><a href='#' data-index='previous'>" + this.options.detachedPreviousText + "</a></li>");
			
		} else {
			this.$previous = $("<li><a href='#' data-index='previous'>" + this.options.previousText + "</a></li>");
		}
		
		if(this.options.nextPlacement == "detached"){
			this.$next = $("<li class='next'><a href='#' data-index='next'>" + this.options.detachedNextText + "</a></li>");
			
		} else {
			this.$next = $("<li><a href='#' data-index='next'>" + this.options.nextText + "</a></li>");
		}
		
		this.insertIndexes();
		
		// Listeners
		this.$element.on("click", "li:not(.disabled) a", function(event){
			event.preventDefault();
			var $a = $(this), index = $a.data("index");
			
			switch(index){
				case "previous":
					self.index--;
					break;
					
				case "next":
					self.index++;
					break;
					
				default:
					self.index = window.parseInt(index);
					break;
			}
			
			self.update();
			$.isFunction(self.options.pageChange) && self.options.pageChange(self.index);
			self.$element.trigger("paginate", [self.index]);
		});
		
		// Display the element
		this.update();
		this.$element.append(this.$ul);
	};
	
	Paginate.prototype.changePage = function(page, triggerEvent) {
		if(page >= 0){
			this.index = page;
			this.update();
			
			if(triggerEvent == null || triggerEvent == true){
				$.isFunction(this.options.pageChange) && this.options.pageChange(this.index);
				this.$element.trigger("paginate", [this.index]);
			}
		}
	};
	
	Paginate.prototype.insertIndexes = function(){
		var length = Math.min(this.options.pages, this.indexMax)
		
		this.$ul.append(this.$previous);
		
		for(var i = this.indexMin; i < length; i++){
			this.$ul.append("<li><a href='#' data-index='" + i + "'>" + (i+1) + "</a></li>");
		}
		
		this.$ul.append(this.$next);
		
		if(length <= 0){
			this.$element.hide();
			
		} else {
			this.$element.show();
		}
	};
	
	Paginate.prototype.update = function(){
		if(this.index < this.indexMin || this.indexMax <= this.index + 1){
			// We have to flush the elements
			this.$ul.find("li").remove();
			
			this.indexMin = this.index < this.indexMin ? this.indexMin + 1 - this.maxLink  : this.indexMax - 1;
			this.indexMax = this.indexMin + this.maxLink;
			this.insertIndexes();
			
		} else {
			this.$ul.find("li").removeClass("disabled");
		}
		
		if(this.index <= 0) {
			this.$previous.addClass("disabled");
			
		} else {
			this.$previous.removeClass("disabled");
		}
		
		this.$ul.find("a[data-index='" + this.index + "']").parents("li:first").addClass("disabled");
		
		if(this.index < this.options.pages - 1) {
			this.$next.removeClass("disabled");
			
		} else {
			this.$next.addClass("disabled");
		}
	};
	
	Paginate.prototype.index = function(){
		return index;
	};
	
	Paginate.prototype.option = function(options){
		if(!options){
			return;
		}
		
		var changePrevious = false, changeNext = false;
		
		for(var i in options) {
			switch(i){
				case "previousPlacement":
				case "previousText":
					changePrevious = true;
					
				case "nextText":
				case "detachedNextText":
					changeNext = true;
					
				default:
					this.options[i] = options[i];
					break;
			}
		}
		
		if(changePrevious){
			this.$previous.find("a").text(this.options.previousPlacement == "detached" ? this.options.detachedPreviousText : this.options.previousText);
		}
		
		if(changeNext){
			this.$next.find("a").text(this.options.nextPlacement == "detached" ? this.options.detachedNextText : this.options.nextText);
		}
		
		this.update();
	};
	
	/* PAGINATE PLUGIN DEFINITION
	 * ======================== */

	$.fn.paginate = function(opts) {
		return this.each(function() {
			var $this = $(this), data = $this.data("paginate"), options = typeof opts == "object" && opts;
			
			if(data){
				data.option(options)
				
			} else {
				$this.data("paginate", new $.fn.paginate.Constructor(this, options));
			}
		});
	};

	$.fn.paginate.defaults = {
		align: "centered",						/* values: centered, right, left, null */
		size: null,								/* values: large, small, mini, null */
		previousText: "&laquo;",
		nextText: "&raquo;",
		detachedPreviousText: "&larr; Older",
		detachedNextText: "Newer &rarr;",
		previousPlacement: "normal", 			/* values: normal, detached */
		nextPlacement: "normal",				/* values: normal, detached */
		pages: 10, /* Nb page max */
		pageChange: function(index) { }
	};

	$.fn.paginate.Constructor = Paginate;

	/* PAGINATE DATA-API
	 * =============== */

	$(function() {
		$("body").find("div[data-role=paginate], div.paginate").paginate();
	});

}(window.jQuery);
