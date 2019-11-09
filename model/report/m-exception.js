const mongoose = require("mongoose");

const exceptionReportSchema = new mongoose.Schema({
    attribute_name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("ExceptionReport", exceptionReportSchema);
