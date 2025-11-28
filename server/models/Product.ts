import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  images: string[];
  thumbnailUrl: string;
  badge?: string;
}

// const ProductSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   price: { type: Number, required: true },
//   originalPrice: Number,
//   stock: { type: Number, required: true },
//   rating: { type: Number, required: true },
//   reviews: { type: Number, required: true },
//   images: { type: [String], required: true },
//   thumbnailUrl: { type: String, required: true },
//   badge: String,
// });

const productSchema = new Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  originalPrice: Number,
  stock: Number,
  rating: Number,
  reviews: Number,
  images: [String],
  thumbnailUrl: String,
  badge: String,
});

export default mongoose.model<IProduct>("Product", productSchema);
