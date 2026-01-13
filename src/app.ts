import express, { type Application } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.js";

import bookRoutes from "../routes/books.js";
import genreRoutes from "../routes/genres.js";

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
