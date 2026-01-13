import { Router } from "express";

import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

 const exist = await User.findOne({ email });
 if (exist) return res.status(400).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString(), user.role);
  res.cookie("token", token, { httpOnly: true }).json(user);
});

export default router;
