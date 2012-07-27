# Twitter follow button plugin for Bootstrap #

This plugin substitutes the follow button creation on the official Twitter website, by a javascript component where the user changes options.

Here is an example which shows a follow button.

Installation
------------

First, to make it works, the following files have to be included.

<pre>
&lt;script src=&quot;jquery.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap-follow.js&quot;&gt; &lt;/script&gt;
</pre>

Launching
---------

Next, the follow button plugin must launch.

<pre>
&lt;script type=&quot;text/javascript&quot;&gt;
	$(document).ready(function() {
		$('.followTwitter').follow();
		$('.followObjetDirect').follow({
			login : 'objetdirect',
			largeButton : true,
			language : 'fr'
		});
	});
&lt;/script&gt;
</pre>

It is possible to specify options when the follow button is launched :
* login, string which is the user login pointed by the button, `twitter` ;
* showLogin, boolean which prints or not the login, `true` ;
* showSubscribe, boolean which prints or not the subscribe number, `false` ;
* largeButton, boolean which changes the button width, `false` ;
* language, string which is the button text language (en, fr, ...), `en`.

Example
-------

To finish, here is an example to build two follow buttons.

<pre>
&lt;div class=&quot;followTwitter&quot;&gt; &lt;/div&gt;
&lt;div class=&quot;followObjetDirect&quot;&gt; &lt;/div&gt;
</pre>
In the body part, there is simply the html button declaration.