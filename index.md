---
title: Paja, Pandoc wrapped around in JavaScript
author: Huub de Beer
date: July, 2016
keywords:
-   pandoc
-   paja
-   JavaScript
...

Paja is a simple JavaScript wrapper around [pandoc](http://pandoc.org/), the
great multi-format document converter. Paja is inspired by
[Paru](https://heerdebeer.org/Software/markdown/paru/), a
[Ruby](https://www.ruby-lang.org/en/) wrapper for pandoc that I wrote earlier.
Like Paru, Paja supports automating the use of pandoc. Paja is [free
software](https://www.gnu.org/philosophy/free-sw.html); Paja is licensed under
the [GNU General Public Licence version
3](https://www.gnu.org/licenses/gpl-3.0.html). Get the code at
[https://github.com/htdebeer/paja](https://github.com/htdebeer/paja).

The current version of Paja is *0.0.3*, which is an alpha version.

# Installation

Because Paja is a wrapper around pandoc, pandoc is obviously a requirement for
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

All of [pandoc's long-style command line
options](http://pandoc.org/README.html#options) are mapped to a method of the
`Pandoc` class. Option names without the prefix "`--`" are converted to
camelCase method names. For example:

- `--from format` maps to `Pandoc.from("format")`
- `--data-dir path` maps to `Pandoc.dataDir("path")`
- `--table-of-contents` maps to `Pandoc.tableOfContents()`

The table of contents's short option is actually also supported—I got tired of
typing the long form quite fast as I use that option often—so `Pandoc.toc()`
works as well.

Pandoc can also be used as a [transform
stream](https://nodejs.org/dist/latest-v6.x/docs/api/stream.html#stream_class_stream_transform). This makes it easy to pipe some read stream through pandoc. For example, this documentation file, `index.md` can be converted to [HTML](https://www.w3.org/TR/html5/) and outputted to STDOUT as follows:

~~~{.javascript}
const paja = require("paja");
const fs = require("fs");

const md2html = paja.Pandoc
    .converter()
        .from("markdown")
        .to("html")
        .css("style.css")
        .css("extra-style.css")
        .toc()
        .standalone()
    .stream();

const INPUT_FILE = "index.md";

fs.createReadStream(INPUT_FILE, {encoding: "utf8"})
    .pipe(md2html)
    .pipe(process.stdout);
~~~

Observe that the `Pandoc.css` method is called twice; Pandoc adds both
stylesheets to the HEAD element of the generated HTML. All pandoc's command line options
that can occur more than once, such as `--include-in-header` or `--variable`,
have the same behavior: you can call these methods as often as you like.
