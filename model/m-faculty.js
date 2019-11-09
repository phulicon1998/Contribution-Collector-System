const mongoose = require("mongoose");
const db = require("../model");
const {spliceId} = require("../utils/dbSupport");

let facultySchema = new mongoose.Schema({
    student_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    lecturer_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecturer"
        }
    ],
    coordinator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coordinator"
    },
    collection_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    ],
    statistic_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StatisticReport"
        }
    ],
    name: {
        type: String,
        required: true,
    },
    desc: String
})

facultySchema.pre("remove", async function(next){
    try {
        await db.Student.deleteMany({_id: {$in: this.student_id} });
        await db.StatisticReport.deleteMany({_id: {$in: this.statistic_id} });
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Faculty", facultySchema);
