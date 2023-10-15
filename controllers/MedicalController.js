import MedicalModel from "../models/MedicalModel.js";
import HospitalModel from "../models/HospitalModel.js";

export const index = async (req, res) => {
  const medical = await MedicalModel.find().sort({ $natural: -1 }).lean();
  res.render("medical/index", { medical });
};

export const show = async (req, res) => {
  const medical = await MedicalModel.findById(req.params).lean();
  return res.render("medical/show", { medical });
};

export const create = async (req, res) => {
  const hospital = await HospitalModel.find().lean();
  return res.render("medical/create", { hospital });
};

export const store = async (req, res) => {
  const { name, hospital_id, disease } = req.body;
  await MedicalModel.create({
    name,
    hospital_id,
    disease,
  });
  const medical = await MedicalModel.find().sort({ $natural: -1 }).lean();
  return res.render("medical/index", { medical });
};

export const edit = async (req, res) => {
  const medical = await MedicalModel.findById(req.params).lean();
  const hospitla = await HospitalModel.find().lean();
  return res.render("service/edit", { medical, hospital });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, hospital_id, disease } = req.body;

  await MedicalModel.findByIdAndUpdate(id, {
    $set: {
      name,
      hospital_id,
      disease,
    },
  });
  const singlemedical = await MedicalModel.findById(req.params).lean();
  res.render("medical/show", { medical: singlemedical, status: true });
};

export const destroy = async (req, res) => {
  const id = req.params;
  const medical = await MedicalModel.findById(id).lean();
  const msged = medical.name + " : Delete Successfully ,";
  const medicals = await MedicalModel.findByIdAndDelete(id);
  const newmedical = await MedicalModel.find().sort({ $natural: -1 }).lean();
  res.render("medical/index", { medical: newmedical, msged });
};

export const search = async (req, res) => {
  const searchmedical = await MedicalModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();
  return res.render("medical/index", { medical: searchmedical });
};
