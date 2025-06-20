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
exports.getBorrowedBooksSummary = exports.createBorrowBook = void 0;
const borrow_model_1 = require("./borrow.model");
const createBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playload = req.body;
        const borrow = new borrow_model_1.Borrow(playload);
        const data = yield borrow.save();
        res.send({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        if (error.name === "ValidationError" || error.message === "Not enough copies available") {
            res.send({
                success: false,
                message: "Validation failed",
                error: {
                    name: error.name,
                    message: error.message,
                    errors: error.errors || undefined,
                },
            });
        }
        else {
            res.send({
                success: false,
                message: "Error in borrowing book",
                error: error.message || error,
            });
        }
    }
});
exports.createBorrowBook = createBorrowBook;
const getBorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Error retrieving borrowed books summary",
            error
        });
    }
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
