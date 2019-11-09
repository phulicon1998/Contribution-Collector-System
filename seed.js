const db = require("./model");

const roles = [
    {
        name: "FULL CONTROL",
        code: "000",
        desc: ""
    },
    {
        name: "STUDENT CONTROL",
        code: "001",
        desc: ""
    },
    {
        name: "LECTURER CONTROL",
        code: "002",
        desc: ""
    },
    {
        name: "COORDINATOR CONTROL",
        code: "003",
        desc: ""
    },
    {
        name: "MANAGER CONTROL",
        code: "004",
        desc: ""
    }
];

const faculty = [
    {
        name: "Information Technology",
        desc: "This is the detail information"
    },
    {
        name: "Marketing",
        desc: "This is the detail information"
    }
]

async function createRole(){
    try {
        let list = await db.Role.find();
        if(list.length === 0){
            for(let role of roles){
                await db.Role.create(role);
            }
            return console.log("ROLE CREATED");
        }
        return console.log("ROLE LOADED");
    } catch(err) {
        console.log(err);
    }
}

async function createFaculty(){
    try {
        let faculties = await db.Faculty.find();
        if(faculties.length === 0){
            for(let fa of faculty){
                await db.Faculty.create(fa);
            }
            return console.log("FACULTY CREATED");
        }
        return console.log("FACULTY LOADED");
    } catch(err) {
        console.log(err);
    }
}

async function seed(){
    await createRole();
    await createFaculty();
}

module.exports = seed;
