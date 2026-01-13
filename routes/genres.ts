import { Router } from "express";
import type { Request, Response } from "express";
import { admin, protect } from "../middleware/auth.js";
import Genre from "../models/Genre.js";


const router = Router();

// CREATE Genre (Admin)
router.post("/", protect, admin, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const exist = await Genre.findOne({ name });
    if (exist) return res.status(400).json({ message: "Genre already exists" });

    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET all genres
router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE genre (Admin)
router.put("/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    genre.name = name || genre.name;
    await genre.save();
    res.json(genre);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE genre (Admin)
router.delete("/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.deleteOne();
    res.json({ message: "Genre deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
