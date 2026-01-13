
import type { NextFunction,Request, Response } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Not authorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.user = decoded;
  next();
};



export const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") return res.status(403).json("Forbidden");
  next();
};

