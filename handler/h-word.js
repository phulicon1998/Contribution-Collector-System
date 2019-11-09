const db = require("../model");

exports.create = async(req, res, next) => {
    try {
        let newWord = await db.Image.create(req.body.word);
        return res.status(200).json(newWord);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let listWord = await db.Word.find();
        return res.status(200).json(listWord);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        let foundWord = await db.Word.findOne({_id: req.params.id});
        await foundWord.remove();
        return res.status(200).json(foundWord);
    } catch(err) {
        return next(err);
    }
}
