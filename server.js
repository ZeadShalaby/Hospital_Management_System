import express from "express";
import { engine } from "express-handlebars";

import multer from "multer";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.connect(process.env.mongConnection);
// todo middleware //
import { authentication } from "./middleware/CheckAuth.js";
import { authAdmin } from "./middleware/CheckAdminRole.js";
import { checkroutes } from "./middleware/ChechRoute.js";

// todo routes //
import specialistrouter from "./routes/specialist.js";

import doctorsrouter from "./routes/doctors.js";

import hospitalrouter from "./routes/hospital.js";

import nuressrouter from "./routes/nures.js";

import workdoctorsrouter from "./routes/workdoctors.js";

import loginrouter from "./routes/login.js";

import usersrouter from "./routes/users.js";

const app = express();

app.use(express.urlencoded({ extends: true }));
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(methodOverride("_method"));
app.use(cookieParser());
// ! use link //
app.use("/specialist", authentication, authAdmin, specialistrouter);
app.use("/doctors", checkroutes, authentication, authAdmin, doctorsrouter);
app.use("/hospital", checkroutes, authentication, authAdmin, hospitalrouter);
app.use("/nuress", checkroutes, authentication, authAdmin, nuressrouter);
app.use("/workdoctors", checkroutes, authentication, workdoctorsrouter);
app.use("/", loginrouter);
app.use("/users", authentication, usersrouter);
app.listen(process.env.port, () => {
  console.log(
    `Started the application on http://localhost:${process.env.port}`
  );
});
