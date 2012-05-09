# jQuery plugin for the globalization #

This little plugin can load some globalization properties and translate our Web pages. We put on the DOM element the attribute "data-translate".
This attribute can contains one or many properties, and inject these into the content, or into the attribute.

Examples:
<pre>
  &lt;!-- Inject into the content -->
  &lt;div data-translate="aProperty"&gt;A default text&lt;/div&gt;
</pre>

<pre>
  &lt;!-- Inject into the attribute -->
  &lt;div data-translate="title:aProperty" title="A default title"&gt;A text&lt;/div&gt;
</pre>

<pre>
  &lt;!-- Inject into the attribute and the content -->
  &lt;div data-translate="title:aProperty;anotherProperty" title="A default title"&gt;A default text&lt;/div&gt;
</pre>

You can too retrieve the property manually:
<pre>
  var text = $.translate.properties["aProperty"];
</pre>

---

### The MIT License

Copyright (c) <2012> <Objet Direct>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
 