const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handler");
const mw = require("../middleware");
const {upload} = require("../utils/uploader");

router.route("/")
.get(hdl.Student.get);
// .post(hdl.Student.crete);

router.route("/unready").get(hdl.Student.getUnready);

router.route("/unassign").put(hdl.Student.updateUnassign);
router.route("/assign").put(hdl.Student.updateAssign);

router.route("/:student_id")
.get(hdl.Student.getOne)
.delete(hdl.Student.delete)
.put(upload.single("avatar"), mw.User.getProfileImg, mw.User.verifyUpdateEmail, hdl.Student.update);

router.use("/:student_id/contributions", require("./r-contribution"));

module.exports = router;
