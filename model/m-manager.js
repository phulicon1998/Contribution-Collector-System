const mongoose = require("mongoose");
const baseUserSchema = require("./base/b-user.js");
const {cloudinary} = require("../utils/uploader");
const db = require("../model");

const managerSchema = new baseUserSchema();

managerSchema.pre("remove", async function(next){
    try {
        cloudinary.v2.uploader.destroy(this.profileImg.cloud_id);
        await db.UserRole.deleteMany({user_id: this._id});
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("Manager", managerSchema);
