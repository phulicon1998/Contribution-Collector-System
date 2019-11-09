require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("COLLECTION HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();

        // generate coordinator
        await prc.Coordinator.create(seed.coordMail);
        // login coordinator
        logCoord = await prc.Coordinator.logIn({email: seed.coordMail, password: "123"});

        // creted Faculty
        createdFa = await prc.Faculty.create({...seed.faculty, coordinator_id: logCoord._id});

        //createdCol
        createdCol = "";

    })

    describe("1. Create new collection", function(){

        it("should create new collection with coordinator", async function(){
            let rs = await prc.Collection.create(seed.collectionData, logCoord._id);
            createdCol = rs;

            expect(rs).to.have.keys("title", "description", "closureDate", "finalClosureDate");
            expect(rs.title).to.be(seed.collectionData.title);
            expect(rs.description).to.be(seed.collectionData.description);
            expect(rs.closureDate).to.be(seed.collectionData.closureDate);
            expect(rs.finalClosureDate).to.be(seed.collectionData.finalClosureDate);
        })

        it("should create new collection with wrong coordinator", async function(){
            let rs = await prc.Collection.create("123", seed.collectionData);

            expect(rs).to.have.keys("message");
        })

    })

    describe("2. View all collections", function() {

        it("should display all collections successfully", async function(){
            let rs = await prc.Collection.get(logCoord._id);

            expect(rs).to.be.an("array");
        })

    })

    describe("3. View detail collection", function(){

        it("should display collection detail successfully", async function(){
            let rs = await prc.Collection.getOne({coordinator_id: logCoord._id}, createdCol._id);

            expect(rs._id).to.be(createdCol._id);
            expect(rs).to.be.an("object");
        })

        it("should display collection detail with wrong collection id", async function(){
            let rs = await prc.Collection.getOne( logCoord._id, "123");

            expect(rs).to.have.keys("message");
        })

    })

    describe("4. Update collection", function(){

        it("should update successfully collection", async function(){
            let collectionData = {...seed.collectionData};
            let rs = await prc.Collection.update({coordinator_id: logCoord._id}, createdCol._id, collectionData);

            expect(rs).to.have.keys("title", "description", "closureDate", "finalClosureDate");
            expect(rs.title).to.be(seed.collectionData.title);
            expect(rs.description).to.be(seed.collectionData.description);
            expect(rs.closureDate).to.be(seed.collectionData.closureDate);
            expect(rs.finalClosureDate).to.be(seed.collectionData.finalClosureDate);
            expect(rs._id).to.be(createdCol._id);
        })

        it("should update collection with wrong collection id", async function(){
            let collectionData = {...seed.collectionData};
            let rs = await prc.Collection.update(logCoord._id, "123", collectionData);

            expect(rs).to.have.keys("message");
        })

    })

    describe("5. Delete collection", function(){

        it("should delete collection successfully", async function(){
            let rs = await prc.Collection.delete({coordinator_id: logCoord._id}, createdCol._id);

            expect(rs._id).to.be(createdCol._id);
        })

        it("should delete collection with wrong collection id", async function(){
            let rs = await prc.Collection.delete(logCoord._id, "124");

            expect(rs).to.have.keys("message");
        })

    })



    after(async function(){
        await seed.clear();
    })

})
