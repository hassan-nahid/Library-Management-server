import { Router } from "express";
import { createBook, deleteBookByID, getAllBook, getBookByID, updateBookByID } from "./book.controller";

const bookRoute = Router()

bookRoute.post("/", createBook)
bookRoute.get("/", getAllBook)
bookRoute.get("/:bookId", getBookByID)
bookRoute.patch("/:bookId", updateBookByID)
bookRoute.delete("/:bookId", deleteBookByID)

export default bookRoute;