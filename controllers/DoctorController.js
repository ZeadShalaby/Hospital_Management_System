import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/PatientModel.js";
import ReportModel from "../models/ReportModel.js";
import SpecialistModel from "../models/SpecialistModel.js";
import HospitalModel from "../models/HospitalModel.js";
import UsersModel from "../models/UsersModel.js";
import NuresModel from "../models/NuresModel.js";
import { ADMIN, DOCTOR, NURESS, PATIENT } from "../models/RoleModel.js";
import bcrypt from "bcryptjs";

// !  function doctor todo admin
export const index = async (req, res) => {
  const doctor = await DoctorModel.find()
    .sort({ $natural: -1 })
    .populate("specialist_id")
    .lean();
  return res.render("doctors/index", { doctor });
};

export const show = async (req, res) => {
  const id = req.params;
  const singledoctor = await DoctorModel.findById(id)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  console.log(singledoctor);
  return res.render("doctors/show", { doctor: singledoctor });
};

export const create = async (req, res) => {
  const specialits = await SpecialistModel.find().lean();
  const hospital = await HospitalModel.find().lean();
  return res.render("doctors/create", { specialits, hospital });
};

export const store = async (req, res) => {
  const { name, specialist_id, hospital_id, phone, photo } = req.body;
  const hospital = await HospitalModel.findById(hospital_id).lean();

  await DoctorModel.create({
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
    email: name + "@" + "doctor" + ".com",
    password: hash,
    photo,
    role: DOCTOR,
  });
  const doctor = await DoctorModel.find()
    .sort({ $natural: -1 })
    .populate("specialist_id")
    .lean();
  return res.render("doctors/index", { doctor });
};

export const edit = async (req, res) => {
  const specialits = await SpecialistModel.find().lean();
  const hospital = await HospitalModel.find().lean();
  const doctor = await DoctorModel.findById(req.params)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  return res.render("doctors/edit", { doctor, hospital, specialits });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, specialist_id, hospital_id, phone, photo } = req.body;
  const old_doctor = await DoctorModel.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_doctor.photo;
  } else {
    path = req.body.photo;
  }
  await DoctorModel.findByIdAndUpdate(id, {
    $set: {
      name,
      specialist_id,
      hospital_id,
      phone,
      photo: path,
    },
  });
  const singledoctor = await DoctorModel.findById(req.params)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  res.render("doctors/show", { doctor: singledoctor, status: true });
};

export const destroy = async (req, res) => {
  const id = req.params;
  const doc = await DoctorModel.findById(id).populate("hospital_id").lean();
  const msged = doc.name + " : Delete Successfully ,";
  const doctors = await DoctorModel.findByIdAndDelete(id);
  const users = await UsersModel.find().lean();
  let idusers = 1;
  users.forEach((item) => {
    if (item.name == doc.name) {
      idusers = item._id;
    }
  });
  const userdoc = await UsersModel.findByIdAndDelete(idusers);
  const doctor = await DoctorModel.find().populate("specialist_id").lean();
  res.render("doctors/index", { doctor, msged });
};

// ! Work doctors function todo doctors //

export const indexreport = async (req, res) => {
  const report = await ReportModel.find({
    doctor_id: "65144effc4291351852686c5",
  })
    .sort({ $natural: -1 })
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  res.render("doctors/workdoctors/index", { report });
};

export const showreport = async (req, res) => {
  const report = await ReportModel.findById(req.params)
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  res.render("doctors/workdoctors/show", { report });
};

export const createreport = async (req, res) => {
  const id = req.user._id;
  const specialits = await SpecialistModel.find()
    .populate("hospital_id")
    .lean();
  const hospital = await HospitalModel.find().lean();
  const nuress = await NuresModel.find()
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  const doctor = await DoctorModel.findById(id)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  const patient = await PatientModel.find()
    .populate("doctor_id")
    .populate("nuress_id")
    .lean();
  var patie = [];

  patient.forEach((item) => {
    const v1 = item.doctor_id._id,
      v2 = doctor._id;
    if (v2.equals(item.doctor_id._id)) {
      console.log("done");
      patie.push(item);
    } else {
      console.log("error", v1 + " != " + v2);
    }
  });
  res.render("doctors/workdoctors/create", {
    specialits,
    hospital,
    nuress,
    doctor,
    patient: patie,
  });
};

export const storereport = async (req, res) => {
  const id = "65146ac8362aa87bb1478444";
  const { patient_id, specialist_id, hospital_id, nuress_id, description } =
    req.body;
  await ReportModel.create({
    patient_id,
    specialist_id,
    hospital_id,
    nuress_id,
    doctor_id: id,
    description,
  });
  const report = await ReportModel.find()
    .sort({ $natural: -1 })
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  return res.render("doctors/workdoctors/index", { report });
};

export const editreport = async (req, res) => {
  const reports = await ReportModel.findById(req.params)
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  const specialits = await SpecialistModel.find()
    .populate("hospital_id")
    .lean();
  const hospital = await HospitalModel.find().lean();
  const nuress = await NuresModel.find()
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  const patient = await PatientModel.find()
    .populate("doctor_id")
    .populate("nuress_id")
    .lean();
  const doctor = await DoctorModel.findById(reports.doctor_id._id)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  var patie = [];

  patient.forEach((item) => {
    const v1 = item.doctor_id._id,
      v2 = doctor._id;
    if (v2.equals(item.doctor_id._id)) {
      console.log("done");
      patie.push(item);
    } else {
      console.log("error", v1 + " != " + v2);
    }
  });
  res.render("doctors/workdoctors/edit", {
    specialits,
    hospital,
    patie,
    nuress,
    reports,
  });
  /*
  const report = await ReportModel.find(req.params).lean();
  return res.render("report/edit", { report });*/
};

export const updatereport = async (req, res) => {
  const id = req.params;
  const reports = await ReportModel.findById(req.params)
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  const { patient_id, specialist_id, hospital_id, nuress_id, description } =
    req.body;
  await ReportModel.findByIdAndUpdate(id, {
    $set: {
      patient_id,
      specialist_id,
      hospital_id,
      nuress_id,
      doctor_id: reports.doctor_id._id,
      description,
    },
  });
  const singlereport = await ReportModel.findById(req.params)
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  res.render("doctors/workdoctors/show", {
    report: singlereport,
    status: true,
  });
};

export const search = async (req, res) => {
  const patient = await PatientModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();

  var name = [];
  patient.forEach((item) => {
    name.push(item._id);
  });
  const searchreport = await ReportModel.find()
    .where("patient_id")
    .equals(name[0])
    .populate("patient_id")
    .populate("nuress_id")
    .populate("doctor_id")
    .populate("hospital_id")
    .populate("specialist_id")
    .lean();
  res.render("doctors/workdoctors", { report: searchreport });
};

/** 
 * ***********search
 * const id = "65144effc4291351852686c5";
  const doctor = await DoctorModel.findById(id)
    .populate("specialist_id")
    .populate("hospital_id")
    .lean();
  var patiereport = [];

  report.forEach((item) => {
    const v1 = item.doctor_id._id,
      v2 = doctor._id;
    if (v2.equals(item.doctor_id._id)) {
      console.log("done");
      patiereport.push(item);
    } else {
      console.log("error", v1 + " != " + v2);
    }
  }); 
  
  /// patient create report

  var patie = [];

  patient.forEach((item) => {
    const v1 = item.doctor_id._id,
      v2 = doctor._id;
    if (v2.equals(item.doctor_id._id)) {
      console.log("done");
      patie.push(item);
    } else {
      console.log("error", v1 + " != " + v2);
    }
  });
  
  // search with opjectid
  
   const oo = await ReportModel.find({
    doctor_id: "65146ac8362aa87bb1478444",
  });
  console.log(oo);
  
  */
