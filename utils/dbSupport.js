const db = require("../model");

exports.spliceId = async(schema, schemaId, spliceCol, spliceId) => {
    try {
        let foundDoc = await db[schema].findById(schemaId);
        if(foundDoc){
            foundDoc[spliceCol].splice(foundDoc[spliceCol].indexOf(spliceId), 1);
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

exports.pushId = async(schema, schemaId, pushCol, pushId) => {
    try {
        let foundDoc = await db[schema].findById(schemaId);
        if(foundDoc) {
            foundDoc[pushCol].push(pushId);
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

exports.assignId = async(schema, schemaId, assignCol, assignId) => {
    try {
        let foundDoc = await db[schema].findById(schemaId);
        if(foundDoc) {
            foundDoc[assignCol] = assignId;
            await foundDoc.save();
        }
    } catch(err) {
        console.log(err);
    }
}

exports.casadeDeleteMany = async(schema, listId) => {
    try {
        for(let id of listId){
            let foundDoc = await db[schema].findById(id);
            if(foundDoc) await foundDoc.remove();
        }
    } catch(err) {
        console.log(err);
    }
}
