const db = require("../model");
const {genToken} = require("../utils/token");

exports.logIn = async(req, res, next) => {
    try {
        let {user} = req.body;
        if(user){
            let {_id, email, profileImg, viewname, ready} = user;
            let match = await user.comparePassword(req.body.password);
            if(match){
                let userRoles = await db.UserRole.find({user_id: _id}).populate("role_id").exec();
                let roles = userRoles.map(user => user.role_id);
                let getFaculty = ["001", "002", "003"];
                if(getFaculty.indexOf(roles[0].code) !== -1){
                    if(user.faculty_id){
                        var faculty = await db.Faculty.findById(user.faculty_id);
                    } else {
                        var faculty = await db.Faculty.findOne({coordinator_id: _id});
                    }
                    if(faculty) {
                        let token = genToken(_id, email, profileImg, viewname, roles, faculty._id);
                        return res.status(200).json({_id, email, profileImg, viewname, roles, ready, token, faculty_id: faculty._id});
                    }
                }
                let token = genToken(_id, email, profileImg, viewname, roles);
                return res.status(200).json({_id, email, profileImg, viewname, roles, ready, token});
            } else {
                return next({
                    status: 400,
                    message: "Invalid email/password3."
                })
            }
        } else {
            return next({
                status: 400,
                message: "Invalid email/password2."
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid email/password1."
        })
    }
}

exports.firstAddProfile = async(req, res, next) => {
    try {
        let {profileImg, viewname, user} = req.body;
        user.viewname = viewname;
        user.profileImg = profileImg;
        await user.save();
        //prepare new data to return
        let userRoles = await db.UserRole.find({user_id: user._id}).populate("role_id").exec();
        let roles = userRoles.map(doc => doc.role_id);
        let getFaculty = ["001", "002", "003"];
        let faculty;
        if(getFaculty.indexOf(roles[0].code) !== -1){
            if(user.faculty_id){
                faculty = await db.Faculty.findById(user.faculty_id);
            } else {
                faculty = await db.Faculty.findOne({coordinator_id: _id});
            }
        }
        let {_id, email, ready} = user;
        let token = genToken(_id, email, profileImg, viewname, roles, faculty ? faculty._id : faculty);
        return res.status(200).json({_id, email, profileImg, viewname, roles, ready, token, faculty_id: faculty ? faculty._id : null});
    } catch(err) {
        return next(err);
    }
}

exports.editPassword = async(req, res, next) => {
    try {
        let {user, password} = req.body;
        user.password = req.body.password;
        user.ready = true;
        await user.save();

        let {_id, email, profileImg, viewname, ready} = user;
        let userRoles = await db.UserRole.find({user_id: user._id}).populate("role_id").exec();
        let roles = userRoles.map(user => user.role_id);
        let token = genToken(_id, email, profileImg, viewname, roles);
        return res.status(200).json({_id, email, profileImg, viewname, roles, ready, token});
    } catch(err) {
        return next(err);
    }
}
