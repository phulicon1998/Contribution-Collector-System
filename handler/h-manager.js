const db = require("../model");
const {cloudinary} = require("../utils/uploader");

exports.create = async(req, res, next) => {
    try{
        let {count, createdAcc} = req.body;
        for(let acc of createdAcc){
            let foundRole = await db.Role.findOne({code: "004"});
            let createdUserRole = await db.UserRole.create({
                user_id: acc._id,
                role_id: foundRole._id,
                onModel: "Manager"
            });
        }
        let msg = count === 0 ? "All provided emails are valid and processed successfully" : `${count} email is taken and can't be processed`;
        return res.status(200).json({createdAcc, msg, count});
    } catch(err) {
        return next(err);
    }
}

exports.get = async(req, res, next) => {
    try {
        let mans = await db.Manager.find({ready: true});
        return res.status(200).json(mans);
    } catch(err) {
        return next(err);
    }
}

exports.getUnready = async(req, res, next) => {
    try {
        let mans = await db.Manager.find({ready: false});
        return res.status(200).json(mans);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundMan = await db.Manager.findById(req.params.manager_id);
        await foundMan.remove();
        return res.status(200).json(foundMan);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        let {profileImg, viewname, email, faculty_id} = req.body;
        if(faculty_id === "undefined") faculty_id = undefined;
        let foundMM = await db.Manager.findById(req.params.manager_id);
        if(profileImg){
            cloudinary.v2.uploader.destroy(foundMM.profileImg.cloud_id);
            foundMM.profileImg = profileImg;
        }
        if(email) foundMM.email = email;
        foundMM.viewname = viewname;
        await foundMM.save();
        return res.status(200).json(foundMM);
    } catch(err) {
        return next(err);
    }
}
