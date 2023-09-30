import HospitalModel from "../models/HospitalModel.js";
import specialist from "../models/SpecialistModel.js";
import { ADMIN, DOCTOR, NURESS, PATIENT } from "../models/RoleModel.js";

export const index = async (req, res) => {
  const specialists = await specialist.find({}, { name: 1 }).lean();
  const user = req.user;
  console.log(user);
  res.render("specialist/index", { specialists });
};

export const show = async (req, res) => {
  const id = req.params;
  const singlespecialist = await specialist
    .findById(id)
    .populate("hospital_id")
    .lean();
  res.render("Specialist/show", { specialists: singlespecialist });
};

export const create = async (req, res) => {
  const hospital = await HospitalModel.find().lean();
  res.render("specialist/create", { hospital });
};

export const store = async (req, res) => {
  const { name, code, photo, hospital_id } = req.body;
  await specialist.create({
    name,
    code,
    hospital_id,
    photo,
  });
  const specialists = await specialist.find({}, { name: 1 }).lean();
  res.render("Specialist/index", {
    specialists,
    msg: name + " Create Successfully .",
  });
};

export const edit = async (req, res) => {
  const id = req.params;
  const specialistedit = await specialist
    .findById(id)
    .populate("hospital_id")
    .lean();
  const hospital = await HospitalModel.find().lean();
  res.render("Specialist/edit", { specialist: specialistedit, hospital });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, code, photo, hospital_id } = req.body;
  const old_specialist = await specialist.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_specialist.photo;
  } else {
    path = req.body.photo;
  }
  const singlespecialist = await specialist
    .findById(id)
    .populate("hospital_id")
    .lean();
  await specialist.findByIdAndUpdate(id, {
    $set: {
      name,
      code,
      hospital_id,
      photo: path,
    },
  });
  res.render("Specialist/show", {
    specialists: singlespecialist,
    status: true,
  });
};

export const destroy = async (req, res) => {
  const id = req.params;
  await specialist.findByIdAndDelete(id);
  const specialists = await specialist.find({}, { name: 1 }).lean();
  return res.render("Specialist/index", {
    specialists,
    msged: " Delete Successfully .",
  }); //return res.redirect("/specialist", { status });
};

export const restore_index = async (req, res) => {};

export const restore = async (req, res) => {};

export const search = async (req, res) => {};

/***
 * await specialist.findByIdAndUpdate(id, {
    $set: {
      name,
      code,
      hospital_id,
      photo: path,
    },
  });
 */
