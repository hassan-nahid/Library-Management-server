import { Request, Response, } from "express";
import { Book } from "./book.model";

// create book
export const createBook = async (req: Request, res: Response): Promise<any> => {
    try {

        const { title, author, genre, isbn, description } = req.body;

        const fields = { title, author, genre, isbn };
        const errors: any = {};

        for (const [key, value] of Object.entries(fields)) {
            if (typeof value !== 'string') {
                errors[key] = {
                    message: `${key[0].toUpperCase() + key.slice(1)} must be a string`,
                    name: "ValidatorError",
                    kind: "type",
                    path: key,
                    value: value ?? null
                };
            }
        }

        if (description && typeof description !== 'string') {
            errors.description = {
                message: "Description must be a string if provided",
                name: "ValidatorError",
                kind: "type",
                path: "description",
                value: description
            };
        }

        if (Object.keys(errors).length > 0) {
            return res.json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ManualValidationError",
                    errors
                }
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