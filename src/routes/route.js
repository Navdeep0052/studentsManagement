const express = require("express")
const route = express.Router()
const studentController = require("../controllers/studentController")
const assignmentController = require("../controllers/assignmentController")
const auth = require("../middlewares/auth")


route.post("/register",studentController.createStudent)
route.post("/login",studentController.loginStudent)
route.get("/get",auth,studentController.getAllStudents)
route.post("/assignments/:studentId",auth,assignmentController.assignment)




module.exports = route