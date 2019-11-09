const mongoose = require("mongoose");
const db = require("../../model");
const {spliceId} = require("../../utils/dbSupport");

const statisticSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    cbNumber_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CbNumberReport"
    },
    cbPercentage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CbPercentageReport"
    },
    cbtorNumber_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CbtorNumberReport"
    },
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    }
});

statisticSchema.pre("remove", async function(next){
    try {
        await db.CbNumberReport.findByIdAndRemove(this.cbNumber_id);
        await db.CbPercentageReport.findByIdAndRemove(this.cbPercentage_id);
        await db.CbtorNumberReport.findByIdAndRemove(this.cbtorNumber_id);

        await spliceId("Faculty", this.faculty_id, "statistic_id");
        return next();
    } catch(err) {
        return next(err);
    }
})
module.exports = mongoose.model("StatisticReport", statisticSchema);
