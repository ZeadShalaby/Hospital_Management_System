import NuresModel from "../models/NuresModel.js";
import PatientModel from "../models/PatientModel.js";
import UsersModel from "../models/UsersModel.js";
import SpecialistModel from "../models/SpecialistModel.js";
import HospitalModel from "../models/HospitalModel.js";
import { NURESS } from "../models/RoleModel.js";
import {
  ADMIN,
  DOCTOR,
  PATIENT,
  Nuress,
  service,
} from "../models/RoleModel.js";
import bcrypt from "bcryptjs";

export const index = async (req, res) => {
  const nuress = await NuresModel.find()
    .populate("hospital_id")
    .populate("specialist_id")
    .sort({ $natural: -1 })
    .lean();
  res.render("nuress/index", { nuress });
};

export const show = async (req, res) => {
  const nuress = await NuresModel.findById(req.params)
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  return res.render("nuress/show", { nuress });
};

export const create = async (req, res) => {
  const specialits = await SpecialistModel.find()
    .populate("hospital_id")
    .sort({ $natural: -1 })
    .lean();
  const hospital = await HospitalModel.find().sort({ $natural: -1 }).lean();
  return res.render("nuress/create", { specialits, hospital });
};

export const store = async (req, res) => {
  const { name, specialist_id, hospital_id, phone, photo } = req.body;
  await NuresModel.create({
    name,
    specialist_id,
    hospital_id,
    phone,
    photo,
  });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(name, salt);

  await UsersModel.create({
    name,
    email: name + "@" + "nuress" + ".com",
    password: hash,
    photo,
    role: Nuress,
  });
  const nuress = await NuresModel.find()
    .sort({ $natural: -1 })
    .populate("specialist_id")
    .lean();
  return res.render("nuress/index", { nuress });
};

export const edit = async (req, res) => {
  const specialits = await SpecialistModel.find().lean();
  const hospital = await HospitalModel.find().lean();
  const nuress = await NuresModel.findById(req.params)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  return res.render("nuress/edit", { nuress, hospital, specialits });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, specialist_id, hospital_id, phone, photo } = req.body;
  const old_nuress = await NuresModel.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_nuress.photo;
  } else {
    path = req.body.photo;
  }
  await NuresModel.findByIdAndUpdate(id, {
    $set: {
      name,
      specialist_id,
      hospital_id,
      phone,
      photo: path,
    },
  });
  const singlenuress = await NuresModel.findById(req.params)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  res.render("nuress/show", { nuress: singlenuress, status: true });
};

export const destroy = async (req, res) => {
  const id = req.params;
  const nurs = await NuresModel.findById(id).populate("hospital_id").lean();
  const msged = nurs.name + " : Delete Successfully ,";
  const nuress = await NuresModel.findByIdAndDelete(id);
  const users = await UsersModel.find().where("name").equals(nurs.name).lean();

  const usernurs = await UsersModel.findByIdAndDelete(users);
  const nures = await NuresModel.find()
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  res.render("nuress/index", { nuress: nures, msged });
};

export const search = async (req, res) => {
  const searchnuress = await NuresModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();
  return res.render("nuress/index", { nuress: searchnuress });
};

// todo
// ! todo work nuress //
// ?

export const patientindex = async (req, res) => {
  const patient = await PatientModel.find()
    .where("nuress_id")
    .equals(req.user._id)
    .populate("nuress_id")
    .populate("doctor_id")
    .sort({ $natural: -1 })
    .lean();
  res.render("nuress/worknuress/index", { patient });
};

export const patientshow = async (req, res) => {
  const patient = await PatientModel.findById(req.params).lean();
  if ((req.user.role != service) | (patient.nuress_id != req.user._id)) {
    res.render("errors/403");
  } else if (req.user.role == service) {
    res.render("worknuress/show", { patient });
  } else {
    res.render("worknuress/show", { patient });
  }
};
