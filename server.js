import express from "express";
import { engine } from "express-handlebars";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const mongoConnectionUrl = "mongodb://localhost:27017/project";
mongoose.connect(process.env.mongoConnectionUrl);
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const PORT = 5000;

app.listen(process.env.PORT, () => {
  console.log(`Started the application on http://localhost:${PORT}`);
});
