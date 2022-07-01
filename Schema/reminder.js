var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reminderSchema = new Schema({
    Username: {
        type : String,
        required: true,
        unique : true 
    },
    Reminder:[ {
        Text: {
            type : String,
            required: true
        },
        Time: {
            type : Date,
            default: Date.now()
        }, 
        Id: {
            type : Number,
            autoIndex: true
            
        },
        Noted: {
            type : Boolean,
            default: false
            
        }

    }],
});

const reminder = new mongoose.model("reminder",reminderSchema);

module.exports = reminder;