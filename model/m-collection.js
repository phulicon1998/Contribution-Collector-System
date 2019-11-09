const mongoose = require("mongoose");
const db = require("../model");
const {spliceId, casadeDeleteMany} = require("../utils/dbSupport");

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    closureDate: {
        type: String,
        required: true
    },
    finalClosureDate: {
        type: String,
        required: true
    },
    exceptionReport_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExceptionReport"
    },
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

collectionSchema.pre("remove", async function(next){
    try {
        await casadeDeleteMany("Contribution", this.contribution_id);
        await spliceId("Faculty", this.faculty_id, "collection_id");
        await spliceId("ExceptionReport", this.exceptionReport_id, "collection_id");
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Collection", collectionSchema);
