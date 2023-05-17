const express = require("express")
const route = express.Router()
const studentController = require("../controllers/studentController")
const assignmentController = require("../controllers/assignmentController")
const auth = require("../middlewares/auth")


route.post("/register",studentController.createStudent)
route.post("/login",studentController.loginStudent)
route.get("/get",studentController.getAllStudents)
route.post("/assignments/:studentId",assignmentController.assignment)
route.get("/getagg",studentController.aggregateStudents)
route.delete("/delete",studentController.deletestudents)
route.get("/getassignment",assignmentController.getassignment)
route.delete("/deleteasm",assignmentController.deleteassignment)



module.exports = route