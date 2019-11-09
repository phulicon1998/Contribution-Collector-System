const mongoose = require("mongoose");
const db = require("../model");
const {spliceId, casadeDeleteMany} = require("../utils/dbSupport");

const contributionSchema = new mongoose.Schema({
    word_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Word"
        }
    ],
    image_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    ],
    approveStatus: {
        type: String,
        default: "Pending"
    },
    comment: {
        text: String,
        profileImg: String,
        viewname: String
    },
    selectForPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    latest: {
        type: Boolean,
        default: true
    },
    newSubmit: {
        type: Boolean,
        default: true
    }
});

contributionSchema.pre("remove", async function(next){
    try {
        await casadeDeleteMany("Image", this.image_id);
        await casadeDeleteMany("Word", this.word_id);
        await spliceId("Student", this.student_id, "contribution_id");
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Contribution", contributionSchema);
