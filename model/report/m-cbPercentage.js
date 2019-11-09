const mongoose = require("mongoose");

const cbPercentageReportSchema = new mongoose.Schema({
    percentSelectedPublicCbNumber: {
        type: String,
        required: true
    },
    percentUnselectedCbNumber: {
        type: String,
        required: true
    },
    percentApprovedCbNumber: {
        type: String,
        required: true
    },
    percentUnapprovedCbNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("CbPercentageReport", cbPercentageReportSchema);
