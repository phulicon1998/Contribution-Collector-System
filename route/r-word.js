const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});

router.route("/")
.get(hdl.Word.get)
.post(hdl.Word.create);

router.route("/:word_id")
.delete(hdl.Word.delete);

module.exports = router;
