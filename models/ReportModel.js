import { Schema, model } from "mongoose";

const report = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "patient",
    },
    specialist_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "specialist",
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hospital",
    },
    nuress_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "nuress",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "doctor",
    },
    description: {
      type: String,
      required: true,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("report", report);
