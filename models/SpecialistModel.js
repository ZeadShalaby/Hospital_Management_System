import { Schema, model } from "mongoose";

const specialist = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hospital",
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default model("specialist", specialist);
