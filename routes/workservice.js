import { Router } from "express";
import {
  patientcheckout,
  patientcreate,
  patientedit,
  patientindex,
  patientsearch,
  patientshow,
  patientstore,
  patientupdate,
} from "../controllers/ServiceController.js";
const router = new Router();

router.get("/", patientindex);
router.get("/show/:_id", patientshow);
router.get("/create", patientcreate);
router.post("store", patientstore);
router.get("/edit/:_id", patientedit);
router.put("/:_id", patientupdate);
router.delete("/:_id", patientcheckout);
router.post("/search", patientsearch);

export default router;
