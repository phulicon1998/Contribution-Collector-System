const express = require("express");
const hdl = require("../../handler");
const router = express.Router({mergeParams: true});

router.route("/")
.get(hdl.StatisticReport.get)
.post(hdl.StatisticReport.create)

router.route("/:statistic_id")
.delete(hdl.StatisticReport.delete);

module.exports = router;
