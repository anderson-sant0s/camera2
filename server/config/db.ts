import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/camera2";
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin2:123@banco1.byxksfs.mongodb.net/?appName=Banco1";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar MongoDB:", err);
    process.exit(1);
  }
};
