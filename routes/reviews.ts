import { Router } from "express";
import type { Request, Response } from "express";
import { admin, protect } from "../middleware/auth.js";
import Review from "../models/Review.js";

const router = Router();

// POST review (user)
router.post("/", protect, async (req: any, res: Response) => {
  try {
    const { book, rating, text } = req.body;
    if (!book || !rating || !text)
      return res.status(400).json({ message: "All fields required" });

    const review = await Review.create({
      user: req.user._id,
      book,
      rating,
      text,
    });

    res.status(201).json(review);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET pending reviews (Admin)
router.get("/pending", protect, admin, async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ approved: false })
      .populate("user")
      .populate("book");
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// APPROVE review (Admin)
router.put(
  "/:id/approve",
  protect,
  admin,
  async (req: Request, res: Response) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: "Review not found" });

      review.approved = true;
      await review.save();
      res.json(review);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

// DELETE review (Admin)
router.delete("/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
