import ServiceModel from "../models/ServiceModel.js";
import DOCTORModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
import UsersModel from "../models/UsersModel.js";
import NuresModel from "../models/NuresModel.js";
import {
  service,
  ADMIN,
  DOCTOR,
  NURESS,
  PATIENT,
} from "../models/RoleModel.js";

export const index = async (req, res) => {
  const service = await ServiceModel.find().sort({ $natural: -1 }).lean();
  res.render("service/index", { service });
};

export const show = async (req, res) => {
  const service = await ServiceModel.findById(req.params).lean();
  return res.render("service/show", { service });
};

export const create = async (req, res) => {
  return res.render("servoce/create");
};

export const store = async (req, res) => {
  const { name, phone, photo } = req.body;
  await ServiceModel.create({
    name,
    phone,
    photo,
  });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(name, salt);

  await UsersModel.create({
    name,
    email: name + "@" + "service" + ".com",
    password: hash,
    photo,
    role: service,
  });
  const service = await service.find().sort({ $natural: -1 }).lean();
  return res.render("service/index", { service });
};

export const edit = async (req, res) => {
  const service = await ServiceModel.findById(req.params).lean();
  return res.render("service/edit");
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, phone, photo } = req.body;
  const old_service = await ServiceModel.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_service.photo;
  } else {
    path = req.body.photo;
  }
  await ServiceModel.findByIdAndUpdate(id, {
    $set: {
      name,
      phone,
      photo: path,
    },
  });
  const singleservice = await ServiceModel.findById(req.params).lean();
  res.render("service/show", { service: singleservice, status: true });
};

export const destroy = async (req, res) => {
  const id = req.params;
  const services = await ServiceModel.findById(id).lean();
  const msged = services.name + " : Delete Successfully ,";
  const service = await ServiceModel.findByIdAndDelete(id);
  const users = await UsersModel.find()
    .where("name")
    .equals(service.name)
    .lean();
  const userservice = await UsersModel.findByIdAndDelete(users);
  const servic = await ServiceModel.find().sort({ $natural: -1 }).lean();
  res.render("service/index", { service: servic, msged });
};

export const search = async (req, res) => {
  const searchservice = await ServiceModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();
  return res.render("service/index", { service: searchservice });
};

// todo
// ! todo work Service //
// ?

export const patientindex = async (req, res) => {
  const patient = await PatientModel.find().sort({ $natural: -1 }).lean();
  res.render("nuress/worknuress/index", { patient });
};

export const patientshow = async (req, res) => {
  const patient = await PatientModel.findById(req.params).lean();
  if ((req.user.name != nanuress) | (patient.nuress_id != req.user._id)) {
    res.render("errors/403");
  } else if (req.user.name == nanuress) {
    res.render("worknuress/show", { patient });
  } else {
    res.render("worknuress/show", { patient });
  }
};

export const patientcreate = async (req, res) => {
  const doctor = await DOCTORModel.find().lean();
  const nuress = await NuresModel.find({ role: "3" }).lean();
  res.render("nuress/worknuress/create", { doctor, nuress });
  console.log(doctor + " " + nuress);
};

export const patientstore = async (req, res) => {
  const {
    name,
    age,
    sex,
    phone,
    city,
    photo,
    height,
    weight,
    doctor_id,
    nuress_id,
  } = req.body;
  await PatientModel.create({
    name,
    age,
    sex,
    phone,
    city,
    photo,
    height,
    weight,
    doctor_id,
    nuress_id,
  });
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(name, salt);

  await UsersModel.create({
    name,
    email: name + "@" + "patient" + ".com",
    password: hash,
    photo,
    role: PATIENT,
  });
  const patient = await PatientModel.find().sort({ $natural: -1 }).lean();
  return res.render("service/index", { service: patient });
};

export const patientedit = async (req, res) => {
  const patient = await PatientModel.findById(req.params).lean();
  const doctor = await DOCTORModel.find().lean();
  const nuress = await NuresModel.find({ role: "3" }).lean();
  res.render("nuress/worknuress/create", { doctor, nuress, patient });
  console.log(doctor + " " + nuress);
};

export const patientupdate = async (req, res) => {
  const {
    name,
    age,
    sex,
    phone,
    city,
    photo,
    height,
    weight,
    doctor_id,
    nuress_id,
  } = req.body;

  const old_patient = await PatientModel.findById(req.params).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_patient.photo;
  } else {
    path = req.body.photo;
  }
  await PatientModel.findByIdAndUpdate(id, {
    $set: {
      name,
      age,
      sex,
      phone,
      city,
      photo: path,
      height,
      weight,
      doctor_id,
      nuress_id,
    },
  });
  const patient = await PatientModel.find().sort({ $natural: -1 }).lean();
  return res.render("service/index", { service: patient });
};

export const patientcheckout = async (req, res) => {
  const id = req.params;
  const patient = await PatientModel.findById(id).lean();
  const msged = patient.name + " : Delete Successfully ,";
  const patients = await PatientModel.findByIdAndDelete(id);
  const users = await UsersModel.find()
    .where("name")
    .equals(patient.name)
    .lean();
  const userpatient = await UsersModel.findByIdAndDelete(users);
  const patientes = await PatientModel.find().sort({ $natural: -1 }).lean();
  res.render("nuress/worknuress/index", { service: patient });
};

export const patientsearch = async (req, res) => {
  const patientsearch = await PatientModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();
  return res.render("service/workservice/index", { service: patientsearch });
};
