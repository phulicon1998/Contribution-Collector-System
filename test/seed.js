const db = require("../model");

exports.studentMail = "magazine.group.1213@gmail.com";
exports.lecturerMail = "magazine.group1.213@gmail.com";
exports.coordMail = "magazine.group12.13@gmail.com";
exports.managerMail = "magazine.group121.3@gmail.com";

exports.faculty = {
    name: "test fa",
    desc: "test desc"
};

exports.collectionData = {
    title: "Collection test",
    description: "Description test",
    closureDate: "Apr 30th 2019",
    finalClosureDate: "May 30th 2019"
};

exports.uploadData = {
    words: [
        {
            link: "https://res.cloudinary.com/dkpl83zte/raw/upload/v1557144800/DEMO_snjr2q.docx",
            cloudId: "123"
        }
    ],
    images: [
        {
            link: "https://res.cloudinary.com/dkpl83zte/image/upload/v1555838372/riccardo-mion-652664-unsplash_r0coos.webp",
            cloudId: "123"
        }
    ]
};

exports.cbLecUpdate = {
    approveStatus: "Approve test",
};

exports.cbCoorUpdate = {
    comment: "comment test",
    selectForPublic: true
}

exports.getTestFaculty = async() => {
    let faculty = await db.Faculty.find();
    return faculty[0];
}

exports.clear = async() => {
    let student = await db.Student.findOne({email: exports.studentMail});
    if(student) await student.remove();

    let lecturer = await db.Lecturer.findOne({email: exports.lecturerMail});
    if(lecturer) await lecturer.remove();

    let coord = await db.Coordinator.findOne({email: exports.coordMail});
    if(coord) await coord.remove();

    let manager = await db.Manager.findOne({email: exports.managerMail});
    if(manager) await manager.remove();

    let faculty = await db.Faculty.findOne({name: "test fa"});
    if(faculty) faculty.remove();

    let collection = await db.Collection.findOne({title: "Collection test"});
    if(collection) await collection.remove();

    let wordContribution = await db.Word.findOne({cloudId: "123"});
    if(wordContribution) await wordContribution.remove();

    let imageContribution = await db.Image.findOne({cloudId: "123"});
    if(imageContribution) await imageContribution.remove();

    // let imageContribution = await db.Contribution.findOne({image_id: {$in: exports.uploadData.image_id}});
    // if(imageContribution) await imageContribution.remove();

    let cbLecUpdate = await db.Contribution.findOne({approveStatus: "Approve test"});
    if(cbLecUpdate) await cbLecUpdate.remove();

    let cbCoorUpdate = await db.Contribution.findOne({comment: "comment test"});
    if(cbCoorUpdate) await cbCoorUpdate.remove();
}
