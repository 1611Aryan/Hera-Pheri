const router = require("express").Router();

const {
  create,
  join,
  login,
  view,
} = require("./../Controllers/team.controller");

router.route("/").get(view);

router.route("/create").post(create);

router.route("/join").post(join);

router.route("/login").post(login);

module.exports = router;
