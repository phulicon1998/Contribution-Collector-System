const db = require("../model");
const {cloudinary} = require("../utils/uploader");
const {pushId, spliceId} = require("../utils/dbSupport");

exports.create = async(req, res, next) => {
    try{
        let {count, createdAcc, faculty} = req.body;
        for(let acc of createdAcc){
            //add role to acc
            let foundRole = await db.Role.findOne({code: "001"});
            let createdUserRole = await db.UserRole.create({
                user_id: acc._id,
                role_id: foundRole._id,
                onModel: "Student"
            });
            let foundFaculty = await db.Faculty.findById(acc.faculty_id);
            foundFaculty.student_id.push(acc._id);
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
        let students = await db.Student.find({ready: true}).populate("faculty_id").exec();
        return res.status(200).json(students);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try{
        let student = await db.Student.findById(req.params.student_id);
        return res.status(200).json(student);
    } catch (err){
        return next(err);
    }
}

exports.getUnready = async(req, res, next) => {
    try {
        let students = await db.Student.find({ready: false}).populate("faculty_id").exec();
        return res.status(200).json(students);
    } catch(err) {
        return next(err);
    }
}

exports.updateAssign = async(req, res, next) => {
    try {
        const {student_id, lecturer_id} = req.body;
        let foundStudent = await db.Student.findById(student_id);
        if(foundStudent) {
            foundStudent.lecturer_id = lecturer_id;
            await foundStudent.save();
        }
        await pushId("Lecturer", lecturer_id, "student_id", student_id);
        return res.status(200).json({msg: "success"});
    } catch(err) {
        console.log(err);
        return next(err);
    }
}

exports.updateUnassign = async(req, res, next) => {
    try {
        const {student_id, lecturer_id} = req.body;
        let foundStudent = await db.Student.findById(student_id);
        if(foundStudent) {
            foundStudent.lecturer_id = undefined;
            await foundStudent.save();
        }
        await spliceId("Lecturer", lecturer_id, "student_id", student_id);
        return res.status(200).json({msg: "success"});
    } catch(err) {
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundStudent = await db.Student.findById(req.params.student_id);
        await foundStudent.remove();
        return res.status(200).json(foundStudent);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        let {profileImg, viewname, email, faculty_id} = req.body;
        if(faculty_id === "undefined") faculty_id = undefined;
        let foundStudent = await db.Student.findById(req.params.student_id);
        if(faculty_id) {
            await pushId("Faculty", faculty_id, "student_id", foundStudent._id);
        } else if(foundStudent.faculty_id) {
            await spliceId("Faculty", foundStudent.faculty_id, "student_id", foundStudent._id);
        }
        if(foundStudent.faculty_id !== faculty_id){
            foundStudent.lecturer_id = undefined;
            for(let con_id of foundStudent.contribution_id){
                let foundCon = await db.Contribution.findById(con_id);
                if(foundCon) await foundCon.remove();
            }
        }
        if(profileImg){
            cloudinary.v2.uploader.destroy(foundStudent.profileImg.cloud_id);
            foundStudent.profileImg = profileImg;
        }
        if(email) {
            foundStudent.email = email;
        }
        foundStudent.viewname = viewname;
        foundStudent.faculty_id = faculty_id;
        await foundStudent.save();

        return res.status(200).json(foundStudent);
    } catch(err) {
        return next(err);
    }
}
