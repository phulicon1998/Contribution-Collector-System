const mongoose = require("mongoose");
const baseUserSchema = require("./base/b-user");
const {spliceId, assignId} = require("../utils/dbSupport.js");
const db = require("./index.js");
const {cloudinary} = require("../utils/uploader");

let lecturerSchema = new baseUserSchema();
lecturerSchema.add({
    student_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
})

lecturerSchema.pre("remove", async function(next){
    try {
        cloudinary.v2.uploader.destroy(this.profileImg.cloud_id);
        await spliceId("Faculty", this.faculty_id, "lecturer_id", this._id);
        await db.UserRole.deleteMany({user_id: this._id});
        for(let id of this.student_id){
            await assignId("Student", id, "lecturer_id", undefined);
        }
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Lecturer", lecturerSchema);
