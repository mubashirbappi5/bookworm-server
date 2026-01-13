import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const genreSchema = new Schema<IGenre>({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model<IGenre>("Genre", genreSchema);
