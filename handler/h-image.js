const db = require("../model");

exports.create = async(req, res, next) => {
    try {
        let newImage = await db.Image.create(req.body.image);
        return res.status(200).json(newImage);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let listImage = await db.Image.find();
        return res.status(200).json(listImage);
    } catch(err){
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundImage = await db.Image.findOne({_id: req.params.id});
        await foundImage.remove();
        return res.status(200).json(foundImage);
    } catch(err) {
        return next(err);
    }
}
