import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], required: true },
    isbn: { type: String, required: true, unique: true,trim: true },
    description: { type: String, trim: true },
    copies: { type: Number, min: [0, "Copies must be a positive number"],required:true },
    available: { type: Boolean, default: true }
},{
    timestamps:true,
    versionKey: false
})

bookSchema.methods.updateAvailability = async function () {
  if (this.copies === 0 && this.available !== false) {
    this.available = false;
    await this.save();
  }
};

export const Book = model<IBook, any>("Book", bookSchema);