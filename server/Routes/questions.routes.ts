export {};
const {
  getAll,
  add,
  getBySet,
} = require("./../Controllers/questions.controller");
const router = require("express").Router();

router.route("/").get(getAll);

router.route("/:set").get(getBySet);

router.route("/add").post(add);

module.exports = router;
