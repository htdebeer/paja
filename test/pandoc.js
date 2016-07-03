import Pandoc from "../src/Pandoc";

const should = require("chai").should();

const converter = Pandoc.converter().from("markdown").to("html");

const INPUT = "hello *bold* day";
const OUTPUT = "<p>hello <em>bold</em> day</p>";

describe("Pandoc", function () {
    describe("converter", function () {
        it("should run pandoc successfully", function (done) {
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

        it("should accept flags that are implicitly true", function (done) {
            converter.toc();
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

        it("should accept flags that are explicitly true", function (done) {
            converter.toc(true);
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

        it("should accept flags that are false", function (done) {
            converter.toc(false);
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

        it("should accept multi-options", function (done) {
            converter.variable("title:This is a title").variable("author: Huub de Beer");
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

        it("should use the last setting used for single-options", function (done) {
            converter.to("docx").to("html");
            converter.run(INPUT, (output) => {
                output.trim().should.equal(OUTPUT);
                done();
            });
        });

    })
});

describe("PandocStream", function () {
    it("should run pandoc as a transform stream", function (done) {

        let pandocConverter = converter.stream();

        pandocConverter.on("data", (output) => {
            output.trim().should.equal(OUTPUT);
            done();
        });

        pandocConverter.setEncoding("utf8");

        pandocConverter.write(INPUT);
        pandocConverter.end();

    });

});

