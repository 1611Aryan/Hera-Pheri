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
  teamByName,
  teamBySet,
  useHint
} = require("./../Controllers/team.controller");

//?All Teams
router.route("/").get(view);

//?Team by Name
router.route('/:name').get(teamByName)

//?Team by Set
router.route('/set/:set').get(teamBySet)

//?SignUp
router.route("/create").post(create);

//?Join a Team
router.route("/join").post(join);

//?Login
router.route("/login").post(login);

//?
router.route("/authenticate").post(verifyToken, getTeamData);

//?
router.route("/dashboard").post(verifyToken, getTeamData);

//?Answer
router.route("/answer").post(verifyToken, verifyAnswer, changeScore);

//?Hint
router.route("/hint").post(useHint);

module.exports = router;
