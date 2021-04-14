const router = require("express").Router();

const {
  verifyToken,
  getTeamData,
  create,
  join,
  login,
  view,
  verifyAnswer,
  changeScore,
} = require("./../Controllers/team.controller");

router.route("/").get(view);

router.route("/create").post(create);

router.route("/join").post(join);

router.route("/login").post(login);

router.route("/authenticate").post(verifyToken, getTeamData);

router.route("/dashboard").post(verifyToken, getTeamData);

router.route("/answer").post(verifyToken, verifyAnswer, changeScore);

module.exports = router;
