import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginform = (req, res) => {
  return res.render("login/login");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const loginuser = await UsersModel.findOne({ email }).lean();
  if (loginuser) {
    const incorrectpass = bcrypt.compareSync(password, loginuser.password); // true
    if (incorrectpass == true) {
      const data = {
        _id: loginuser._id,
        name: loginuser.name,
        email: loginuser.email,
        role: loginuser.role,
      };
      const jwtToken = jwt.sign(data, process.env.JWT_SECRECT);
      res.cookie("token", jwtToken);
      res.redirect("/home/homepage");
    } else {
      return res.redirect("/");
    }
  }
};

export const forget = (req, res) => {};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(1), path: "/" });
  res.clearCookie("token", { path: "/" });
  res.redirect("/");
};
