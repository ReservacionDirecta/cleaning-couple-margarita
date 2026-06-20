import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  user: Types.ObjectId;
  booking?: Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  serviceQuality: number;
  punctuality: number;
  professionalism: number;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      maxlength: 1000,
    },
    serviceQuality: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    professionalism: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ user: 1 });
ReviewSchema.index({ rating: -1 });
ReviewSchema.index({ isFeatured: 1 });
ReviewSchema.index({ createdAt: -1 });

const Review: Model<IReview> =
  mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
