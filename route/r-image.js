const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});

router.route("/")
.get(hdl.Image.get)
.post(hdl.Image.create);

router.route("/:image_id")
.delete(hdl.Image.delete);

module.exports = router;
