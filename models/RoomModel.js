import { Schema, model } from "mongoose";

const room = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "patient",
    },
    numroom: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default model("room", room);
