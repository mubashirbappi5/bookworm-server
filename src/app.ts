import express, { type Application } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.js";

import bookRoutes from "../routes/books.js";
import genreRoutes from "../routes/genres.js";
import reviewRoutes from "../routes/reviews.js";
import tutorialRoutes from "../routes/tutorials.js";
const app: Application = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tutorials", tutorialRoutes);



app.get("/", (req, res) => {
  res.send("📚 Bookworm Server is running");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;
