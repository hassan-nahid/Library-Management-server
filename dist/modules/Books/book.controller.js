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
exports.deleteBookByID = exports.updateBookByID = exports.getBookByID = exports.getAllBook = exports.createBook = void 0;
const book_model_1 = require("./book.model");
// create book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, isbn, description } = req.body;
        if (typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof genre !== 'string' ||
            typeof isbn !== 'string' ||
            (description && typeof description !== 'string')) {
            return res.send({
                success: false,
                message: "Title must be a string",
            });
        }
        const book = new book_model_1.Book(req.body);
        const data = yield book.save();
        res.send({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        }
        else {
            res.send({
                message: "Error in book creation",
                success: false,
                error: error,
            });
        }
    }
});
exports.createBook = createBook;
// get all book with query
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortCondition = {};
        if (sortBy) {
            sortCondition[sortBy] = sort === "asc" ? 1 : -1;
        }
        const resultLimit = limit ? parseInt(limit) : 10;
        const data = yield book_model_1.Book.find(query)
            .sort(sortCondition)
            .limit(resultLimit);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Error in retrieved books",
            success: false,
            error: error,
        });
    }
});
exports.getAllBook = getAllBook;
// get single book by id
const getBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.send({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.send({
            message: "Error in retrieved book",
            success: false,
            error: error,
        });
    }
});
exports.getBookByID = getBookByID;
const updateBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const playload = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, playload, { new: true, runValidators: true });
        res.send({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        }
        else {
            res.send({
                message: "Error in updating book",
                success: false,
                error: error,
            });
        }
    }
});
exports.updateBookByID = updateBookByID;
const deleteBookByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.send({
            message: "Error in deleting book",
            success: false,
            error: error,
        });
    }
});
exports.deleteBookByID = deleteBookByID;
