import Pandoc from "../src/Pandoc";
import PandocStream from "../src/PandocStream.js";

const should = require("chai").should();
            
const INPUT = "hello *bold* day";
const OUTPUT = "<p>hello <em>bold</em> day</p>";

const converter = Pandoc.converter().from("markdown").to("html");

describe("Pandoc", function () {
    describe("converter", function () {
        it("should run pandoc successfully", function (done) {
                converter.run(INPUT, (output) => {
                    output.trim().should.equal(OUTPUT);
                    done();
                });
        });
    })
});

describe("PandocStream", function () {
    it("should run pandoc as a transform stream", function (done) {

        let pandocConverter = new PandocStream(converter);

        pandocConverter.on("data", (output) => {
            output.trim().should.equal(OUTPUT);
            done();
        });

        pandocConverter.setEncoding("utf8");

        pandocConverter.write(INPUT);
        pandocConverter.end();

    });
});
