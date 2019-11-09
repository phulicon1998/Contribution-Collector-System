async function exec(req, res, prcs, length){
    try {
        await prcs[0](req, res, err => {if(err) throw err});
        prcs.splice(0, 1);

        if(prcs.length === 0) {
            return res._getData() ? JSON.parse(res._getData()) : {};
        } else {
            return await exec(req, res, prcs, length);
        }
    } catch(err){
        return err;
    }
}

module.exports.exec = async(req, res, ...prcs) => {
    return await exec(req, res, prcs, prcs.length);
}

module.exports.Student = require("./prc-Student");
module.exports.Coordinator = require("./prc-Coord");
module.exports.Lecturer = require("./prc-Lecturer");
module.exports.Manager = require("./prc-Manager");
module.exports.Faculty = require("./prc-Faculty");
module.exports.Collection = require("./prc-Collection");
module.exports.Contribution = require("./prc-Contribution");
module.exports.Word = require("./prc-Word");
module.exports.Image = require("./prc-Image");
