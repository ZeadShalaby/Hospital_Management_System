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
} from "../controllers/UsersController.js";

const router = new Router();

router.get("/", index);
router.get("/create", create);
router.get("/:_id", show);
router.get("/edit/:_id", edit);
router.post("/", store);
router.delete("/:_id", destroy);
router.put("/:_id", update);
router.post("/search", search);

export default router;
