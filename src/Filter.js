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
import Document from "./filter/Document.js";

const selectorMatches = function (selector, block) {
    return true;
};

const applyRule = function (selector, action) {
    return function (block) {
        if (selectorMatches(selector, block)) {
            rule(block);
        }
    }
}

const applyRules = function (filter) {
    return function (block) {
        filter.rules.forEach(applyRule);
    }
}

let Filter = class {
    constructor() {
        this.rules = [];
        this.doc = null;
    }

    static filter() {
        return new Filter();
    }

    run(json) {
        const filter = new Filter(json);
        const data = JSON.parse(json);
        this.doc = new Document(data);
        this.doc.blocks.forEach(applyRules(this));
        return this.toJSON();
    }

    when(selector, callback) {
        this.rules.push([selector, callback]);        
        return this;
    }

    toJSON() {
        return this.doc.toJSON();
    }

}

export default Filter;
