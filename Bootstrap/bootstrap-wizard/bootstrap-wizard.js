/**
 * Wizard plugin for Boostrap
 * Require the carousel plugin
 * 
 * An example of HTML to use it:
 * 
<div id="wizard" data-role="wizard">
	<div class="active" data-title="step 1">
		Your content
	</div>
	
	<div data-title="step 2">
		Your content
	</div>
</div>

 * 
 * Another one:
 * 
 <div id="wizard" data-role="wizard">
	<div class="active" data-title="step 1">
		Your content
	</div>
	
	<div data-title="step 2">
		Your content
	</div>
</div>

 *
 * And an example of JavaScript:

$("#wizard").wizard({
	validNextStep: function(index) { 
		return true; 
	},
	changeStep: function(index) {
		alert("Step " + (index + 1))
	},
	finish: function(event) {
		event.preventDefault();
		alert("Finished !")
	}
});

 */

!function($) {
	"use strict";

	/* WIZARD PUBLIC CLASS DEFINITION
	 * ============================== */

	var Wizard = function(element, options) {
		var self = this;
		
		// Base
		this.$element = $(element);
		this.options = $.extend({}, $.fn.wizard.defaults, options);
		this.idx = 0;
		this.maxIdx = 0;
		
		// Get some informations
		this.$items = $("> div[data-title]", this.$element);
		this.maxIdx = this.$items.length - 1;
		
		// Initialization
		this.$element.find("> *").wrapAll("<div class='carousel slide' data-interval='false'></div>");
		this.$element.addClass("wizard thumbnail");
		this.$base = this.$element.find("> div.carousel");
		this.$base.carousel({ interval: false });
		
		if(this.$element.attr("id")){
			this.$base.attr("id", "wizard-" + this.$element.attr("id"));
			
		} else {
			this.$base.attr("id", "wizard-" + new Date().getTime() + "-" + window.parseInt((Math.random() * 1000)));
		}
		
		// Wizard header
		this.$wizardHeader = $("<div class='wizard-header'></div>");
		this.$items.each(function(index, item){
			var $item = $(item), active = index == 0, classToUse = "";
			
			$item.addClass("item");
			active && $item.addClass("active");
			
			if(active){
			    classToUse += "active ";
			}
			
			if(index == 0){
                classToUse += "first ";
            }
			
			if(index == self.maxIdx){
                classToUse += "last ";
            }
			
			self.$wizardHeader.append("<a href='#' class='" + classToUse + "' data-index='" + index + "'><span class='badge" + (active ? "" : " badge-inverse") + "'>" + (index + 1) + "</span> " + $item.data("title") + "</a>");
		});
		
		this.$base.before(this.$wizardHeader);
		this.$base.before("<br />");
			
	    // Wizard core
		this.$items.wrapAll("<div class='carousel-inner'></div>");
		this.$base.append("<br />");
		
		this.$previous = $("<a class='btn btn-inverse' data-index='prev'><i class='icon-chevron-left icon-white'></i> " + this.options.previousText + "</a>");
		this.$previous.attr("href", "#" + this.$base.attr("id"));
		this.$previous.css("visibility", "hidden");
		this.$base.append(this.$previous);
		
		this.$next = $("<a class='btn btn-inverse' data-index='next' style='float:right'>" + this.options.nextText + "<i class='icon-chevron-right icon-white'></i></a>");
		this.$next.attr("href", "#" + this.$base.attr("id"));
		this.$base.append(this.$next);
		
		this.$finish = $("<button type='submit' class='btn btn-primary' style='float:right'>" + this.options.finishText + "</button>");
		this.$finish.css("visibility", "hidden");
		this.$finish.on("click", function(event){
		    if(self.options.validNextStep.call(self, self.idx)){
		        $.isFunction(self.options.finish) && self.options.finish.call(self, event);
		    }
		});
		this.$base.append(this.$finish);
		this.$base.append("<div style='clear:both'/>");
		
		// Listeners
		this.$wizardHeader.on("click", "> a", function(event){
			event.preventDefault();
			self.index($(this).data("index"));
		});
		
		this.$base.on("click", "> a", function(event){
			event.preventDefault();
			$(this).data("index") == "next" ? self.next() : self.prev();
		});
		
		this.$base.on("slid", function(event){
			window.setTimeout(function(){ self.$element.removeClass("animated"); }, 50);
		});
	};
	
	Wizard.prototype.index = function(index){
		if(index != null && index >= 0 && index <= this.maxIdx){
		    var i, isValid = true;

            if(this.idx < index){
                if(this.options.displayOnJump){
                    for(i = this.idx; i <= index; ++i){
                        if(this.options.validNextStep.call(this, i)){
                            this.$element.addClass("animated");
                            this.$base.carousel(i);
                            this.idx = i;
                            this.update();

                            $.isFunction(this.options.changeStep) && this.options.changeStep.call(this, this.idx);

                        } else if($.isFunction(this.options.invalidateNextStep)){
                            isValid = false;
                            this.options.invalidateNextStep.call(this, i);
                        }
                    }

                } else {
                    for(i = this.idx; i < index; ++i){
                        if(!this.options.validNextStep.call(this, i)){
                            isValid = false;

                            if($.isFunction(this.options.invalidateNextStep)){
                                this.options.invalidateNextStep.call(this, i);
                            }

                            break;
                        }
                    }
                }
            }

            if(isValid){
                this.$element.addClass("animated");
                this.$base.carousel(index);
                this.idx = index;
                this.update();

                $.isFunction(this.options.changeStep) && this.options.changeStep.call(this, this.idx);

            }
		}
		
		return this.idx;
	};
	
	Wizard.prototype.update = function() {
		if(this.idx == 0){
			this.$previous.css("visibility", "hidden");
			this.$next.css("visibility", "visible");
			this.$finish.css("visibility", "hidden");
			
		} else if(this.idx == this.maxIdx){
			this.$previous.css("visibility", "visible");
			this.$next.css("visibility", "hidden");
			this.$finish.css("visibility", "visible");
			
		} else {
			this.$previous.css("visibility", "visible");
			this.$next.css("visibility", "visible");
			this.$finish.css("visibility", "hidden");
		}

        $(".active span.badge", this.$wizardHeader).addClass("badge-inverse");
		$(".active", this.$wizardHeader).removeClass("active");
		$("a:eq(" + this.idx + ")", this.$wizardHeader).addClass("active");
        $(".active span.badge", this.$wizardHeader).removeClass("badge-inverse");
	};

	Wizard.prototype.prev = function() {
		if(this.idx > 0){
			this.index(this.idx - 1);
			return false;
		}
		
		return true;
	};
	
	Wizard.prototype.next = function() {
		if(this.idx <= this.maxIdx){
			this.index(this.idx+ 1);
			return false;
		}
		
		return true;
	};
	
	Wizard.prototype.option = function(options){
		if(!options){
			return;
		}
		
		for(var i in options) {
			switch(i){
				case "nextText":
					this.$next.text(options[i]);
					
				case "previousText":
					this.$previous.text(options[i]);
					
				case "finishText":
					this.$finish.text(options[i]);
					
				case "finish":
					this.$finish.off("click", this.options.finish);
					this.$finish.on("click", options[i]);
			
				default:
					this.options[i] = options[i];
					break;
			}
		}
	};

	/* WIZARD PLUGIN DEFINITION
	 * ======================== */

	$.fn.wizard = function(opts) {
		return this.each(function() {
			var $this = $(this), data = $this.data("wizard"), options = typeof opts == "object" && opts;
			
			if(data){
				data.option(options);
				
			} else {
				$this.data("wizard", new $.fn.wizard.Constructor(this, options));
			}
			
		});
	};

	$.fn.wizard.defaults = {
		nextText: "Next",
		previousText: "Previous",
		finishText: "Finish",
        displayOnJump: false,
		validNextStep: function(index) { return true; },
        invalidateNextStep: function(index) {},
		changeStep: function(index) {},
		finish: function(event) {}
	};

	$.fn.wizard.Constructor = Wizard;

	/* WIZARD DATA-API
	 * =============== */

	$(function() {
		$("body").find("div[data-role=wizard], div.wizard").wizard();
	});

}(window.jQuery);