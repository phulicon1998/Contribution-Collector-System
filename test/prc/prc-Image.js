const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(student_id, contribution_id, data) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: `/api/students/${student_id}/contributions/${contribution_id}/images`,
        params:{
            student_id,
            contribution_id
        },
        body: data
    });
    return await prc.exec(req, res, hdl.Image.create);
}
