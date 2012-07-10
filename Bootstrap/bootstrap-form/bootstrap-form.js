/*
 * Objet Direct - Form validator plugin for Bootstrap
 * 
 * @property {boolean} asterisk Asterisk display status
 * @property {string} asteriskContent Content of the printed asterisk
 * 
 * @requires ./docs/assets/css/bootstrap.css
 * @requires ./docs/assets/css/bootstrap-responsive.css
 * @requires ./docs/assets/js/jquery.js
 * @requires ./docs/assets/js/bootstrap-tooltip.js
 * 
 * Here, there is an example that we can make with the formular validator
 * @example
 *	<!DOCTYPE HTML>
 *	<html>
 *		<head>
 *			<title>Form</title>
 *			<link href="bootstrap-default.css" rel="stylesheet">
 *			<style>
 *				body {
 *					padding-top: 60px;
 *				}
 *			</style>
 *			<link href="bootstrap-responsive.css" rel="stylesheet">
 *			<link href="bootstrap-form.css" rel="stylesheet">
 *			<script src="jquery.js"> </script>
 *			<script src="bootstrap-tooltip.js"> </script>
 *			<script src="bootstrap-form.js"> </script>
 *			<script type="text/javascript">
 *				$(document).ready(function() {
 *					$('form').form();
 *				});
 *			</script>
 *		</head>
 *		<body>
 *			<form class="form">
 *				<fieldset class="well">
 *					<h3>Connection information</h3>
 *					<div class="control-group">
 *						<label class="control-label" for="inputLogin">Login</label>
 *						<div class="controls">
 *							<input type="text" id="inputLogin" class="input-medium" required="required"
 *								pattern="[A-Za-z0-9]*" data-error="Please give a correct login.">
 *						</div>
 *					</div>
 *				</fieldset>
 *				<div class="form-actions">
 *					<button type="submit" class="btn">Envoyer</button>
 *				</div>
 *			</form>
 *		</body>
 *	</html>
 * When the user submit the form,
 * if he lets an empty field because of the attribute 'required'
 * 	  or he doesn't respect pattern because of the attribute 'pattern',
 * then the error from 'data-error' prints
 *    and the cursor places to the first form error,
 * else the form is submited.
 * 
 * Copyright 2012, David Wayntal
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php/
 * http://www.opensource.org/licenses/gpl-license.php
 * 
 * Includes bootstrap.js
 * http://twitter.github.com/bootstrap/
 * Copyright 2012, Objet Direct
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 * Date: 2012-07-09
 */

! function($) {
	// ----------------------------------------------------------------------------------------
	// FORM CLASS DEFINITION
	// ----------------------------------------------------------------------------------------

	/**
	 * Constructor for my form validator plugin
	 * @constructor
	 * @param {HTMLFormElement} formElement DOM JavaScript element linked to a form tag
	 * @param {Object} options Options for my plugin
	 */
	var Form = function(formElement, options) {
		this.$form = $(formElement)
		this.options = $.extend({}, $.fn.form.defaults, options)
	}

	Form.prototype = {
		constructor : Form,
		main : function() {
			this.$form.attr('novalidate', 'novalidate');
			$('input, textearea, select', this.$form).each(function() {
				__createTooltip($(this));
			});

			printAsterisk.call(this);
			submitForm.call(this);
			resetForm.call(this);
		}
	}

	// ----------------------------------------------------------------------------------------
	// FORM CLASS PRIVATE METHODS
	// ----------------------------------------------------------------------------------------

	/**
	 * Prints an asterisk for form required fields
	 */
	function printAsterisk() {
		if (this.options.asterisk) {
			var self = this, jSelf, jParent;

			$('[required=required], [data-min], [data-max]', this.$form).each(function() {
				jSelf = $(this);
				jParent = jSelf.parent();

				if (jSelf.attr('type') == 'radio' || jSelf.attr('type') == 'checkbox') {
					jParent.find('label').append(self.options.asteriskContent);

				} else {
					jParent.append(self.options.asteriskContent);
				}
			});
		}
	}

	/**
	 * Submits the form when the user clicks
	 */
	function submitForm() {
		var self = this, jWindow = $(window), allVerified, jSubmit;
		this.$form.submit(function(event) {
			allVerified = allInputVerification.call(self);

			jSubmit = self.$form.find('[type=submit]');
			jSubmit.removeClass('btn-danger');

			if (!allVerified) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();

				$(':invalid', self.$form).first().focus().select().get(0).scrollIntoView(true);
				jWindow.scrollTop(jWindow.scrollTop() - jWindow.height() / 2);
				jSubmit.addClass('btn-danger');
			}
		});
	}

	/**
	 * Resets all form fields with its styles
	 */
	function resetForm() {
		var self = this;

		$('[type=reset]', this.$form).click(function() {
			$('[type=submit]', self.$form).removeClass('btn-success btn-danger');
			$('.control-group', self.$form).removeClass('success error');
			$('input, textearea, select', self.$form).each(function() {
				__hideTooltip($(this));
			});
		});
	}

	/**
	 * Verifies all form fields
	 * @return {boolean} Fields status, if they are correct or not
	 */
	function allInputVerification() {
		var result = true, self = this;
		var marginLeft, min, max;
		$(':valid', self.$form).each(function() {
			validInput($(this));
		});

		var jSelf;
		$(':valid', self.$form).each(function() {
			jSelf = $(this);
			min = ((jSelf.attr('data-min')) && (!minInputVerification(jSelf)));
			max = ((jSelf.attr('data-max')) && (!maxInputVerification(jSelf)));
			if ((min && max) || (min) || (max)) {
				invalidInput(jSelf);
				result = false;
			}
		});

		$(':invalid', self.$form).each(function() {
			invalidInput($(this));
			result = false;
		});
		return result;
	}

	/**
	 * Counts the field number which are selected by the user
	 * @param {HTMLFormElement} jElt DOM JavaScript element selected
	 */
	function countMultipleSelection(jElt) {
		var n;
		if ((jElt.attr('multiple')) && (jElt.val())) {
			n = jElt.val().length;

		} else {
			n = $('form.form [name="' + jElt.attr('name') + '"]:checked').length;
		}
		return n;
	}

	/**
	 * Verifies form fiels which has "data-min" attibute
	 * @param {HTMLFormElement} jElt DOM JavaScript element to verify
	 */
	function minInputVerification(jElt) {
		return (countMultipleSelection(jElt) >= jElt.attr('data-min'));
	}

	/**
	 * Verifies form fiels which has "data-max" attibute
	 * @param {HTMLFormElement} jElt DOM JavaScript element to verify
	 */
	function maxInputVerification(jElt) {
		return (countMultipleSelection(jElt) <= jElt.attr('data-max'));
	}

	/**
	 * Renders a valid input
	 * @param {HTMLFormElement} jElt DOM JavaScript element to valid
	 */
	function validInput(jElt) {
		__hideTooltip(jElt);
		printInputVerification(jElt.parent().parent(), true);
	}

	/**
	 * Renders an invalid input
	 * @param {HTMLFormElement} jElt DOM JavaScript element to invalid
	 */
	function invalidInput(jElt) {
		__showTooltip(jElt);
		printInputVerification(jElt.parent().parent(), false);
	}

	/**
	 * Prints verifications maked on form fields
	 * @param {HTMLFormElement} jElt DOM JavaScript element which will change
	 * @param {boolean} result Verification result status
	 */
	function printInputVerification(jElt, result) {
		jElt.removeClass('success error').addClass( result ? 'success' : 'error');
	}

	/**
	 * Gives the input element according to its type (radio, checkbox...)
	 * @param {HTMLFormElement} jElt DOM JavaScript current element
	 */
	function __giveElementTooltip(jElt) {
		if (jElt.attr('type') == 'radio' || jElt.attr('type') == 'checkbox') {
			return $("label[for='" + jElt.attr("id") + "']");

		} else {
			return jElt;
		}
	}

	/**
	 * Creates a Bootstrap tooltip on an element
	 * @param {HTMLFormElement} jElt DOM JavaScript element which will be linked
	 */
	function __createTooltip(jElt) {
		var jDiv = $("<div></div>");
		jDiv.text(jElt.attr('data-error'));

		$(__giveElementTooltip(jElt)).tooltip({
			placement : 'right',
			title : jDiv.html(),
			trigger : 'manual',
			template : '<div class="tooltip ' + ((jElt.attr('type') == 'radio' || jElt.attr('type') == 'checkbox') ? 'formOther' : 'formInput') + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		});
	}

	/**
	 * Shows the element Bootstrap tooltip
	 * @param {HTMLFormElement} jElt DOM JavaScript element which is linked
	 */
	function __showTooltip(jElt) {
		$(__giveElementTooltip(jElt)).tooltip('show');
	}

	/**
	 * Hides the element Bootstrap tooltip
	 * @param {HTMLFormElement} jElt DOM JavaScript element which is linked
	 */
	function __hideTooltip(jElt) {
		$(__giveElementTooltip(jElt)).tooltip('hide');
	}

	// ----------------------------------------------------------------------------------------
	// FORM PLUGIN DEFINITION
	// ----------------------------------------------------------------------------------------

	$.fn.form = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('form'), options = $.extend({}, $.fn.form.defaults, $this.data(), typeof option == 'object' && option)

			!data && $this.data('form', ( data = new Form(this, options)));

			if ( typeof option == 'string') {
				data[option]();

			} else {
				data.main();
			}
		})
	}

	$.fn.form.defaults = {
		asterisk : true,
		asteriskContent : "<span class='help-inline'>*</span>"
	}

	$.fn.form.Constructor = Form

}(window.jQuery);
