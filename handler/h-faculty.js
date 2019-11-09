const db = require("../model");

exports.create = async(req, res, next) => {
    try{
        let newFaculty = await db.Faculty.create(req.body);
        return res.status(200).json(newFaculty);
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try{
        let list = await db.Faculty.find().populate({
            path: "coordinator_id collection_id",
            populate: {
                path: "contribution_id",
                populate: {
                    path: "student_id"
                }
            }
        }).exec();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try{
        let faculty = await db.Faculty.findById(req.params.faculty_id);
        return res.status(200).json(faculty);
    } catch (err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) =>{
    try{
        const {faculty_id} = req.params;
        let foundFaculty = await db.Faculty.findById(faculty_id);
        if(foundFaculty) {
            await foundFaculty.remove();
        }
        return res.status(200).json(foundFaculty);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        let foundFaculty = await db.Faculty.findById(req.params.faculty_id);
        const {coordinator_id, name, desc} = req.body;
        foundFaculty.coordinator_id = coordinator_id;
        foundFaculty.name = name;
        foundFaculty.desc = desc;
        await foundFaculty.save();
        return res.status(200).json(foundFaculty);
    } catch(err) {
        return next(err);
    }
}
