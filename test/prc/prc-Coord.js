const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(email) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth/coordinator",
        body: {
            accounts: [
                {
                    testPW: "123",
                    email
                }
            ],
            userType: "Coordinator"
        }
    });
    return await prc.exec(req, res, mw.User.removeTakenEmail, mw.User.genAcc, hdl.Coordinator.create);
}

exports.logIn = async(coordinator) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/auth",
        body: coordinator
    });
    return await prc.exec(req, res, mw.User.determineType, hdl.User.logIn);
}
