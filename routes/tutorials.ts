import { Router } from "express";
import type { Request, Response } from "express";
import { admin, protect } from "../middleware/auth.js";
import Tutorial from "../models/Tutorial.js";


const router = Router();

// ADD tutorial (Admin)
router.post("/", protect, admin, async (req: Request, res: Response) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) return res.status(400).json({ message: "Title and URL required" });

    const tutorial = await Tutorial.create({ title, url });
    res.status(201).json(tutorial);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET all tutorials (User)
router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE tutorial (Admin)
router.delete("/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

    await tutorial.deleteOne();
    res.json({ message: "Tutorial deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
