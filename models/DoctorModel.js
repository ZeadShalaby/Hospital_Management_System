import { Schema, model } from "mongoose";

const doctormodel = new Schema(
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
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("doctor", doctormodel);
//deleted: { type: Boolean, default: false }     const singlespecialist = await specialist.findById(id).populate('specialist_id').lean();
// {{subject.department?.name}}
