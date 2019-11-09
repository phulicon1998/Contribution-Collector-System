const db = require("../../model");

exports.create = async(req, res, next) => {
    try{
        let newStatictic = await db.Statistic.create(req.body.report)
        return res.status(200).json(newStatictic);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let list = await db.Statistic.find();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        let foundStatistic = await db.Statistic.findOne({_id: req.params.id});
        await foundStatistic.remove();
        return res.status(200).json(foundStatistic);
    } catch(err) {
        return next(err);
    }
}
