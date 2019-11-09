const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handler");
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Contribution.get)
.post(upload.fields([{name: "images"}, {name: "words"}]), mw.Contribution.getUploadData, hdl.Contribution.create);

router.route("/:contribution_id/approve")
.put(hdl.Contribution.updateStatus);

router.route("/:contribution_id/public")
.put(hdl.Contribution.updateSelect);

router.route("/:contribution_id/comment")
.put(hdl.Contribution.updateComment);

router.route("/:contribution_id")
.get(hdl.Contribution.getOne)
.delete(hdl.Contribution.delete);

router.use("/:contribution_id/images", require("./r-image"));
router.use("/:contribution_id/words", require("./r-word"));

module.exports = router;
