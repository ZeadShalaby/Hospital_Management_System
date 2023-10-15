import RoomModel from "../models/RoomModel.js";
import PatientModel from "../models/PatientModel.js";

export const index = async (req, res) => {
  const allroom = await RoomModel.find().populate("patient_id").lean();
  res.render("", { allroom });
};

export const show = async (req, res) => {
  const singleroom = await RoomModel.findById(req.params)
    .populate("patient_id")
    .lean();
  res.render("", singleroom);
};

export const edit = (req, res) => {};

export const update = (req, res) => {};

export const search = async (req, res) => {
  const patient = await PatientModel.find({ name: req.body.search }).lean();
  const searchroom = await RoomModel.find({ patient_id: patient._id }).lean();
  res.render("room/index", { room: searchroom });
};
