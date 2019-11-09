const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(email) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth/manager",
        body: {
            accounts: [
                {
                    testPW: "123",
                    email
                }
            ],
            userType: "Manager"
        }
    });
    return await prc.exec(req, res, mw.User.removeTakenEmail, mw.User.genAcc, hdl.Manager.create);
}

exports.logIn = async(manager) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth",
        body: manager
    });
    return await prc.exec(req, res, mw.User.determineType, hdl.User.logIn);
}
