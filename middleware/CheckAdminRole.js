import jwt from "jsonwebtoken";
import { ADMIN, DOCTOR, NURESS, PATIENT } from "../models/RoleModel.js";

export const authAdmin = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
  } catch (error) {
    return res.render("errors/700");
  }

  if (req.user.role != ADMIN) {
    return res.render("errors/403");
  }
  next();
};
