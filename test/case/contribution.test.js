require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");
const db = require("../../model");

describe("CONTRIBUTION HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();

        // generate coordinator
        await prc.Coordinator.create(seed.coordMail);
        // login coordinator
        logCoord = await prc.Coordinator.logIn({email: seed.coordMail, password: "123"});
        // generate student
        await prc.Student.create(seed.studentMail);
        // login student
        logStudent = await prc.Student.logIn({email: seed.studentMail, password: "123"});

        // generate lecterer
        await prc.Lecturer.create(seed.lecturerMail);
        // login lecterer
        logLect = await prc.Lecturer.logIn({email: seed.lecturerMail, password: "123"});

        //created Collection
        createdCol = await prc.Collection.create(seed.collectionData, logCoord._id);

        // fake upload data
        let wordList = [], imageList = [];
        const {words, images} = seed.uploadData;
        for(var word of words){
            let rsWord = await db.Word.create(word);
            wordList.push(rsWord._id);
        }
        for(var image of images){
            let rsImage = await db.Image.create(image);
            imageList.push(rsImage._id);
        }

        data = {word_id: wordList, image_id: imageList, collection_id: createdCol._id};
        createdCb = "";

    })

    describe("1. Create new contribution", function(){

        it("should create new contribution with student id successfully", async function(){
            let rs = await prc.Contribution.create({data}, logStudent._id);
            createdCb = rs;

            expect(rs).to.have.keys("word_id", "image_id", "approveStatus", "student_id");
            expect(rs.word_id).to.be.an("array");
            expect(rs.image_id).to.be.an("array");
            expect(rs.approveStatus).to.be("Pending");
            expect(rs.student_id).to.be(logStudent._id);
        })

        it("should create new contribution with wrong student", async function(){
            let rs = await prc.Contribution.create({data}, "123");

            expect(rs).to.have.keys("message");
        })

    })

    describe("2. View all contributions", function() {

        it("should display all contributions successfully", async function(){
            let rs = await prc.Contribution.get(logCoord._id, createdCol._id);

            expect(rs).to.be.an("array");
        })
    })

    describe("3. View detail contributions", function(){

        it("should display contribution detail successfully", async function(){
            let rs = await prc.Contribution.getOne(logCoord._id, createdCol._id, createdCb._id);

            expect(rs._id).to.be(createdCb._id);
            expect(rs).to.be.an("object");
        })

        it("should display contribution detail with wrong contribution", async function(){
            let rs = await prc.Contribution.getOne(logCoord._id, createdCol._id, "123");

            expect(rs).to.have.keys("message");
        })

    })

    describe("4. Update contribution", function(){

        it("should update contribution's approve status successfully", async function(){
            let rs = await prc.Contribution.updateApprove(logLect._id, logStudent._id, createdCb._id, seed.cbLecUpdate);

            expect(rs).to.have.keys("approveStatus");
            expect(rs.approveStatus).to.be(seed.cbLecUpdate.approveStatus);
            expect(rs._id).to.be(createdCb._id);
        })

        it("should update contribution's approve status with wrong contribution", async function(){
            let rs = await prc.Contribution.updateApprove(logLect._id, logStudent._id, "123", seed.cbLecUpdate);

            expect(rs).to.have.keys("message");
        })


        it("should update contribution's public and comment successfully", async function(){
            let rs = await prc.Contribution.updateSelect(logCoord._id, createdCol._id, createdCb._id, seed.cbCoorUpdate);

            expect(rs).to.have.keys("comment", "selectForPublic");
            expect(rs.comment).to.be(seed.cbCoorUpdate.comment);
            expect(rs.selectForPublic).to.be(seed.cbCoorUpdate.selectForPublic);
            expect(rs._id).to.be(createdCb._id);
        })

        it("should update contribution's public and comment with wrong contribution", async function(){
            let rs = await prc.Contribution.updateSelect(logCoord._id, createdCol._id, "123", seed.cbCoorUpdate);

            expect(rs).to.have.keys("message");
        })
    })


    after(async function(){
        await seed.clear();
    })

})
