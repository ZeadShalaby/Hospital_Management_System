import { Router } from "express";
import {
  createreport,
  editreport,
  storereport,
  updatereport,
  showreport,
  indexreport,
  search,
} from "../controllers/DoctorController.js";

const router = new Router();

router.get("/", indexreport);
router.get("/:_id", showreport);
router.get("/create/report", createreport);
router.post("/", storereport);
router.get("/editreport/:_id", editreport);
router.put("/:_id", updatereport);
router.get("/search/repsort", search);
router.post("/search/report", search);

export default router;
