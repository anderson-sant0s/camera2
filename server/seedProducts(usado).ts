import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";
import { allProducts } from "./data/allProducts";

dotenv.config({ path: "./server/.env" });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    await Product.deleteMany({});
    await Product.insertMany(allProducts);

    console.log("Seed finalizado com sucesso!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
