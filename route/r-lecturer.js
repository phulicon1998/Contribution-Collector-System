const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/").get(hdl.Lecturer.get);

router.route("/unready").get(hdl.Lecturer.getUnready);

router.route("/:lecturer_id")
.get(hdl.Lecturer.getOne)
.delete(hdl.Lecturer.delete)
.put(upload.single("avatar"), mw.User.getProfileImg, mw.User.verifyUpdateEmail, hdl.Lecturer.update);

router.use("/:lecturer_id/students", require("./r-student"));

module.exports = router;
