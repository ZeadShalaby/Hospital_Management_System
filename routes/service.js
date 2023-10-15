import { Router } from "express";
import {
  create,
  destroy,
  edit,
  index,
  search,
  show,
  store,
  update,
} from "../controllers/ServiceController.js";
const router = new Router();

router.get("/", index);
router.get("/:_id", show);
router.get("/create", create);
router.post("store", store);
router.get("/edit/:_id", edit);
router.put("/:_id", update);
router.delete("/:_id", destroy);
router.post("/search", search);

export default router;
