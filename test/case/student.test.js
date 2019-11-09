require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("STUDENT HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();
        testAcc = {};
        faculty = await seed.getTestFaculty();
    })

    describe("1. Generate student account", function(){

        it("should create new student account with no used email", async function(){
            let rs = await prc.Student.create(seed.studentMail, faculty._id);
            testAcc = {
                email: rs.createdAcc[0].email,
                password: "123"
            };

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be.greaterThan(0);
            expect(rs.count).to.be(0);
        })

        it("should not create new student account with used email", async function(){
            let rs = await prc.Student.create(seed.studentMail, faculty._id);

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be(0);
            expect(rs.count).to.be(1);
        })

    })

    describe("2. Authentication student", function(){

        it("should login student successfully", async function(){
            let rs = await prc.Student.logIn(testAcc);
            expect(rs).to.have.keys("_id", "email", "profileImg", "token");
        });

        it("should be failed to login student", async function(){
            let rs = await prc.Student.logIn({email: "a", password: "a"});
            expect(rs).to.have.keys("status", "message");
        });
    })

    after(async function(){
        await seed.clear();
    })

})
