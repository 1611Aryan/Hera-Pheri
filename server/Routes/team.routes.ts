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
  useHint,
  platformHint,
  forgotPassword
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

//?Forgot Password
router.route('/forgot').post(forgotPassword);
//?
router.route("/authenticate").post(verifyToken, getTeamData);

//?
router.route("/dashboard").post(verifyToken, getTeamData);

//?Answer
router.route("/answer").post(verifyToken, verifyAnswer, changeScore);

//?Platform Hint
router.route('/platformHint').post(verifyToken, platformHint)

//?Hint
router.route("/hint").post(useHint);

module.exports = router;
