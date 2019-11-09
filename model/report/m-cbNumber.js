const mongoose = require("mongoose");

const cbNumberReportSchema = new mongoose.Schema({
    selectedPublicCbNumber: {
        type: String,
        required: true
    },
    unselectedCbNumber : {
        type: String,
        required: true
    },
    approvedCbNumber: {
        type: String,
        required: true
    },
    unapprovedCbNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("CbNumberReport", cbNumberReportSchema);
