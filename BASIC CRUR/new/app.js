const express = require("express")
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan")
const bodyparser = require("body-parser");
const path = require("path")
require("./db/coon");
dotenv.config({ path: 'config.env' })
const Addnew = require("./server/model/add");
const { response } = require("express");
const PORT = process.env.PORT || 3000

///// log request
// app.use(morgan('tiny'))

/////////parse request to bodyparser
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))

/// views engine

app.set("view engine", "ejs")

// app.set("views",path.resolve(__dirname, "views/ejs"))

//load assets

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
//css
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.get('/home', (req, res) => {

    Addnew.find(function (err, add){

        res.render("index", {add:add})
        console.log(add);
    })

})
app.get('/add', (req, res) => {

    res.render("add")

})

app.post('/add', async (req, res) => {

    try {
        
        const add = new Addnew({
            username: req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        });
        
        const registered = await add.save();
        console.log(add);
        res.status(201).send("woww! Data update");
    } catch (error) {
        res.status(400).send(error);
    }
})


app.get("/add/:id",function (req,res, add){
console.log(req.params.id);
  Addnew.findById(req.params.id, function(err, add){

      res.status(201).render("update",{add:add} );
  })
  })
  app.post('/add/:id', (req, res) => {

const mybody= {
    username: req.body.username,
    phone:req.body.phone,
    gender:req.body.gender


}
Addnew.findByIdAndUpdate(req.params.id, mybody, function(add){

    res.status(201).send("Updated Your data")

})
})

app.get('/del/:id', (req, res) => {

    
    Addnew.findOneAndDelete(req.params.id, function(){
    
        res.status(201).send("Deleted Your data")
    
    })
    })

app.get('/up', (req, res) => {

    res.render("update")

})








app.listen(PORT, () => {

    console.log("server is running 3000");

})

