# plugin for jQuery #

This plugin tries to serialize your form into a JSON object.

Nota bene: this plugin is AMD ready, and its name is "jquery.serializeObject"

Installation
------------

First, to make it works, the following files have to be included.

<pre>
&lt;script src=&quot;jquery.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;jquery.serializeObject.js&quot;&gt; &lt;/script&gt;
</pre>

How to use it
---------

This is really simple, you can do the following stuff

<pre>
var json = $(&quot;#myForm&quot;).serializeObject();
</pre>

Or:
<pre>
var json = $(&quot;:input&quot;).serializeObject();
</pre>
