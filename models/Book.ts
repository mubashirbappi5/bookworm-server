import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: mongoose.Schema.Types.ObjectId;
  description: string;
  coverUrl: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String },
  coverUrl: { type: String }
}, { timestamps: true });

export default mongoose.model<IBook>("Book", bookSchema);
