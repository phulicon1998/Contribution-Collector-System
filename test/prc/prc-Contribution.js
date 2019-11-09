const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(data, student_id) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: `/api/students/${student_id}/contributions`,
        params:{
            student_id
        },
        body: data
    });
    return await prc.exec(req, res, mw.Contribution.getUploadData, hdl.Contribution.create);
}

exports.get = async(coordinator_id, collection_id) => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url: `/api/coordinators/${coordinator_id}/collections/${collection_id}/contributions`,
        params:{
            coordinator_id,
            collection_id
        }
    });
    return await prc.exec(req, res, hdl.Contribution.get);
}

exports.getOne = async(coordinator_id, collection_id, contribution_id) => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url:`/api/coordinators/${coordinator_id}/collections/${collection_id}/contributions/${contribution_id}`,
        params:{
            coordinator_id,
            collection_id,
            contribution_id
        }
    });
    return await prc.exec(req, res, hdl.Contribution.getOne);
}

// not delete contribution
exports.delete = async(coordinator_id, collection_id, contribution_id) => {
    const {req, res} = mock.createMocks({
        method: "DELETE",
        url:`/api/coordinators/${coordinator_id}/collections/${collection_id}/contributions/${contribution_id}`,
        params: {
            coordinator_id,
            collection_id,
            contribution_id
        }
    });
    return await prc.exec(req, res, hdl.Contribution.delete);
}

exports.updateApprove = async(lecturer_id, student_id, contribution_id, data) => {
    const {req, res} = mock.createMocks({
        method: "PUT",
        url:`/api/lecturer/${lecturer_id}/students/${student_id}/contributions/${contribution_id}`,
        params: {
            lecturer_id,
            student_id,
            contribution_id
        },
        body: data
    });
    return await prc.exec(req, res, hdl.Contribution.updateApprove);
}

exports.updateSelect = async(coordinator_id, collection_id, contribution_id, data) => {
    const {req, res} = mock.createMocks({
        method: "PUT",
        url:`/api/coordinators/${coordinator_id}/collections/${collection_id}/contributions/${contribution_id}`,
        params: {
            coordinator_id,
            collection_id,
            contribution_id
        },
        body: data
    });
    return await prc.exec(req, res, hdl.Contribution.updateSelect);
}
