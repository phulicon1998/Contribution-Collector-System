const mongoose = require("mongoose");
const util = require("util");
const bcrypt = require("bcrypt");

function baseUserSchema() {
    mongoose.Schema.apply(this, arguments);

    this.add({
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImg: {
            link: String,
            cloud_id: String
        },
        viewname: String,
        ready: {
            type: Boolean,
            default: false
        }
    });

    this.pre("save", async function(next){
        try {
            //only hash the password if it is modified or new
            if(!this.isModified("password")) return next();
            console.log(this.password);
            let hashPassword = await bcrypt.hash(this.password, 10);
            this.password = hashPassword;
            return next();
        } catch(err) {
            return next(err);
        }
    })

    this.methods.comparePassword = async function(candidatePassword, next){
        try {
            let isMatch = await bcrypt.compare(candidatePassword, this.password);
            return isMatch;
        } catch(err) {
            return next(err);
        }
    }

}

util.inherits(baseUserSchema, mongoose.Schema);

module.exports = baseUserSchema;
