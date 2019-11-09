const jwt = require("jsonwebtoken");

function genToken(_id, email, profileImg, viewname, roles, faculty_id) {
    return jwt.sign({_id, email, viewname, profileImg, roles, faculty_id}, process.env.SECRET);
}

async function getRoleFromToken(header) {
    let token = header.split(" ")[1];
    return await jwt.verify(token, process.env.SECRET).roles[0].code;
}

module.exports = {genToken, getRoleFromToken};
