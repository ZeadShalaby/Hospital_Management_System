import { Schema, model } from "mongoose";

const PatientModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "doctor",
    },
    nuress_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "nuress",
    },
  },
  { timestamps: true }
);

export default model("patient", PatientModel);
