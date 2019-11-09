const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});

router.route("/")
.get(hdl.Collection.get)
.post(hdl.Collection.create);

router.route("/:collection_id")
.get(hdl.Collection.getOne)
.delete(hdl.Collection.delete)
.put(hdl.Collection.update);

router.use("/:collection_id/contributions", require("./r-contribution"));

module.exports = router;
