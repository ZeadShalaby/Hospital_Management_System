import UsersModel from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  ADMIN,
  DOCTOR,
  NURESS,
  PATIENT,
  service,
  Nuress,
} from "../models/RoleModel.js";

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
  } else if (user.role == service) {
    res.render("Home/service");
  } else {
    return res.render("errors/404");
  }
};

export const index = async (req, res) => {
  const users = await UsersModel.find().sort({ $natural: -1 }).lean();
  res.render("Admin/index", { users });
};

export const show = async (req, res) => {
  const users = await UsersModel.findById(req.params).lean();
  let roles;
  if (users.role == ADMIN) {
    roles = "Admin";
  } else if (users.role == DOCTOR) {
    roles = "Doctor";
  } else if (users.role == NURESS || users.role == Nuress) {
    roles = "Nuress";
  } else if (users.role == service) {
    roles = "Service";
  } else if (users.role == PATIENT) {
    roles = "Patient";
  }

  const role = roles;
  res.render("Admin/show", { users, roles });
};

export const create = (req, res) => {
  res.render("Admin/create");
};

export const store = async (req, res) => {
  const { name, password, confirm_password, photo } = req.body;
  if (password == confirm_password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await UsersModel.create({
      name,
      email: name + "@" + "admin" + ".com",
      password: hash,
      photo: photo,
      role: ADMIN,
    });
  } else {
    const msg = " password not match ";
    res.render("Admin/create", { msg });
  }
  res.redirect("/users");
};

export const edit = async (req, res) => {
  const users = await UsersModel.findById(req.params).lean();
  res.render("Admin/edit", { users });
};

export const update = async (req, res) => {
  const id = req.params;
  const { name, password, email, photo } = req.body;
  const old_users = await UsersModel.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_users.photo;
  } else {
    path = req.body.photo;
  }
  // todo compare new password with old password //
  const incorrectpass = bcrypt.compareSync(password, old_users.password); // true
  let salt;
  let hash;
  // todo hashing users or return errors direct //
  if (!incorrectpass) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);
    // todo update user //
    await UsersModel.findByIdAndUpdate(id, {
      $set: {
        name,
        email: old_users.email,
        password: hash,
        photo: path,
      },
    });
    const singleusers = await UsersModel.findById(id).lean();
    let roles; // todo name roles //
    if (singleusers.role == ADMIN) {
      roles = "Admin";
    } else if (singleusers.role == DOCTOR) {
      roles = "Doctor";
    } else if (singleusers.role == NURESS || users.role == Nuress) {
      roles = "Nuress";
    } else if (singleusers.role == service) {
      roles = "Service";
    } else if (singleusers.role == PATIENT) {
      roles = "Patient";
    }
    res.render("Admin/show", {
      users: singleusers,
      status: true,
      roles,
    });
  }
  const users = await UsersModel.findById(req.params).lean();
  const msg = "The password its the same old password change it sir . ";
  res.render("Admin/edit", {
    users,
    msg,
  });
};

export const destroy = async (req, res) => {
  const user = await UsersModel.findByIdAndDelete(req.params);
  const users = await UsersModel.find().sort({ $natural: -1 }).lean();
  res.render("Admin/index", { users, msged: " Delete Successfully ." });
};

export const search = async (req, res) => {
  const search = await UsersModel.find()
    .where("name")
    .equals(req.body.search)
    .lean();
  if (req.body.search == "h") {
    res.redirect("/users");
  }
  res.render("Admin/index", { users: search });
};

export const setting = async (req, res) => {
  const searchusers = await UsersModel.findById(req.user._id).lean();
  res.render("Admin/users/setting", { users: searchusers });
};

export const settingupdate = async (req, res) => {
  const id = req.params;
  const { name, password, email, photo } = req.body;
  const old_users = await UsersModel.findById(id).lean();
  let path = req.body.photo;
  if (!req.body.photo) {
    path = old_users.photo;
  } else {
    path = req.body.photo;
  }
  const incorrectpass = bcrypt.compareSync(password, old_users.password); // true
  let salt = "";
  let hash = password;
  if (!incorrectpass) {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);
  }
  await UsersModel.findByIdAndUpdate(id, {
    $set: {
      name,
      email: old_users.email,
      password: hash,
      photo: path,
    },
  });
  const singleusers = await UsersModel.findById(id).lean();
  res.render("Admin/show", {
    users: singleusers,
    status: true,
  });
};
