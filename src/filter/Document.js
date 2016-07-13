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
import DocumentElement from "./DocumentElement.js";
import Meta from "./Meta.js";
import Block from "./Block.js";

export default class extends DocumentElement {
    constructor(data) {
        super(data);
        this.meta = new Meta(data[0]);
        this.blocks = data[1].reduce((bs, b) => {
            bs.push(new Block(b));
            return bs;
        }, []);
    }

    toObject() {
        return [
            this.meta.toObject(),
            this.blocks.map((b) => b.toObject())
        ];
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }
}
