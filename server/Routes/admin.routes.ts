export {};
const router = require("express").Router();
const { get, create, verify } = require("./../Controllers/admin.controller");

router.route("/").get(get);

router.route("/").post(create);

router.route("/login").post(verify);

module.exports = router;
