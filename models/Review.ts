import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  book: mongoose.Schema.Types.ObjectId;
  rating: number;
  text: string;
  approved: boolean;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IReview>("Review", reviewSchema);
