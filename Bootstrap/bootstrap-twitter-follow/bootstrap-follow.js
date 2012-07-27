/*
 * Objet Direct - Twitter follow button plugin for Bootstrap
 * 
 * @property {string} login User login pointed by the button
 * @property {boolean} showLogin Login display status
 * @property {boolean} showSubscribe Subscribe number display status
 * @property {boolean} largeButton Width button display status
 * @property {string} language Button text language ('en', 'fr', ...)
 * 
 * @requires ./docs/assets/js/jquery.js
 * 
 * Here, there is an example that we can make with the follow button
 * @example
 *	<!DOCTYPE HTML>
 *	<html>
 *		<head>
 *			<title>Follow</title>
 *			<script src="jquery.js"> </script>
 *			<script src="bootstrap-follow.js"> </script>
 *			<script type="text/javascript">
 *				$(document).ready(function() {
 *					$('.followTwitter').follow();
 *					$('.followObjetDirect').follow({
 *						login : 'objetdirect',
 *						largeButton : true,
 *						language : 'fr'
 *					});
 *				});
 *			</script>
 *		</head>
 *		<body>
 *			<div class="followTwitter"> </div>
 *			<div class="followObjetDirect"> </div>
 *		</body>
 *	</html>
 * This plugin substitutes the follow button creation on the official Twitter website,
 * by a javascript component where the user changes options.
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
 * Date: 2012-07-26
 */

! function($) {
	// ----------------------------------------------------------------------------------------
	// FOLLOW BUTTON CLASS DEFINITION
	// ----------------------------------------------------------------------------------------

	/**
	 * Constructor for the Twitter follow button
	 * @constructor
	 * @param {HTMLFollowElement} followElement DOM JavaScript element linked to a follow button tag
	 * @param {Object} options Options for my plugin
	 */
	var Follow = function(followElement, options) {
		this.$follow = $(followElement)
		this.options = $.extend({}, $.fn.follow.defaults, options)
	}

	Follow.prototype = {
		constructor : Follow,
		main : function() {
			printFollow.call(this);
		}
	}

	// ----------------------------------------------------------------------------------------
	// FOLLOW BUTTON CLASS PRIVATE METHODS
	// ----------------------------------------------------------------------------------------

	/**
	 * Prints the follow button
	 */
	function printFollow() {
		this.$follow.html(
			'<a '
			+ 'href="https://twitter.com/' + this.options.login + '" '
			+ 'class="twitter-follow-button" '
			+ ((this.options.showSubscribe) ? '' : 'data-show-count="false" ')
			+ ((this.options.largeButton) ? 'data-size="large" ' : '')
			+ 'data-lang="' + this.options.language + '" '
			+ ((this.options.showLogin) ? '' : 'data-show-screen-name="false"')
			+ '>Follow @' + this.options.login + '</a>'
 			+ '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'
 		);
	}

	// ----------------------------------------------------------------------------------------
	// FOLLOW BUTTON PLUGIN DEFINITION
	// ----------------------------------------------------------------------------------------

	$.fn.follow = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('follow'), options = $.extend({}, $.fn.follow.defaults, $this.data(), typeof option == 'object' && option)

			!data && $this.data('follow', ( data = new Follow(this, options)));

			if ( typeof option == 'string') {
				data[option]();

			} else {
				data.main();
			}
		})
	}

	$.fn.follow.defaults = {
		login: 'twitter',
		showLogin : true,
		showSubscribe : false,
		largeButton : false,
		language : 'en'
	}

	$.fn.follow.Constructor = Follow

}(window.jQuery);
