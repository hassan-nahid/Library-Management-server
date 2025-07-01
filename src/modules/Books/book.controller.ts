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
            return res.status(500).json({
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

        res.status(200).send({
            success: true,
            message: "Book created successfully",
            data,
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.status(500).send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        } else {
            res.status(500).send({
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
    const { filter, sortBy, sort, limit = "10", page = "1" } = req.query;

    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const sortCondition: any = {};
    if (sortBy) {
      sortCondition[sortBy as string] = sort === "asc" ? 1 : -1;
    }

    const limitNumber = parseInt(limit as string) || 10;
    const pageNumber = parseInt(page as string) || 1;
    const skip = (pageNumber - 1) * limitNumber;

    const data = await Book.find(query)
      .sort(sortCondition)
      .skip(skip)
      .limit(limitNumber);

    const total = await Book.countDocuments(query);

    res.status(200).send({
      success: true,
      message: "Books retrieved successfully",
      data,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error: any) {
    res.status(500).send({
      message: "Error retrieving books",
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

        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
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

        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.status(500).send({
                message: "Validation failed",
                success: false,
                error: error,
            });
        } else {
            res.status(600).send({
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

        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        res.status(500).send({
            message: "Error in deleting book",
            success: false,
            error: error,
        });
    }
}