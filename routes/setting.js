import { Router } from "express";
import { setting, settingupdate } from "../controllers/UsersController.js";

const router = new Router();

router.get("/", setting);
router.put("/:_id", settingupdate);

export default router;
