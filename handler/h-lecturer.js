const db = require("../model");
const {cloudinary} = require("../utils/uploader");
const {pushId, spliceId, assignId} = require("../utils/dbSupport");

exports.create = async(req, res, next) => {
    try{
        let {count, createdAcc} = req.body;
        for(let acc of createdAcc){
            //add role to acc
            let foundRole = await db.Role.findOne({code: "002"});
            let createdUserRole = await db.UserRole.create({
                user_id: acc._id,
                role_id: foundRole._id,
                onModel: "Lecturer"
            });
            let foundFaculty = await db.Faculty.findById(acc.faculty_id);
            foundFaculty.lecturer_id.push(acc._id);
            await foundFaculty.save();
        }
        let msg = count === 0 ? "All provided emails are valid and processed successfully" : `${count} available email(s) are removed.`;
        return res.status(200).json({createdAcc, msg, count});
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let lecturers = await db.Lecturer.find().populate("faculty_id").exec();
        let activeLec = lecturers.filter(lec => lec.ready);
        return res.status(200).json(activeLec);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let lecturer = await db.Lecturer.findById(req.params.lecturer_id).populate("faculty_id").exec();
        return res.status(200).json(lecturer);
    } catch(err) {
        return next(err);
    }
}

exports.getUnready = async(req, res, next) => {
    try {
        let lecturers = await db.Lecturer.find({ready: false}).populate("faculty_id").exec();
        return res.status(200).json(lecturers);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundLecturer = await db.Lecturer.findById(req.params.lecturer_id);
        await foundLecturer.remove();
        return res.status(200).json(foundLecturer);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        const {profileImg, viewname, email, faculty_id} = req.body;
        if(faculty_id === "undefined") faculty_id = undefined;
        let foundLecturer = await db.Lecturer.findById(req.params.lecturer_id);

        if(faculty_id) {
            await pushId("Faculty", faculty_id, "lecturer_id", foundLecturer._id);
        } else if(foundLecturer.faculty_id) {
            await spliceId("Faculty", foundLecturer.faculty_id, "lecturer_id", foundLecturer._id);
        }

        if(foundLecturer.faculty_id !== faculty_id){
            for(let sid of foundLecturer.student_id){
                await assignId("Student", sid, "lecturer_id", undefined);
            }
            foundLecturer.student_id = [];
        }

        if(profileImg){
            cloudinary.v2.uploader.destroy(foundLecturer.profileImg.cloud_id);
            foundLecturer.profileImg = profileImg;
        }
        if(email) foundLecturer.email = email;
        foundLecturer.viewname = viewname;
        foundLecturer.faculty_id = faculty_id;
        await foundLecturer.save();
        return res.status(200).json(foundLecturer);
    } catch(err) {
        return next(err);
    }
}
