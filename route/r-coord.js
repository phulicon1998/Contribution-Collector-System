const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/").get(hdl.Coordinator.get);

router.route("/unready").get(hdl.Coordinator.getUnready);

router.route("/unassign").get(hdl.Coordinator.getUnassign);

router.route("/:coordinator_id")
.put(upload.single("avatar"), mw.User.getProfileImg, mw.User.verifyUpdateEmail, hdl.Coordinator.update)
.delete(hdl.Coordinator.delete);

router.use("/:coordinator_id/collections", require("./r-collection"));

module.exports = router;
