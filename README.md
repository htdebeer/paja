Paja is a simple JavaScript wrapper around [pandoc](http://pandoc.org/), the
great multi-format document converter. Paja is inspired by
[Paru](https://heerdebeer.org/Software/markdown/paru/), a
[Ruby](https://www.ruby-lang.org/en/) wrapper for pandoc that I wrote earlier.
Like Paru, Paja supports automating the use of pandoc. Paja is [free
software](https://www.gnu.org/philosophy/free-sw.html);
Paja is licensed under the [GNU General Public Licence version
3](https://www.gnu.org/licenses/gpl-3.0.html). 

The current version of Paja is *0.0.3*, which is an alpha version.

See [Paja's webpage](https://heerdebeer.org/Software/markdown/paja/) for more
detailed documentation. Below follows a very brief excerpt of that
documentation

# Installation

Because Paja is a wrapper around pandoc, pandoc obviously is a requirement for
Paja. Install Paja with [npm](https://www.npmjs.com/):

    npm install paja

# Usage

The obligatory "hello world" program with paja:

    const paja = require("paja");
    const INPUT = `
    > Hello World! 

    from **Paja**`;

    const markdown2html = paja.Pandoc.converter().from("markdown").to("html");

    markdown2html.run(INPUT, console.log);

which will output:

    <blockquote>
    <p>Hello World!</p>
    </blockquote>
    <p>from <strong>Paja</strong></p>

For more examples, see the
[documentation](https://heerdebeer.org/Software/markdown/paja/) or the [examples subdirectory](https://github.com/htdebeer/paja/tree/master/examples).
