const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(email, faculty_id) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth/students",
        body: {
            accounts: [
                {
                    testPW: "123",
                    userType: "Student",
                    email, faculty_id
                }
            ],
            userType: "Student"
        }
    });
    return await prc.exec(req, res, mw.User.removeTakenEmail, mw.User.genAcc, hdl.Student.create);
}

exports.logIn = async(student) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth",
        body: student
    });
    return await prc.exec(req, res, mw.User.determineType, hdl.User.logIn);
}
