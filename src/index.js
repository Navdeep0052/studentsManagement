const express = require("express")
//onst bodyParser = require("body-parser")
const mongoose = require("mongoose")
const route  = require("./routes/route")
const multer = require("multer")
const app = express()

const upload = multer();
app.use(upload.any());
app.use(express.json());

mongoose.connect("mongodb+srv://miniblognpis:K7SoUljJXaEqV3A0@cluster0.oxrsqmy.mongodb.net/stud?retryWrites=true&w=majority",{

})
.then(()=>console.log("mongodb is connected"))
.catch(err  => (console.log(err)))

// app.get("/get",function(req,res){
//     res.send("api is working fine")
// })
app.use('/',route)

app.listen(process.env.PORT || 3000, function(){
    console.log("app is running on http://localhost:" + (process.env.PORT || 3000));
})

// studentsmanage

// 2KPd1PXYtCOkIgZV
