"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/", borrow_controller_1.createBorrowBook);
borrowRoute.get("/", borrow_controller_1.getBorrowedBooksSummary);
exports.default = borrowRoute;
