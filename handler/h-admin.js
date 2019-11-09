const db = require("../model");

exports.create = async(req, res, next) => {
    try{
        let {count, createdAcc} = req.body;
        for(let acc of createdAcc){
            let foundRole = await db.Role.findOne({code: "000"});
            let createdUserRole = await db.UserRole.create({
                user_id: acc._id,
                role_id: foundRole._id,
                onModel: "Admin"
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
        let admins = await db.Admin.find({ready: true});
        return res.status(200).json(admins);
    } catch(err) {
        return next(err);
    }
}

exports.getUnready = async(req, res, next) => {
    try {
        let admins = await db.Admin.find({ready: false});
        return res.status(200).json(admins);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundAdmin = await db.Admin.findById(req.params.admin_id);
        await foundAdmin.remove();
        return res.status(200).json(foundAdmin);
    } catch(err) {
        return next(err);
    }
}
