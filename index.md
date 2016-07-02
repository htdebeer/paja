---
title: Paja, Pandoc wrapped around in JavaScript
author: Huub de Beer
date: July, 2016
keywords:
-   pandoc
-   JavaScript
...

Paja is a simple JavaScript wrapper around [pandoc](http://pandoc.org/), the
great multi-format document converter. Paja is inspired by
[Paru](https://heerdebeer.org/Software/markdown/paru/), a
[Ruby](https://www.ruby-lang.org/en/) wrapper for pandoc that I wrote earlier.
Like Paru, Paja support automating the use of pandoc. Paja is [free
software](https://www.gnu.org/philosophy/free-sw.html);
Paja is licenced under the [GNU General Public Licence version
3](https://www.gnu.org/licenses/gpl-3.0.html). Get the code at
[https://github.com/htdebeer/paja](https://github.com/htdebeer/paja).

The current version of Paja is *0.0.1*, which is a first alpha version.

# Installation

Because Paja is a wrapper around pandoc, pandoc obviously is a requirement for
Paja. Install Paja with [npm](https://www.npmjs.com/):

    npm install paja

# Usage

The obligatory "hello world" program with paja:

~~~{.javascript}
const paja = require("paja");
const INPUT = `
> Hello World! 

from **Paja**`;

const markdown2html = paja.Pandoc
    .converter()
    .from("markdown")
    .to("html");
markdown2html.run(INPUT, console.log);
~~~

which will output:

~~~{.html}
<blockquote>
<p>Hello World!</p>
</blockquote>
<p>from <strong>Paja</strong></p>
~~~

All of [pandoc's long-style command line options](http://pandoc.org/README.html#options)
are mapped to a method of the `Pandoc` class. Option names without the prefix
`--` are converted to camelCase method names. For example:

- `--from format` maps to `Pandoc.from("format")`
- `--data-dir path` maps to `Pandoc.dataDir("path")`
- `--table-of-contents` maps to `Pandoc.tableOfContents()`

The table of contents's short option is actually also supported—I got tired of typing the long form quite fast as I use that option often—so `Pandoc.toc()`
works as well.


