require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("FACULTY HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();

        // generate coordinator
        await prc.Coordinator.create(seed.coordMail);
        // login coordinator
        logCoord = await prc.Coordinator.logIn({email: seed.coordMail, password: "123"});
        // created fac
        createdFa = "";

    })

    describe("1. Create new faculties", function(){

        it("should not create new faculty without coordinator", async function(){
            let rs = await prc.Faculty.create({...seed.faculty, coordinator_id: "123"});

            expect(rs).to.have.keys("message");
        })

        it("should create new faculty with coordinator", async function(){
            let rs = await prc.Faculty.create({...seed.faculty, coordinator_id: logCoord._id});
            createdFa = rs;

            expect(rs).to.have.keys("name", "desc", "coordinator_id");
            expect(rs.name).to.be(seed.faculty.name);
            expect(rs.desc).to.be(seed.faculty.desc);
            expect(rs.coordinator_id).to.be(logCoord._id);
        })

    })

    describe("2. View all faculties", function() {

        it("should display all faculties successfully", async function(){
            let rs = await prc.Faculty.get();

            expect(rs).to.be.an("array");
        })

    })

    describe("3. View detail faculty", function(){

        it("should display faculty detail successfully", async function(){
            let rs = await prc.Faculty.getOne(createdFa._id);

            expect(rs).to.be.an("object");
        })
    })

    describe("4. Update faculty", function(){

        it("should update successfully faculty", async function(){
            let data = {...seed.faculty, coordinator_id: logCoord._id};
            let rs = await prc.Faculty.update(createdFa._id, data);

            expect(rs).to.have.keys("name", "desc", "coordinator_id");
            expect(rs.name).to.be(seed.faculty.name);
            expect(rs.desc).to.be(seed.faculty.desc);
            expect(rs.coordinator_id).to.be(logCoord._id);
            expect(rs._id).to.be(createdFa._id);
        })

        it("should update faculty with wrong id", async function(){
            let data = {...seed.faculty, coordinator_id: logCoord._id};
            let rs = await prc.Faculty.update("125", data);

            expect(rs).to.have.keys("message");
        })

    })

    describe("5. Delete faculty", function(){

        it("should delete faculty successfully", async function(){
            let rs = await prc.Faculty.delete(createdFa._id);

            expect(rs._id).to.be(createdFa._id);
        })

        it("should delete faculty with wrong id", async function(){
            let rs = await prc.Faculty.delete("124");

            expect(rs).to.have.keys("message");
        })
    })



    after(async function(){
        await seed.clear();
    })

})
