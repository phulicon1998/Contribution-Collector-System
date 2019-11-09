const db = require("../../model");

exports.create = async(req, res, next) => {
    try{
        let newReport = await db.CbtorNumberReport.create(req.body.report);
        return res.status(200).json(newReport);
    }catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let list = await db.CbtorNumberReport.find();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        let foundReport = await db.CbtorNumberReport.findOne({_id: req.params.id});
        await foundReport.remove();
        return res.status(200).json(foundcbtorNump);
    } catch(err) {
        return next(err);
    }
}
