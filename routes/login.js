import { Router } from "express";
import jwt from "jsonwebtoken";
import { forget, login, loginform } from "../controllers/AuthController.js";

const router = new Router();

router.get("/", loginform);

router.get("/forget/shalaby", forget);

router.post("/login", login);

export default router;
