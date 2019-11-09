const db = require("../model");

exports.create = async(req, res, next) => {
    try{
        const {coordinator_id} = req.params;
        let foundFa = await db.Faculty.findOne({coordinator_id});
        let collection = {...req.body, faculty_id: foundFa._id};
        let createdCollection = await db.Collection.create(collection);
        if(foundFa) foundFa.collection_id.push(createdCollection._id);
        await foundFa.save();
        return res.status(200).json(createdCollection);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        const faculty_id = req.params.faculty_id || req.body.faculty_id;
        let list = await db.Collection.find({faculty_id}).populate({
            path: "contribution_id",
            populate: {path: "student_id"}
        }).exec();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try{
        let collection = await db.Collection.findById(req.params.collection_id).populate({
            path: "contribution_id",
            populate: {path: "student_id"}
        }).exec();
        return res.status(200).json(collection);
    } catch (err){
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try {
        let foundCollection = await db.Collection.findById(req.params.collection_id);
        if(foundCollection) await foundCollection.remove();
        return res.status(200).json(foundCollection);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try{
        let foundCollection = await db.Collection.findById(req.params.collection_id);
        foundCollection.title = req.body.title;
        foundCollection.description = req.body.description;
        foundCollection.closureDate = req.body.closureDate;
        foundCollection.finalClosureDate = req.body.finalClosureDate;

        await foundCollection.save();
        return res.status(200).json(foundCollection);
    } catch(err) {
        return next(err);
    }
}
