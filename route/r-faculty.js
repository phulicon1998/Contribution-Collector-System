const express = require("express");
const hdl = require("../handler");
const router = express.Router({mergeParams: true});

router.route("/")
.get(hdl.Faculty.get)
.post(hdl.Faculty.create);

router.route("/:faculty_id")
.get(hdl.Faculty.getOne)
.delete(hdl.Faculty.delete)
.put(hdl.Faculty.update);

router.use("/:faculty_id/statisticRps", require("./report/r-statisticRp"));
router.use("/:faculty_id/collections", require("./r-collection"));
router.use("/:faculty_id/students", require("./r-student"));
router.use("/:faculty_id/lecturers", require("./r-lecturer"));
router.use("/:faculty_id/contributions", require("./r-contribution"));


module.exports = router;
