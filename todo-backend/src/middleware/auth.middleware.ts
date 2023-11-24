import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decoded === "string" || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};
