require("dotenv").config();
const mocha = require("mocha");
const expect = require("expect.js");
const seed = require("../seed");
const prc = require("../prc");

describe("MANAGER HANDLERS TEST", function(){

    before(async function(){
        await seed.clear();
        testAcc = {};
    })

    describe("1. Generate Manager account", function(){

        it("should create new Manager account with no used email", async function(){
            let rs = await prc.Manager.create(seed.managerMail);
            testAcc = {
                email: rs.createdAcc[0].email,
                password: "123"
            };

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be.greaterThan(0);
            expect(rs.count).to.be(0);
        })

        it("should not create new Manager account with used email", async function(){
            let rs = await prc.Manager.create(seed.managerMail);

            expect(rs).to.have.keys("createdAcc", "msg", "count");
            expect(rs.createdAcc).to.be.an("array");
            expect(rs.createdAcc.length).to.be(0);
            expect(rs.count).to.be(1);
        })

    })

    describe("2. Authentication Manager", function(){

        it("should login Manager successfully", async function(){
            let rs = await prc.Manager.logIn(testAcc);
            expect(rs).to.have.keys("_id", "email", "profileImg", "token");
        });

        it("should be failed to login Manager", async function(){
            let rs = await prc.Manager.logIn({email: "a", password: "a"});
            expect(rs).to.have.keys("status", "message");
        });
    })

    after(async function(){
        await seed.clear();
    })

})
