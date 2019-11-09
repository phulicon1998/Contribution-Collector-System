const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = Promise;

// REQUIRE THE OTHER MODELS HERE
module.exports.role = require("./m-role");
module.exports.Lecturer = require("./m-lecturer");
module.exports.Student = require("./m-student");
module.exports.Manager = require("./m-manager");
module.exports.Admin = require("./m-admin");
module.exports.Coordinator = require("./m-coord");
module.exports.Role = require("./m-role");
module.exports.UserRole = require("./m-userRole");
module.exports.Collection = require("./m-collection");
module.exports.Contribution = require("./m-contribution");
module.exports.Faculty = require("./m-faculty");
module.exports.Image = require("./m-image");
module.exports.Word = require("./m-word");

// REPORT
module.exports.CbNumberReport = require("./report/m-cbNumber");
module.exports.CbPercentageReport = require("./report/m-cbPercentage");
module.exports.CbtorNumberReport = require("./report/m-cbtorNumber");
module.exports.ExceptionReport = require("./report/m-exception");
module.exports.StatisticReport = require("./report/m-statistic");
