import { Router } from "express";
import {
  create,
  destroy,
  edit,
  index,
  restore,
  restore_index,
  search,
  show,
  store,
  update,
} from "../controllers/SpecialistController.js";

const router = new Router();

router.get("/", index);

router.get("/create", create);

router.post("/", store);

router.get("/edit/:_id", edit);

router.put("/:_id", update);

router.delete("/:_id", destroy);

router.get("/:_id", show);

router.get("/:_id", search);

router.get("/:_id", restore_index);

router.post("/:_id", restore);

/*router.get("/create_specialist", async (req, res) => {
  await specialist.create({
    name: "ComputerScience",
    code: "CS",
    photo: "http://ffff",
  });

  await specialist.create({
    name: "Information Technology",
    code: "IT",
    photo: "http://ffff",
  });

  await specialist.create({
    name: "Information System",
    code: "IS",
    photo: "http://ffff",
  });
  res.send("done");
});
*/
export default router;
