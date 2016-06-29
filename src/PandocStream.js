import Pandoc from "./Pandoc.js";

const Transform = require("stream").Transform;

export default class extends Transform {
    constructor(converter, options = {}) {
        super(options);
        this.converter = converter;
    }

    _transform(data, encoding, callback) {
        const input = data.toString();
        this.converter.run(input, (output) => {
            this.push(output);
            callback();
        });
    }
}
