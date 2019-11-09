const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/").get(hdl.Admin.get);

router.route("/unready").get(hdl.Admin.getUnready);

router.route("/:admin_id")
.delete(hdl.Admin.delete);

module.exports = router;
