import { Router } from "express";

import {
  index,
  create,
  destroy,
  edit,
  restore,
  restore_index,
  search,
  show,
  store,
  update,
} from "../controllers/HospitalController.js";

const router = new Router();

router.get("/", index);

router.get("/create", create);

router.post("/", create);

router.get("/:_id", show);

router.get("/:_id/edit", edit);

router.put("/:_id", update);

router.delete("/:_id", destroy);

router.get("/:_id", search);

router.get("/:_id", restore_index);

router.post("/:_id", restore);

export default router;
