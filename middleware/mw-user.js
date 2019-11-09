const db = require("../model");
const genStr = require("../utils/genString");
const {transportMail, genAccMail} = require("../utils/sendMail");
const {cloudinary} = require("../utils/uploader");
const jwt = require("jsonwebtoken");

exports.removeTakenEmail = async(req, res, next) => {
    try {
        let {accounts} = req.body;
        let students = await db.Student.find();
        let lecturers = await db.Lecturer.find();
        let coords = await db.Coordinator.find();
        let managers = await db.Manager.find();
        let admins = await db.Admin.find();
        let list = [...students, ...lecturers, ...coords, ...managers, ...admins];
        if(list.length > 0) {
            let listEmail = list.map(acc => acc.email);
            let verifyAccounts = accounts.filter(acc => listEmail.indexOf(acc.email) === -1);
            req.body.accounts = verifyAccounts;
            req.body.count = accounts.length - verifyAccounts.length;
            return next();
        }
        req.body.count = 0;
        return next();
    } catch(err) {
        return next(err);
    }
}

exports.verifyUpdateEmail = async(req, res, next) => {
    try {
        const {student_id, lecturer_id, manager_id, coordinator_id} = req.params;
        let curUser_id = student_id || lecturer_id || manager_id || coordinator_id;
        if(req.body.email){
            let students = await db.Student.find();
            let lecturers = await db.Lecturer.find();
            let coords = await db.Coordinator.find();
            let managers = await db.Manager.find();
            let admins = await db.Admin.find();
            let list = [...students, ...lecturers, ...coords, ...managers, ...admins];
            let count = 0;
            for(let user of list){
                if(!user._id.equals(curUser_id) && user.email === req.body.email){
                    count++;
                }
            }
            if(count > 0){
                return next({
                    status: 400,
                    message: "This email is taken"
                })
            }
            return next();
        }
    } catch(err) {
        return next(err);
    }
    const {email} = req.body;
}

exports.genAcc = async(req, res, next) => {
    try {
        let {accounts, userType} = req.body;
        let createdAcc = [];
        for(let account of accounts) {
            let password = genStr();
            if(account.testPW){
                password = account.testPW;
            }
            let createdUser = await db[userType].create({...account, password});
            let user = {_id: createdUser._id, ...account, password};
            createdAcc.push(user);
        }
        req.body.createdAcc = createdAcc;
        return next();
    } catch(err) {
        return next(err);
    }
}

exports.sendMail = (req, res, next) => {
    try {
        const {userType, createdAcc} = req.body;
        for(let acc of createdAcc){
            let mail = genAccMail(acc.password, acc.email, userType);
            transportMail(...mail);
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

exports.getUserEmail = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, payload) => {
            if(payload){
                req.body.email = payload.email;
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please login first!"
                })
            }
        })
    } catch(err) {
        return next(err);
    }
}

exports.determineType = async(req, res, next) => {
    try{
        let userType = ["Student", "Lecturer", "Coordinator", "Manager", "Admin"];
        for(let type of userType){
            let user = await db[type].findOne({email: req.body.email});
            if(user) {
                req.body.user = user;
                break;
            }
        }
        return next();
    } catch(err) {
        return next(err);
    }
}

exports.getProfileImg = async(req, res, next) => {
    try {
        if(req.file){
    		let ava = await cloudinary.v2.uploader.upload(req.file.path);
            let profileImg = {
                link: ava.secure_url,
                cloud_id: ava.public_id
            }
            req.body.profileImg = profileImg;
    	}
        return next();
    } catch(err) {
        return next(err);
    }
}
