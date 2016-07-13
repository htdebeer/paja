import Pandoc from "../src/Pandoc";
import Filter from "../src/Filter";

const should = require("chai").should();

const markdown2json = Pandoc.converter()
    .from("markdown")
    .to("json")
    ;

const json2markdown = Pandoc.converter()
    .from("json")
    .to("markdown")
    .standalone() // use standalone to get metadata back
    ;

const INPUT = "this is an string";

const IDENTITY_FILTER = Filter.filter()
    .when("", function (block) {
        return block;
    });

describe("The Identity filter", function () {
    it("should convert input to the same output≡input", function (done) {
        markdown2json.run(INPUT, (json) => {
            json2markdown.run(IDENTITY_FILTER.run(json), (md) => {
                md.trim().should.equal(INPUT);
                done();
            });
        });
    });
});         
