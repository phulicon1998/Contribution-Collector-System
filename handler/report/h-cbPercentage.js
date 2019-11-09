const db = require("../../model");

exports.create = async(req, res, next) => {
    try{
        let newReport = await db.CbPercentageReport.create(req.body.report)
        return res.status(200).json(newReport);
    }catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let list = await db.CbPercentageReport.find();
        return res.status.json(list);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        let foundcbPercentage = await db.CbPercentageReport.findOne({_id: req.params.id});
        await foundcbPercentage.remove();
        return res.status(200).json(foundcbPercentage);
    } catch(err) {
        return next(err);
    }
}
