import mongoose, { Schema, Document } from "mongoose";

export interface ITutorial extends Document {
  title: string;
  url: string;
}

const tutorialSchema = new Schema<ITutorial>({
  title: { type: String, required: true },
  url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ITutorial>("Tutorial", tutorialSchema);
