import { Router } from "express";
import {
  create,
  edit,
  index,
  show,
  store,
  update,
  destroy,
  search,
} from "../controllers/DoctorController.js";
const router = new Router();

router.get("/", index);
router.get("/create", create);
router.post("/", store);
router.get("/:_id", show);
router.get("/edit/:_id", edit);
router.put("/:_id", update);
router.delete("/:_id", destroy);
router.get("/:_id", search);

export default router;
