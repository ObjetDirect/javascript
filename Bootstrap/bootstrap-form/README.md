# Form validator plugin for Bootstrap #

This plugin verifies if the user doesn't write errors in the form field according to the Bootstrap styles.
The form rules are defined with the HTML5 specifications.

Here is an example which shows a form with all input types.

Installation
------------

First, to make it works, the following files have to be included.

<pre>
&lt;link href=&quot;bootstrap-default.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;link href=&quot;bootstrap-responsive.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;link href=&quot;bootstrap-form.css&quot; rel=&quot;stylesheet&quot;&gt;
&lt;script src=&quot;jquery.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap-tooltip.js&quot;&gt; &lt;/script&gt;
&lt;script src=&quot;bootstrap-form.js&quot;&gt; &lt;/script&gt;
</pre>
*Note : Files `bootstrap-form.css` and `bootstrap-form.js` are part of the plugin.*

Launching
---------

Next, the form validator plugin must launch.

<pre>
&lt;script type=&quot;text/javascript&quot;&gt;
	$(document).ready(function() {
		$('form').form();
	});
&lt;/script&gt;
</pre>

It is possible to specify options when the form is launched :
* asterisk, boolean which print or not the asterisk for obligatory field, `true` ;
* asteriskContent, string which is the asterisk content, `<span class='help-inline'>*</span>`.

Example
-------

To finish, in first part, here is a screen for a form example.

![](https://github.com/ObjetDirect/javascript/raw/master/Bootstrap/bootstrap-form/example.png)

And, in second part, the form body with all HTML5 input types which built this example.

<pre>
&lt;form class=&quot;form form-horizontal&quot; action=&quot;./&quot;&gt;
</pre>

<pre>
	&lt;fieldset class=&quot;well&quot;&gt;
		&lt;h3&gt;Connection informations&lt;/h3&gt;
		&lt;br/&gt;
</pre>

**Input text**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputLogin&quot;&gt;Login&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;text&quot; id=&quot;inputLogin&quot; class=&quot;input-medium&quot; required=&quot;required&quot;
					pattern=&quot;[A-Za-z0-9]*&quot; data-error=&quot;Please give a correct login.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he mustn't let the empty field `required="required"` ;
- he has to write letters or numbers `pattern="[A-Za-z0-9]*"`.

Else, the error defined with `data-error="Please give a correct login."` appears.

**Input password**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputPassword&quot;&gt;Password&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;password&quot; id=&quot;inputPassword&quot; class=&quot;input-medium&quot; required=&quot;required&quot;
					data-error=&quot;Please give a correct password.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he mustn't let the empty field `required="required"`.

Else, the error defined with `data-error="Please give a correct password."` appears.

**Input email**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputEmail&quot;&gt;E-mail address&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;email&quot; id=&quot;inputEmail&quot; class=&quot;input-medium&quot; required=&quot;required&quot;
					data-error=&quot;Please give a correct e-mail address.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to write the email format `type="email"` ;
- he mustn't let the empty field `required="required"`.

Else, the error defined with `data-error="Please give a correct e-mail address."` appears.

<pre>
	&lt;/fieldset&gt;
	&lt;fieldset class=&quot;well&quot;&gt;
		&lt;h3&gt;General informations&lt;/h3&gt;
		&lt;br/&gt;
</pre>

**Input radio**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputGender&quot;&gt;Gender&lt;/label&gt;
			&lt;div class=&quot;controls radio input-mini&quot;&gt;
				&lt;input type=&quot;radio&quot; value=&quot;Man&quot; id=&quot;man&quot; name=&quot;gender&quot; required=&quot;required&quot;
					data-error=&quot;Please check a gender.&quot;&gt;
				&lt;label for=&quot;man&quot;&gt;Man&lt;/label&gt;
			&lt;/div&gt;
			&lt;div class=&quot;controls radio input-mini&quot;&gt;
				&lt;input type=&quot;radio&quot; value=&quot;Woman&quot; id=&quot;woman&quot; name=&quot;gender&quot;&gt;
				&lt;label for=&quot;woman&quot;&gt;Woman&lt;/label&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to check one of all inputs `required="required"`.

Else, the error defined with `data-error="Please check a gender."` appears.

**Input date**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputAge&quot;&gt;Birth date&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;date&quot; id=&quot;inputAge&quot; class=&quot;input-medium&quot; required=&quot;required&quot;
					data-error=&quot;Please give a correct birth date.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to write the date format `type="date"` ;
- he mustn't let the empty field `required="required"`.

Else, the error defined with `data-error="Please give a correct birth date."` appears.

**TextArea**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputLocation&quot;&gt;Locality&lt;br/&gt;ZIP&lt;br/&gt;City&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;textarea id=&quot;inputLocation&quot; class=&quot;input-medium&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
The user never watch errors on this input.

**Input tel**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputTel&quot;&gt;Phone&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;tel&quot; id=&quot;inputTel&quot; class=&quot;input-medium&quot; pattern=&quot;[0-9]{10}&quot;
					data-error=&quot;Please give a correct phone number.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to write the telephone number format `type="tel"`.

Else, the error defined with `data-error="Please give a correct phone number."` appears.

**Input url**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputWeb&quot;&gt;Website&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;url&quot; id=&quot;inputWeb&quot; class=&quot;input-medium&quot; placeholder=&quot;http://&quot;
					data-error=&quot;Please give a correct website url.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to write the website url format `type="url"`.

Else, the error defined with `data-error="Please give a correct website url."` appears.

**Input file**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputImage&quot;&gt;Personal image&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;file&quot; id=&quot;inputImage&quot; class=&quot;input-xlarge&quot; accept=&quot;image/jpeg, image/png&quot;
				required=&quot;required&quot;
					data-error=&quot;Please give an image with jpg or png format.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to choose good files `type="file"` and `accept="image/jpeg, image/png"` ;
- he mustn't let the empty field `required="required"`.

Else, the error defined with `data-error="Please give an image with jpg or png format."` appears.

<pre>
	&lt;/fieldset&gt;
	&lt;fieldset class=&quot;well&quot;&gt;
		&lt;h3&gt;Optional informations&lt;/h3&gt;
		&lt;br/&gt;
</pre>

**Input number**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputComputer&quot;&gt;Computers number&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;number&quot; value=&quot;0&quot; min=&quot;0&quot; max=&quot;10&quot; id=&quot;inputComputer&quot; class=&quot;input-medium&quot;
					data-error=&quot;Please give a correct computers number.&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to choose good number `type="number"`, `min="0"` and `max="10"`.

Else, the error defined with `data-error="Please give a correct computers number."` appears.

**Input search**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputSearch&quot;&gt;Favorite animal&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;search&quot; id=&quot;inputSearch&quot; list=&quot;inputSearchList&quot; class=&quot;input-medium&quot;&gt;
				&lt;datalist id=&quot;inputSearchList&quot;&gt;
					&lt;option value=&quot;Alligator&quot;&gt;
					&lt;option value=&quot;Bear&quot;&gt;
					&lt;option value=&quot;Cat&quot;&gt;
					&lt;option value=&quot;Dolphin&quot;&gt;
					&lt;option value=&quot;Elephant&quot;&gt;
					&lt;option value=&quot;Fawn&quot;&gt;
					&lt;option value=&quot;Gazelle&quot;&gt;
				&lt;/datalist&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
The user never watch errors on this input.

**Select multiple**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputFruit&quot;&gt;Favorite fruit&lt;br/&gt;(between 2 and 4)&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;select id=&quot;inputFruit&quot; class=&quot;input-medium&quot; multiple=&quot;multiple&quot; data-min=&quot;2&quot; data-max=&quot;4&quot;
					data-error=&quot;Please choose between two and four fruits.&quot;&gt;
					&lt;option value=&quot;apple&quot;&gt;Apple&lt;/option&gt;
					&lt;option value=&quot;banana&quot;&gt;Banana&lt;/option&gt;
					&lt;option value=&quot;cherry&quot;&gt;Cherry&lt;/option&gt;
					&lt;option value=&quot;dewberry&quot;&gt;Dewberry&lt;/option&gt;
					&lt;option value=&quot;elderberry&quot;&gt;Elderberry&lt;/option&gt;
					&lt;option value=&quot;fig&quot;&gt;Fig&lt;/option&gt;
					&lt;option value=&quot;grape&quot;&gt;Grape&lt;/option&gt;
				&lt;/select&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to choose the asked number of all inputs `data-min="2"` and `data-min="4"`.

Else, the error defined with `data-error="Please choose between two and four fruits."` appears.

*Note : Tags `data-min` and `data-min` are specific tags for the form validator plugin.
They impose a limit when the user has to make a multiple choice.*

**Input checkbox**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputBrowser&quot;&gt;Favorite browser&lt;br/&gt;(at least 1)&lt;/label&gt;
			&lt;div class=&quot;controls checkbox input-mini&quot;&gt;
				&lt;input type=&quot;checkbox&quot; value=&quot;Chrome&quot; id=&quot;chrome&quot; name=&quot;browser[]&quot; data-min=&quot;1&quot;
					data-error=&quot;Please check at least one browser.&quot;&gt;
				&lt;label for=&quot;chrome&quot;&gt;Chrome&lt;/label&gt;
			&lt;/div&gt;
			&lt;div class=&quot;controls checkbox input-mini&quot;&gt;
				&lt;input type=&quot;checkbox&quot; value=&quot;Firefox&quot; id=&quot;firefox&quot; name=&quot;browser[]&quot;&gt;
				&lt;label for=&quot;firefox&quot;&gt;Firefox&lt;/label&gt;
			&lt;/div&gt;
			&lt;div class=&quot;controls checkbox input-mini&quot;&gt;
				&lt;input type=&quot;checkbox&quot; value=&quot;IExplorer&quot; id=&quot;iexplorer&quot; name=&quot;browser[]&quot;&gt;
				&lt;label for=&quot;iexplorer&quot;&gt;IExplorer&lt;/label&gt;
			&lt;/div&gt;
			&lt;div class=&quot;controls checkbox input-mini&quot;&gt;
				&lt;input type=&quot;checkbox&quot; value=&quot;Opera&quot; id=&quot;opera&quot; name=&quot;browser[]&quot;&gt;
				&lt;label for=&quot;opera&quot;&gt;Opera&lt;/label&gt;
			&lt;/div&gt;
			&lt;div class=&quot;controls checkbox input-mini&quot;&gt;
				&lt;input type=&quot;checkbox&quot; value=&quot;Safari&quot; id=&quot;safari&quot; name=&quot;browser[]&quot;&gt;
				&lt;label for=&quot;safari&quot;&gt;Safari&lt;/label&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
If the user doesn't want to show an error on this input,

- he has to check the asked number of all inputs `data-min="1"` (see **Select Multiple**).

Else, the error defined with `data-error="Please check at least one browser."` appears.

**Input color**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputColor&quot;&gt;Favorite color&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;color&quot; id=&quot;inputColor&quot; class=&quot;input-medium&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
The user never watch errors on this input.

**Select**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputOS&quot;&gt;Favorite OS&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;select id=&quot;inputOS&quot; class=&quot;input-medium&quot;&gt;
					&lt;option&gt;Nothing&lt;/option&gt;
					&lt;option&gt;Linux&lt;/option&gt;
					&lt;option&gt;Mac&lt;/option&gt;
					&lt;option&gt;Windows&lt;/option&gt;
				&lt;/select&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
The user never watch errors on this input.

**Input range**

<pre>
		&lt;div class=&quot;control-group&quot;&gt;
			&lt;label class=&quot;control-label&quot; for=&quot;inputNote&quot;&gt;Note&lt;/br&gt;(on 20)&lt;/label&gt;
			&lt;div class=&quot;controls&quot;&gt;
				&lt;input type=&quot;range&quot; max=&quot;20&quot; id=&quot;inputNote&quot; class=&quot;input-medium&quot;&gt;
			&lt;/div&gt;
		&lt;/div&gt;
</pre>
The user never watch errors on this input.

<pre>
	&lt;/fieldset&gt;
</pre>

**Input button**

<pre>
	&lt;div class=&quot;form-actions&quot;&gt;
		&lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;Submit&lt;/button&gt;
		&lt;input type=&quot;reset&quot; class=&quot;btn&quot; value=&quot;Cancel&quot;&gt;
	&lt;/div&gt;
</pre>
When the user submit the form whereas fields are empty, the request is not sent and the errors printed.
If he clicks on Cancel, the form resets like to the beginning.

<pre>
&lt;/form&gt;
</pre>