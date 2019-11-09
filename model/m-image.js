const mongoose = require("mongoose");
const {cloudinary} = require("../utils/uploader");

const imageSchema = new mongoose.Schema({
    cloudId: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    uploadedAt:{
        type: Date,
        default: Date.now
    }
});


imageSchema.pre("remove", async function(next) {
    try {
        cloudinary.v2.uploader.destroy(this.cloudId);
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Image", imageSchema);
