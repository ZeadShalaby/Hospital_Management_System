import PatientModel from "../models/PatientModel.js";
import ReportModel from "../models/ReportModel.js";

export const index = async (req, res) => {
  const patient = await PatientModel.findById(req.user._id)
    .populate("docotr_id")
    .populate("nuress_id")
    .lean();
  res.render("/index", { patient });
};

export const showreport = async (req, res) => {
  const myreport = await ReportModel.find({ patient_id: req.user._id })
    .populate("patient_id")
    .populate("specialist_id")
    .populate("hospital_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .lean();
  res.render("/show", { myreport });
};

export const create = (req, res) => {};

export const store = (req, res) => {};

export const edit = (req, res) => {};

export const update = (req, res) => {};

export const destroy = (req, res) => {};

export const search = (req, res) => {};
