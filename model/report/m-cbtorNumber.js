const mongoose = require("mongoose");

const cbtorNumberReportSchema = new mongoose.Schema({
    cbtorNumber: {
        type: String,
        required: true
    },
    cbtorHasSelectedCb: {
        type: String,
        required: true
    },
    cbtorHasApprovedCb: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("CbtorNumberReport", cbtorNumberReportSchema);
