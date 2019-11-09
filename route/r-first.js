const express = require("express");
const hdl = require("../handler");
const mw = require("../middleware");
const router = express.Router({mergeParams: true});

router.route("/profile").put(mw.User.getProfileImg, hdl.User.firstAddProfile);

router.route("/password").put(hdl.User.editPassword);

module.exports = router;
