require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("LECTURER HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();
        testAcc = {};
        faculty = await seed.getTestFaculty();
    })

    describe("1. Generate lecturer account", function(){

        it("should create new lecturer account with no used email", async function(){
            let rs = await prc.Lecturer.create(seed.lecturerMail, faculty._id);
            testAcc = {
                email: rs.createdAcc[0].email,
                password: "123"
            };

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be.greaterThan(0);
            expect(rs.count).to.be(0);
        })

        it("should not create new lecturer account with used email", async function(){
            let rs = await prc.Lecturer.create(seed.lecturerMail, faculty._id);

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be(0);
            expect(rs.count).to.be(1);
        })
    })

    describe("2. Authentication lecturer", function(){

        it("should login lecturer successfully", async function(){
            let rs = await prc.Lecturer.logIn(testAcc);
            expect(rs).to.have.keys("_id", "email", "profileImg", "token");
        });

        it("should be failed to login lecturer", async function(){
            let rs = await prc.Lecturer.logIn({email: "a", password: "a"});
            expect(rs).to.have.keys("status", "message");
        });
    })

    after(async function(){
        await seed.clear();
    })

})
