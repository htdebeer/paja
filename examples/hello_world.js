const paja = require("paja");
const INPUT = `
> Hello World! 

from **Paja**`;

const markdown2html = paja.Pandoc.converter().from("markdown").to("html");
markdown2html.run(INPUT, console.log);
