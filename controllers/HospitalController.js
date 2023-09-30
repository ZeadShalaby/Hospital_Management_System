import hospital from "../models/HospitalModel.js";

export const index = async (req, res) => {
  const hospitals = await hospital.find({}, { name: 1, address: 1 }).lean();
  res.render("hospital/index", { hospitals });
  // todo return response json
  //todo return res.json(hospitals);
};
export const show = async (req, res) => {
  const id = req.params;
  const singlehospital = await hospital.findById(id).lean();
  res.render("hospital/show", { hospital: singlehospital });
};
export const create = async (req, res) => {
  res.render("hospital/create");
};

export const store = async (req, res) => {
  const { name, address, photo } = req.body;
  await hospital.create({
    name,
    address,
    photo,
  });
  const hospitals = await hospital.find({}, { name: 1, address: 1 }).lean();
  res.render("hospital/index", {
    hospitals,
    msg: name + " Create Successfully .",
  });
  //res.redirect("/hospital");
};

export const edit = async (req, res) => {
  const id = req.params;
  const hospitalby_id = await hospital.findById(id).lean();
  res.render("hospital/edit", { hospital: hospitalby_id });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, address, photo } = req.body;
  const singlehospitales = { name, address, photo };
  await hospital.findByIdAndUpdate(id, {
    $set: {
      name,
      address,
      photo,
    },
  });
  res.render("hospital/show", { hospital: singlehospitales, status: true });
};

export const destroy = async (req, res) => {
  const id = req.params;
  await hospital.findByIdAndDelete(id);
  const hospitals = await hospital.find({}, { name: 1, address: 1 }).lean();
  res.render("hospital/index", {
    hospitals,
    msgde: " Delete Successfully .",
  });
};
export const restore_index = async (req, res) => {};

export const restore = async (req, res) => {};

export const search = async (req, res) => {};
