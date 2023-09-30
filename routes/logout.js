import { Router } from "express";
import { logout } from "../controllers/AuthController.js";

const router = new Router();

router.get("/", logout);

export default router;
