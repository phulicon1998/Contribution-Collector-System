const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/").get(hdl.Manager.get);

router.route("/unready").get(hdl.Manager.getUnready);

router.route("/:manager_id")
.delete(hdl.Manager.delete)
.put(upload.single("avatar"), mw.User.getProfileImg, mw.User.verifyUpdateEmail, hdl.Manager.update);

module.exports = router;
