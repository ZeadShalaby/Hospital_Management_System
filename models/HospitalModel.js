import { Schema, model } from "mongoose";

const hospitalschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("hospital", hospitalschema);
