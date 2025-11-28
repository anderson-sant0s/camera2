import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import fs from "fs";
import productRoutes from "./routes/products";

dotenv.config();

async function startServer() {
  const app = express();

  // Conectar ao MongoDB
  await connectDB();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Rotas API
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);

  // Servir frontend quando em produção e quando build existir
  if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(process.cwd(), "dist", "public"); // corresponde ao vite config outDir
    if (fs.existsSync(staticPath)) {
      app.use(express.static(staticPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
      });
      console.log("Static frontend serving from:", staticPath);
    } else {
      console.warn("Build folder not found at", staticPath);
    }
  }

  const port = Number(process.env.PORT) || 3001;
  app.listen(port, () =>
    console.log(`Server rodando em http://localhost:${port}`)
  );
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
