import { Router } from "express";
import Product from "../models/Product";

const router = Router();

// Listar todos os produtos
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar produtos", error: err });
  }
});

// Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produto não encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar produto", error: err });
  }
});

export default router;
