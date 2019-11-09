const mongoose = require("mongoose");
const baseUserSchema = require("./base/b-user.js");
const db = require("./index.js");
const {spliceId} = require("../utils/dbSupport.js");
const {cloudinary} = require("../utils/uploader");

const studentSchema = new baseUserSchema();
studentSchema.add({
    contribution_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contribution"
        }
    ],
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    lecturer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer"
    }
});

studentSchema.pre("remove", async function(next){
    try {
        cloudinary.v2.uploader.destroy(this.profileImg.cloud_id);
        await db.Contribution.deleteMany({_id: {$in: this.contribution_id} });
        await spliceId("Faculty", this.faculty_id, "student_id", this._id);
        await spliceId("Lecturer", this.lecturer_id, "student_id", this._id);
        await db.UserRole.deleteMany({user_id: this._id});
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Student", studentSchema);
