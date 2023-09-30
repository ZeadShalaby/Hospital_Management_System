import { Schema, model } from "mongoose";
const medical = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hospital",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    disease: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("medical", medical);