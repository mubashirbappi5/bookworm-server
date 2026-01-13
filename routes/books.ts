import { Router } from "express";
import type { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import Book from "../models/Book.js";
import { protect, admin } from "../middleware/auth.js";
import cloudinary from "../config/cloudinary.js";

const router = Router();

// ----- Multer setup (temporary local storage) -----
const upload = multer({ dest: "uploads/" });

// ----- CREATE BOOK (Admin only) -----
router.post("/", protect, admin, upload.single("cover"), async (req: Request, res: Response) => {
  try {
    const { title, author, genre, description } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({ message: "Title, author, and genre are required" });
    }

    let coverUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "book_covers",
      });
      coverUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
    }

    const book = await Book.create({ title, author, genre, description, coverUrl });
    res.status(201).json(book);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ----- GET ALL BOOKS -----
router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("genre");
    res.json(books);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ----- GET SINGLE BOOK -----
router.get("/:id", protect, async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("genre");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ----- UPDATE BOOK (Admin only) -----
router.put("/:id", protect, admin, upload.single("cover"), async (req: Request, res: Response) => {
  try {
    const { title, author, genre, description } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.description = description || book.description;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "book_covers",
      });
      book.coverUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove local file
    }

    await book.save();
    res.json(book);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ----- DELETE BOOK (Admin only) -----
router.delete("/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
