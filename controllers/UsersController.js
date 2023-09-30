import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ADMIN, DOCTOR, NURESS, PATIENT } from "../models/RoleModel.js";

export const Homepage = (req, res) => {
  const user = req.user;
  console.log(user);
  if (user.role == ADMIN) {
    res.render("Home/Admin");
  } else if (user.role == DOCTOR) {
    res.render("Home/Doctor");
  } else if (user.role == NURESS) {
    res.render("Home/Nuress");
  } else if (user.role == PATIENT) {
    res.render("Home/Patient");
  } else {
    return res.render("errors/404");
  }
};

export const index = async (req, res) => {
  const users = await UsersModel.find().lean();
  return res.render("");
};
