const db = require("../model");
const {cloudinary} = require("../utils/uploader");

exports.create = async(req, res, next) => {
    try{
        let {count, createdAcc} = req.body;
        for(let acc of createdAcc){
            //add role to acc
            let foundRole = await db.Role.findOne({code: "003"});
            let createdUserRole = await db.UserRole.create({
                user_id: acc._id,
                role_id: foundRole._id,
                onModel: "Coordinator"
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
        let coordinators = await db.Coordinator.find({ready: true});
        return res.status(200).json(coordinators);
    } catch(err) {
        return next(err);
    }
}

// để lấy tất cả các account đã dc gen ra rồi nhưng chưa dc người dùng đăng nhập
// tức là chưa có ảnh đại diện chưa có viewname gì cả
exports.getUnready = async(req, res, next) => {
    try {
        let coords = await db.Coordinator.find({ready: false}).populate("faculty_id").exec();
        return res.status(200).json(coords);
    } catch(err) {
        return next(err);
    }
}

// đổ dữ liệu vào thanh dropdown để chỉ cho phép người chọn chọn những coordinator chưa dc phân công vào bất kì faculty nào
exports.getUnassign = async(req, res, next) => {
    try {
        let coords = await db.Coordinator.find({ready: true}).populate("faculty_id").exec();
        let faculties = await db.Faculty.find();
        let assignCoords = faculties.filter(val => val.coordinator_id !== undefined).map(val => val.coordinator_id);
        let unassignCoords = [];
        coords.forEach(coord => {
            let count = 0;
            assignCoords.forEach(ass => {
                if(coord._id.equals(ass)) count++;
            })
            if(count === 0) unassignCoords.push(coord);
        })

        return res.status(200).json(unassignCoords);
    } catch(err) {
        return next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let foundCoord = await db.Coordinator.findById(req.params.coordinator_id);
        await foundCoord.remove();
        return res.status(200).json(foundCoord);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        let {profileImg, viewname, email, faculty_id} = req.body;
        if(faculty_id === "undefined") faculty_id = undefined;
        let foundCoordinator = await db.Coordinator.findById(req.params.coordinator_id);
        if(profileImg){
            cloudinary.v2.uploader.destroy(foundCoordinator.profileImg.cloud_id);
            foundCoordinator.profileImg = profileImg;
        }
        if(email) foundCoordinator.email = email;
        foundCoordinator.viewname = viewname;
        await foundCoordinator.save();
        return res.status(200).json(foundCoordinator);
    } catch(err) {
        return next(err);
    }
}
