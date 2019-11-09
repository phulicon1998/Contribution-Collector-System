const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async({name, desc, coordinator_id}) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/faculties",
        body: {
            name, desc, coordinator_id
        }
    });
    return await prc.exec(req, res, hdl.Faculty.create);
}

exports.get = async() => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url: "/api/faculties"
    });
    return await prc.exec(req, res, hdl.Faculty.get);
}

exports.getOne = async(faculty_id) => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url: `/api/faculties/${faculty_id}`,
        params:{
            faculty_id
        }
    });
    return await prc.exec(req, res, hdl.Faculty.getOne);
}

exports.delete = async(faculty_id) => {
    const {req, res} = mock.createMocks({
        method: "DELETE",
        url: `/api/faculties/${faculty_id}`,
        params: {
            faculty_id
        }
    });
    return await prc.exec(req, res, hdl.Faculty.delete);
}

exports.update = async(faculty_id, data) => {
    const {req, res} = mock.createMocks({
        method: "PUT",
        url: `/api/faculties/${faculty_id}`,
        params: {
            faculty_id
        },
        body: data

    });
    return await prc.exec(req, res, hdl.Faculty.update);
}
