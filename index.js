require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./model");

const seed = require("./seed");
const mw = require("./middleware");
const hdl = require("./handler");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// API REQUIRE AND USE HERE //

app.use("/api/auth", require("./route/r-login"));
app.use("/api/students", require("./route/r-student"));
app.use("/api/coordinators", require("./route/r-coord"));
app.use("/api/lecturers", require ("./route/r-lecturer"));
app.use("/api/managers", require ("./route/r-manager"));
app.use("/api/admins", require ("./route/r-admin"));
app.use("/api/faculties", require ("./route/r-faculty"));

// HANDLE ERRORS AND LISTEN PORT //

app.use((req, res, next) => {
    let err = new Error("Route not found!");
    err.status = 404;
    next(err);
});

app.use(hdl.Error.handle);

app.listen(process.env.PORT, async() => {
    //load role
    await seed();
    console.log(`[ SERVER IS STARTED ON PORT ${process.env.PORT} ]`);
})
