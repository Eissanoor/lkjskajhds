const mongoose = require("mongoose")
 mongoose.connect("mongodb://localhost:27017/Crud", {
    // useCreateIndex:true,
     useNewUrlParser:true,
     useUnifiedTopology:true
 }).then (()=>{
     console.log("good ho gaya");
 }).catch((e)=>{
    console.log("Error not good");
})
