const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(email, faculty_id) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth/lecturer",
        body: {
            accounts: [
                {
                    testPW: "123",
                    email,
                    faculty_id
                }
            ],
            userType: "Lecturer"
        }
    });
    return await prc.exec(req, res, mw.User.removeTakenEmail, mw.User.genAcc, hdl.Lecturer.create);
}

exports.logIn = async(lecturer) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth",
        body: lecturer
    });
    return await prc.exec(req, res, mw.User.determineType, hdl.User.logIn);
}
