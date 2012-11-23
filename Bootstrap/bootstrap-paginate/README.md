# Paginate plugin for Bootstrap #

This plugin offers the possibility to paginate.

Installation
------------

First, to make it works, the following files have to be included.

<pre>
&lt;link type=&quot;text/css&quot; media=&quot;screen&quot; title=&quot;no title&quot; rel=&quot;stylesheet&quot; href=&quot;bootstrap.css&quot; /&gt;

&lt;script src=&quot;jquery.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap-paginate.js&quot;&gt; &lt;/script&gt;
</pre>

Launching
---------

Define in your HTML the content of your Paginate.

<pre>
&lt;div id=&quot;paginate&quot;&gt;
&lt;/div&gt;
</pre>

And the associated JavaScript:
<pre>
$(&quot;#paginate&quot;).paginate({
	pages: 5,
	pageChange: function(index) {
		$(&quot;table tbody&quot;).load(&quot;/user/paginate/&quot; + index);
	}
});
</pre>

It is possible to specify options:
<pre>
// Default options
$.fn.paginate.defaults = {
	align: &quot;centered&quot;,						/* values: centered, right, left, null */
	size: null,											/* values: large, small, mini, null */
	previousText: &quot;&amp;laquo;&quot;,
	nextText: &quot;&amp;raquo;&quot;,
	detachedPreviousText: &quot;&amp;larr; Older&quot;,
	detachedNextText: &quot;Newer &amp;rarr;&quot;,
	previousPlacement: &quot;normal&quot;, 				/* values: normal, detached */
	nextPlacement: &quot;normal&quot;,					/* values: normal, detached */
	pages: 10, 											/* Nb page max */
	pageChange: function(index) { }
};
</pre>
