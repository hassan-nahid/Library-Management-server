import { Router } from "express";
import { createBorrowBook, getBorrowedBooksSummary } from "./borrow.controller";

const borrowRoute = Router()

borrowRoute.post("/", createBorrowBook)
borrowRoute.get("/", getBorrowedBooksSummary)



export default borrowRoute;