import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
  name: string;
  slug: string;
  type: "apartment" | "house" | "villa" | "condo" | "commercial";
  description: string;
  shortDescription: string;
  location: string;
  address: string;
  city: string;
  state: string;
  images: string[];
  pricePerHour: number;
  pricePerVisit: number;
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  cleaningTypes: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ["apartment", "house", "villa", "condo", "commercial"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      default: "Margarita",
    },
    state: {
      type: String,
      required: true,
      default: "Nueva Esparta",
    },
    images: [
      {
        type: String,
      },
    ],
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerVisit: {
      type: Number,
      required: true,
      min: 0,
    },
    squareMeters: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    features: [String],
    cleaningTypes: [String],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

PropertySchema.index({ slug: 1 });
PropertySchema.index({ city: 1, state: 1 });
PropertySchema.index({ type: 1 });
PropertySchema.index({ isAvailable: 1 });

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
