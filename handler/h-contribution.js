const db = require("../model");
const {transportMail, genAccMail, mails} = require("../utils/sendMail");
const {getRoleFromToken} = require("../utils/token");

exports.get = async(req, res, next) => {
    try{
        let listContribution = await db.Contribution.find();
        return res.status(200).json(listContribution);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    const {contribution_id} = req.params;
    const {authorization} = req.headers;
    try{
        let contribution = await db.Contribution.findById(contribution_id).populate({
            path: "student_id image_id word_id",
            populate: {
                path: "faculty_id",
                populate: {
                    path: "coordinator_id"
                }
            }
        }).exec();
        let userRole = await getRoleFromToken(authorization);
        if(userRole !== "001") {
            contribution.newSubmit = false;
            await contribution.save();
        }
        return res.status(200).json(contribution);
    } catch (err){
        return next(err);
    }
}

exports.delete = async(req, res, next) =>{
    try {
        let foundContri = await db.Contribution.findById(req.params.contribution_id);
        await foundContri.remove();
        return res.status(200).json(foundContri);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {student_id} = req.params;
        const {word_id, image_id, collection_id} = req.body;

        let latestCon = await db.Contribution.findOne({latest: true, collection_id, student_id});
        if(latestCon){
            latestCon.latest = false;
            if(latestCon.approveStatus === "Approve") latestCon.approveStatus = "Deny";
            latestCon.selectForPublic = false;
            await latestCon.save();
        }

        let contribution = {...req.body, student_id};
        let createdContribution = await db.Contribution.create(contribution);

        let foundCollection = await db.Collection.findById(collection_id);
        if(foundCollection){
            foundCollection.contribution_id.push(createdContribution._id);
            await foundCollection.save();
        }

        let foundStudent = await db.Student.findById(student_id).populate("lecturer_id").exec();
        if(foundStudent){
            foundStudent.contribution_id.push(createdContribution._id);
            await foundStudent.save();
        }
        if(foundStudent.lecturer_id) {
            let mail = mails.submit(foundStudent.lecturer_id.viewname, foundStudent.viewname, foundStudent.lecturer_id.email);
            transportMail(...mail);
        }
        return res.status(200).json(createdContribution);
    } catch(err) {
        return next(err);
    }
}

exports.updateStatus = async(req, res, next) => {
    try{
        const {status} = req.body;
        const {contribution_id, faculty_id} = req.params;
        let foundContri = await db.Contribution.findById(contribution_id).populate("student_id").exec();
        foundContri.approveStatus = status;
        if(status === "Deny") foundContri.latest = false;
        foundContri.newSubmit = true;
        await foundContri.save();
        let faculty = await db.Faculty.findById(faculty_id).populate("coordinator_id").exec();
        let mail;
        if(status === "Approve") {
            mail = mails.approve(faculty.coordinator_id.viewname, foundContri.student_id.viewname, foundContri.student_id.email);
        } else {
            mail = mails.deny(faculty.coordinator_id.viewname, foundContri.student_id.email);
        }
        transportMail(...mail);
        return res.status(200).json(foundContri);
    } catch(err) {
        return next(err);
    }
}

exports.updateSelect = async(req, res, next) => {
    try {
        const {select} = req.body;
        const {contribution_id, faculty_id} = req.params;
        let foundContri = await db.Contribution.findById(contribution_id).populate("student_id collection_id").exec();
        foundContri.selectForPublic = select;
        await foundContri.save();
        //send mail to student
        if(select){
            let faculty = await db.Faculty.findById(faculty_id).populate("coordinator_id").exec();
            let mail = mails.select(faculty.coordinator_id.viewname, foundContri.student_id.viewname, foundContri.collection_id.title, faculty.coordinator_id.email);
            transportMail(...mail);
        }
        return res.status(200).json(foundContri);
    } catch(err) {
        return next(err);
    }
}

exports.updateComment = async(req, res, next) => {
    try {
        let foundContri = await db.Contribution.findById(req.params.contribution_id).populate("student_id collection_id").exec();
        foundContri.comment = req.body.comment;
        await foundContri.save();
        let faculty = await db.Faculty.findById(req.params.faculty_id).populate("coordinator_id").exec();
        let mail = mails.comment(faculty.coordinator_id.viewname, foundContri.student_id.viewname, foundContri.collection_id.title, foundContri.student_id.email);
        transportMail(...mail);
        return res.status(200).json(foundContri);
    } catch(err) {
        return next(err);
    }
}
