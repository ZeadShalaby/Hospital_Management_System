import jwt from "jsonwebtoken";
import { ADMIN, DOCTOR, NURESS, PATIENT } from "../models/RoleModel.js";

export const authNuress = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
  } catch (error) {
    return res.render("errors/700");
  }

  if (req.user.role != NURESS) {
    return res.render("errors/403");
  }
  next();
};
