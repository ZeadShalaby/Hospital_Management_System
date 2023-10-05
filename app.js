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
import { authDoctor } from "./middleware/CheckDoctorRole.js";
import { authNuress } from "./middleware/CheckNuressRole.js";
import { authPatient } from "./middleware/CheckPatientRole.js";
import { authService } from "./middleware/CheckServiceRole.js";

// todo routes //
import specialistrouter from "./routes/specialist.js";

import doctorsrouter from "./routes/doctors.js";

import hospitalrouter from "./routes/hospital.js";

import nuressrouter from "./routes/nures.js";

import workdoctorsrouter from "./routes/workdoctors.js";

import loginrouter from "./routes/login.js";

import usersrouter from "./routes/users.js";

import logoutrouter from "./routes/logout.js";

import worknuressrouter from "./routes/worknuress.js";

import patientrouter from "./routes/patient.js";

import roomrouter from "./routes/room.js";

import medicalrouter from "./routes/medical.js";

import workpatientrouter from "./routes/workpatient.js";

import homerouter from "./routes/homepage.js";

import settingrouter from "./routes/setting.js";

import servicerouter from "./routes/service.js";

import workservicerouter from "./routes/workservice.js";

//! ///////////////////////////////////////////////////////
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
app.use("/doctors", authentication, authAdmin, doctorsrouter);
app.use("/hospital", authentication, authAdmin, hospitalrouter);
app.use("/nuress", authentication, authAdmin, nuressrouter);
app.use("/workdoctors", authentication, authDoctor, workdoctorsrouter);
app.use("/", loginrouter);
app.use("/home", authentication, homerouter);
app.use("/users", authentication, authAdmin, usersrouter);
app.use("/logout", authentication, logoutrouter);
app.use("/worknuress", authentication, authNuress, worknuressrouter);
app.use("patient", authentication, authNuress, patientrouter);
app.use("/workpatient", authentication, authPatient, workpatientrouter);
app.use("/room", authentication, authNuress, roomrouter);
app.use("/medical", authentication, authDoctor, medicalrouter);
app.use("/setting", authentication, settingrouter);
app.use("/service", authentication, authAdmin, servicerouter);
app.use("workservice", authentication, authService, workservicerouter);

// todo run project in this port //
app.listen(process.env.port, () => {
  console.log(
    `Started the application on http://localhost:${process.env.port}`
  );
});
// ! error not founr routes
app.get("*", (req, res, next) => {
  res.render("errors/404");
});

/*
app.use((err, req, res, next) => {
  **throw new Error("Not Found");
  console.log("Error occure");
  res.send("<h1>Error</h1>");
});*/
