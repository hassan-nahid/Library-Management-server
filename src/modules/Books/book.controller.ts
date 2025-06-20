import { Request, Response, } from "express";
import { Book } from "./book.model";

// create book
export const createBook = async (req: Request, res: Response): Promise<any> => {
    try {

        const { title, author, genre, isbn, description } = req.body;

        if (
            typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof genre !== 'string' ||
            typeof isbn !== 'string' ||
            (description && typeof description !== 'string')
        ) {
           return res.send({
                success: false,
                message: "Title must be a string",
            });
        }

        const book = new Book(req.body);
        const data = await book.save();

        res.send({
            success: true,
            message: "Book created successfully",
            data,
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        } else {
            res.send({
                message: "Error in book creation",
                success: false,
                error: error,
            });
        }
    }
};

// get all book with query
export const getAllBook = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy, sort, limit } = req.query;

        const query: any = {};


        if (filter) {
            query.genre = filter;
        }

        const sortCondition: any = {};
        if (sortBy) {
            sortCondition[sortBy as string] = sort === "asc" ? 1 : -1;
        }

        const resultLimit = limit ? parseInt(limit as string) : 10;

        const data = await Book.find(query)
            .sort(sortCondition)
            .limit(resultLimit)

        res.send({
            success: true,
            message: "Books retrieved successfully",
            data
        })


    } catch (error: any) {

        res.send({
            message: "Error in retrieved books",
            success: false,
            error: error,
        });

    }
};


// get single book by id

export const getBookByID = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId)

        res.send({
            success: true,
            message: "Book retrieved successfully",
            data
        })
    } catch (error) {
        res.send({
            message: "Error in retrieved book",
            success: false,
            error: error,
        });

    }
}

export const updateBookByID = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const playload = req.body;
        const data = await Book.findByIdAndUpdate(bookId, playload, { new: true, runValidators: true })

        res.send({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        } else {
            res.send({
                message: "Error in updating book",
                success: false,
                error: error,
            });
        }
    }
}

export const deleteBookByID = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const data = await Book.findByIdAndDelete(bookId, { new: true })

        res.send({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        res.send({
            message: "Error in deleting book",
            success: false,
            error: error,
        });
    }
}