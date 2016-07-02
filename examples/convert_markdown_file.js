// Convert index.md to an HTML file on stdout
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
