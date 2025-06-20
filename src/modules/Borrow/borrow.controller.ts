import { Request, Response } from "express";
import { Borrow } from "./borrow.model";


export const createBorrowBook = async (req: Request, res: Response) => {
  try {
    const playload = req.body;
    const borrow = new Borrow(playload);
    const data = await borrow.save();

    res.send({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error: any) {
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
};



export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
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
  } catch (error) {
    res.send({
      success: false,
      message: "Error retrieving borrowed books summary",
      error
    });
  }
};

