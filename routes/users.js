import { Router } from "express";
import { Homepage } from "../controllers/UsersController.js";

const router = new Router();

router.get("/homepage", Homepage);

export default router;
