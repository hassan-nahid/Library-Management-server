import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../Books/book.model";

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
}, {
  timestamps: true,
  versionKey: false
});

borrowSchema.pre("save", async function (next) {
  const doc = this;

  const book = await Book.findById(doc.book);
  if (!book) {
     throw new Error("Not enough copies available");
  }

  if (doc.quantity > book.copies) {
    throw new Error("Not enough copies available");
  }

  next();
});

borrowSchema.post("save", async function (doc) {
  const borrowedQuantity = doc.quantity;
  const book = await Book.findById(doc.book);

  if (book) {
    book.copies = book.copies - borrowedQuantity;
    await book.save();

    await book.updateAvailability();
  }
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
