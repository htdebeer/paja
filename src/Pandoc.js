/**
 * paja: pandoc wrapped in JavaScript; use pandoc with JavaScript
 * 
 * copyright (C) 2016 Huub de Beer <Huub@heerdebeer.org>
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import PANDOC_OPTIONS from "./PANDOC_OPTIONS.js";

/** 
 * Convert CLI options, such as "a-long-option" to its conventional
 * JavaScript name "aLongOption".
 */
const option2method = function (option) {
    return option.replace(/-([a-z])/, (_, c) => c.toUpperCase());
};

/**
 * Single options can only occur once. A single option method sets a value or
 * replaces an already existing value.
 */
const singleOptionMethod = function (Pandoc, option) {
    Pandoc.prototype[option2method(option)] = function (val) {
        this.config[option] = val;
        return this;
    };
};

/**
 * Multi options can be set more than once. Each time a multi option method is
 * called, an extra value is added.
 */
const multiOptionMethod = function (Pandoc, option) {
    Pandoc.prototype[option2method(option)] = function (val) {
        if (undefined === this.configuration[option]) {
            this.config[option] = [];
        }

        this.config[option].push(val);
        return this;
    };
};

const toOptions = function (config) {
    const optionString = function (option, value, skipValue = false) {
        let str = `--${option}`;
        if (!skipValue) {
            str += `=${value}`;
        }
        return str;
    };

    const toOptionStringArray = function (opts, opt) {
        const value = config[opt];

        if ("boolean" === typeof value) {
            if (value) {
                opts.push(optionString(opt, value, true));
            } else {
                // Skip flags that are set to false;
            }
        } else if (Array.isArray(value)) {
            value.forEach((v) => opts.push(optionString(opt, v)));
        } else {
            opts.push(optionString(opt, value));
        }

        return opts;
    };

    return Object.keys(config).reduce(toOptionStringArray, []);
};

let Pandoc = class {
    constructor(config = {}) {
        this.config = config;
    }
    
    static converter(config) {
       return new Pandoc(config);
    }

    run(input, callback, options = {}) {
        let proc = require("child_process")
            .spawn("pandoc", toOptions(this.config), options);

        
        proc.stderr.on("data", (data) => {
            throw new Error(data);
        });
            
        proc.stdout.on("data", (data) => callback(data));

        proc.stdout.setEncoding("utf8");
        proc.stdin.setEncoding("utf8");
        proc.stdin.write(input);
        proc.stdin.end();
    }

};

for (let [option, defaultValue] of PANDOC_OPTIONS) {
    if (Array.isArray(defaultValue)) {
        multiOptionMethod(Pandoc, option);
    } else {
        singleOptionMethod(Pandoc, option);
    }
}

export default Pandoc;
