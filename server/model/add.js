const mongoose=require("mongoose");
const validator = require("validator");

const addnewSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
    },
   gender:String,
})
/////colletion
const Addnew = new mongoose.model("Addnew",addnewSchema );

module.exports=Addnew;