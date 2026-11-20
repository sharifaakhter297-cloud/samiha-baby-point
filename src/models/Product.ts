import mongoose, { Schema, models, model } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  category: "Newborn" | "Clothing" | "Toys" | "Feeding" | "Skincare";
  price: number;
  discountPrice?: number;
  ageGroup: string;
  image: string;
  stock: number;
  isFeatured: boolean;
  description: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      enum: ["Newborn", "Clothing", "Toys", "Feeding", "Skincare"],
      required: true,
    },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    ageGroup: { type: String, default: "0-12 Months" },
    image: { type: String, required: true },
    stock: { type: Number, default: 10 },
    isFeatured: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model<IProduct>("Product", ProductSchema);