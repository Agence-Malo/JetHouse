import { Schema } from "mongoose";
import mongoose from "@/utils/mongoose";
import IPlane from "@/types/plane";

const PlaneSchema = new Schema<IPlane>(
  {
    name: { type: String, required: true },
    cabin: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      length: { type: Number, required: true },
      seats: { type: Number, required: true },
      beds: { type: Number, required: true },
    },
    speed: { type: Number, required: true },
    range: { type: Number, required: true },
    flown: { type: Number, required: true },
    baggage: { type: Number, required: true },
    crew: {
      pilots: { type: Number, required: true },
      attendants: { type: Number, required: true },
    },
    wifi: { type: Boolean, required: true },
    photos: {
      cover: { type: String, required: true },
      layout: { type: Array, required: true },
      gallery: { type: Array, required: true },
    },
  },
  {
    collection: "fleet",
  },
);

const Plane = mongoose.models.Plane || mongoose.model("Plane", PlaneSchema);

export default Plane;
