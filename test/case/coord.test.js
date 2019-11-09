require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("COORDINATOR HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();
        testAcc = {};
    })

    describe("1. Generate coordinator account", function(){

        it("should create new coordinator account with no used email", async function(){
            let rs = await prc.Coordinator.create(seed.coordMail);
            testAcc = {
                email: rs.createdAcc[0].email,
                password: "123"
            };

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be.greaterThan(0);
            expect(rs.count).to.be(0);
        })

        it("should not create new coordinator account with used email", async function(){
            let rs = await prc.Coordinator.create(seed.coordMail);

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be(0);
            expect(rs.count).to.be(1);
        })

    })

    describe("2. Authentication coordinator", function(){

        it("should login coordinator successfully", async function(){
            let rs = await prc.Coordinator.logIn(testAcc);
            expect(rs).to.have.keys("_id", "email", "profileImg", "token");
        });

        it("should be failed to login coordinator", async function(){
            let rs = await prc.Coordinator.logIn({email: "a", password: "a"});
            expect(rs).to.have.keys("status", "message");
        });
    })

    after(async function(){
        await seed.clear();
    })

})
