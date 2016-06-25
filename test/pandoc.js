import Pandoc from "../src/Pandoc";

const should = require("chai").should();

describe("Pandoc", function () {
    describe("converter", function () {
        it("should run pandoc successfully", function (done) {
            const INPUT = "hello *bold* day";
            const OUTPUT = "<p>hello <em>bold</em> day</p>";

            Pandoc.converter()
                .from("markdown")
                .to("html")
                .run(INPUT, (output) => {
                    output.trim().should.equal(OUTPUT);
                    done();
                });
        });
    });
});
