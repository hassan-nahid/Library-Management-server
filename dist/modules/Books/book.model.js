"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], required: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: [0, "Copies must be a positive number"], required: true },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.methods.updateAvailability = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies === 0 && this.available !== false) {
            this.available = false;
            yield this.save();
        }
    });
};
bookSchema.post("findOneAndUpdate", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!doc)
            return;
        if (doc.copies === 0 && doc.available !== false) {
            doc.available = false;
            yield doc.save();
        }
        else if (doc.copies > 0 && doc.available !== true) {
            doc.available = true;
            yield doc.save();
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
