import { Router } from "express";
import { index } from "../controllers/NuressController.js";

const router = new Router();

router.get("/", index);

export default router;
