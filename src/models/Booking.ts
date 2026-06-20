import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  property?: Types.ObjectId;
  services: Types.ObjectId[];
  date: Date;
  timeSlot: string;
  duration: number;
  address: string;
  city: string;
  notes?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  paymentMethod?: string;
  assignedCleaner?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
    date: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
    },
    timeSlot: {
      type: String,
      required: [true, "El horario es obligatorio"],
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    address: {
      type: String,
      required: [true, "La dirección es obligatoria"],
    },
    city: {
      type: String,
      required: true,
      default: "Margarita",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    contactName: {
      type: String,
      required: [true, "El nombre de contacto es obligatorio"],
    },
    contactPhone: {
      type: String,
      required: [true, "El teléfono de contacto es obligatorio"],
    },
    contactEmail: {
      type: String,
      required: [true, "El correo de contacto es obligatorio"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
    },
    assignedCleaner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ user: 1, date: -1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ date: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
