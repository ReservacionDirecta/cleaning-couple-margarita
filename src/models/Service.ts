import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  category: "basic" | "deep" | "specialized" | "commercial" | "addon";
  description: string;
  shortDescription: string;
  icon: string;
  duration: number;
  price: number;
  includes: string[];
  doesNotInclude: string[];
  isPopular: boolean;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, "El nombre del servicio es obligatorio"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ["basic", "deep", "specialized", "commercial", "addon"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 150,
    },
    icon: {
      type: String,
      default: "BsBrush",
    },
    duration: {
      type: Number,
      required: true,
      min: 30,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    includes: [String],
    doesNotInclude: [String],
    isPopular: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;
