import { Schema, model } from "mongoose";

const nuress = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    phone: {
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
export default model("nuress", nuress);
