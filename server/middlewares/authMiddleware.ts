import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token não fornecido" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
