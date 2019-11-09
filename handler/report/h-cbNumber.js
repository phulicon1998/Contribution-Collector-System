const db = require("../../model");

exports.create = async(req, res, next) => {
    try {
        let newReport = await db.CbNumberReport.create(req.body.report);
        return res.status(200).json(newReport);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let listCbNumberReport = await db.CbNumberReport.find();
        return res.status(200).json(listcbNumberReport);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        let foundcbNumber = await db.CbNumberReport.findOne({_id: req.params.id});
        await foundcbNumber.remove();
        return res.status(200).json(foundcbNumber);
    } catch(err) {
        return next(err);
    }
}
