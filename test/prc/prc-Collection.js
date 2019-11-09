const hdl = require("../../handler");
const mw = require("../../middleware");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.create = async(collectionData, coordinator_id) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: `/api/coordinators/${coordinator_id}/collections`,
        params:{
            coordinator_id
        },
        body: collectionData
    });
    return await prc.exec(req, res, hdl.Collection.create);
}

exports.get = async(coordinator_id) => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url: `/api/coordinators/${coordinator_id}/collections`,
        params:{
            coordinator_id
        }
    });
    return await prc.exec(req, res, hdl.Collection.get);
}

exports.getOne = async(coordinator_id, collection_id) => {
    const {req, res} = mock.createMocks({
        method: "GET",
        url: `/api/coordinators/${coordinator_id}/collections/${collection_id}`,
        params:{
            coordinator_id,
            collection_id
        }
    });
    return await prc.exec(req, res, hdl.Collection.getOne);
}

exports.delete = async(coordinator_id, collection_id) => {
    const {req, res} = mock.createMocks({
        method: "DELETE",
        url: `/api/coordinators/${coordinator_id}/collections/${collection_id}`,
        params: {
            coordinator_id,
            collection_id
        }
    });
    return await prc.exec(req, res, hdl.Collection.delete);
}

exports.update = async(coordinator_id, collection_id, collectionData) => {
    const {req, res} = mock.createMocks({
        method: "PUT",
        url: `/api/coordinators/${coordinator_id}/collections/${collection_id}`,
        params: {
            coordinator_id,
            collection_id
        },
        body: collectionData

    });
    return await prc.exec(req, res, hdl.Collection.update);
}