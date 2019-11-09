const express = require("express");
const hdl = require("../handler");
const mw = require("../middleware");
const router = express.Router({mergeParams: true});
const {upload} = require("../utils/uploader");

router.route("/login").post(mw.User.determineType, hdl.User.logIn);

router.use("/first", upload.single("avatar"), mw.User.getProfileImg, mw.User.getUserEmail, mw.User.determineType, require("./r-first"));

router.use("/", mw.User.removeTakenEmail, mw.User.genAcc, mw.User.sendMail, require("./r-genUser"));

module.exports = router;
