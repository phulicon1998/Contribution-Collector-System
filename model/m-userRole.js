const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Role"
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Student", "Lecturer", "Manager", "Coordinator", "Admin"]
    }
});

module.exports = mongoose.model("UserRole", userRoleSchema);
