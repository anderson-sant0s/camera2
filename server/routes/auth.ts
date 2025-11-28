import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ msg: "Preencha todos os campos (name, email, password)" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    return res
      .status(201)
      .json({
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Erro interno" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Preencha todos os campos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Senha incorreta" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Erro interno" });
  }
});

export default router;
