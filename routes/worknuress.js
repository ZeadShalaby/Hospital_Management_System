import { Router } from "express";
import { patientindex, patientshow } from "../controllers/NuressController.js";

const router = new Router();

router.get("/", patientindex);
router.get("/show/:_id", patientshow);

export default router;
