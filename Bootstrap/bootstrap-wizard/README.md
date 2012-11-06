# Wizard plugin for Bootstrap #

This plugin (based on the carousel) offers the possibility to have a wizard for Bootstrap.

Installation
------------

First, to make it works, the following files have to be included.

<pre>
&lt;link type=&quot;text/css&quot; media=&quot;screen&quot; title=&quot;no title&quot; rel=&quot;stylesheet&quot; href=&quot;bootstrap.css&quot; /&gt;
&lt;link type=&quot;text/css&quot; media=&quot;screen&quot; title=&quot;no title&quot; rel=&quot;stylesheet&quot; href=&quot;bootstrap-wizard.css&quot; /&gt;

&lt;script src=&quot;jquery.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap-wizard.js&quot;&gt; &lt;/script&gt;
</pre>

Launching
---------

Define in your HTML the content of your Wizard.

<pre>
&lt;div id=&quot;wizard&quot; data-role=&quot;wizard&quot;&gt;
	&lt;div class=&quot;active&quot; data-title=&quot;step 1&quot;&gt;
		Your content
	&lt;/div&gt;
	
	&lt;div data-title=&quot;step 2&quot;&gt;
		Your content
	&lt;/div&gt;
&lt;/div&gt;
</pre>

Another one:
<pre>
&lt;div id=&quot;wizard&quot; data-role=&quot;wizard&quot;&gt;
	&lt;div class=&quot;active&quot; data-title=&quot;step 1&quot;&gt;
		Your content
	&lt;/div&gt;
	
	&lt;div data-title=&quot;step 2&quot;&gt;
		Your content
	&lt;/div&gt;
&lt;/div&gt;
</pre>

And how to use it with JavaScript:
<pre>
$(&quot;#wizard&quot;).wizard({
	validNextStep: function(index) { 
		return true; 
	},
	changeStep: function(index) {
		alert(&quot;Step &quot; + (index + 1))
	},
	finish: function(event) {
		event.preventDefault();
		alert(&quot;Finished !&quot;)
	}
});
</pre>

It is possible to specify options:
<pre>
// Default options
$.fn.wizard.defaults = {
	nextText: &quot;Next&quot;,
	previousText: &quot;Previous&quot;,
	finishText: &quot;Finish&quot;,
	validNextStep: function(index) { return true; },
	changeStep: function(index) {},
	finish: function(event) {}
};
</pre>
