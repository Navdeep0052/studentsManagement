const studentModel = require("../models/studentModel")
const validation = require("../validation/validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const aws = require("../Aws/aws")


// Registration API
const createStudent = async function(req,res) {
    try {
        let data = req.body
      let { first_name, last_name, school_name, email, mobile, password } = data;
      let files = req.files

      if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })

      if(!first_name){
        return res.status(400).send({status:false,msg:"first name is mendatory"})
    }
    if (!validation.isValidName(first_name)) return res.status(400).send({ status: false, message: "first name is not valid" })

      if(!last_name){
        return res.status(400).send({status:false,msg:"last is mendatory"})
    }
    if (!validation.isValidName(last_name)) return res.status(400).send({ status: false, message: "last name is not valid" })
      if(!school_name){
        return res.status(400).send({status:false,msg:"name is mendatory"})
    }
    
      if(!email){
        return res.status(400).send({status:false,msg:"em is mendatory"})
    }
    if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
      if(!mobile){
        return res.status(400).send({status:false,msg:"mob is mendatory"})
    }
    if (!validation.isValidPhone(mobile)) return res.status(400).send({ status: false, message: "phone name is not valid" })
      if(!password){
        return res.status(400).send({status:false,msg:"pass is mendatory"})
    }
    if (!validation.isValidPwd(password)) return res.status(400).send({ status: false, message: "password is not valid" })




      // Check if email or mobile already exists
      const emailExists = await studentModel.findOne({ email });
  const mobileExists = await studentModel.findOne({ mobile });
  if (emailExists || mobileExists) {
    return res.status(400).json({ error: 'Email or mobile number already exists' });
  }
    //   }

    if (files && files.length == 0) {
        return res.status(400).send({ msg: "No photo found" })
      }
      let uploadedphoto = await aws.uploadFile(files[0])
      data.photo = uploadedphoto
  
      // Create new student
      
      let savedData = await studentModel.create(data)
      return res.status(201).send({status: true,data:savedData})
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  
const loginStudent = async function(req, res) {
  try {
    let data = req.body
    let { email, password } = data;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if email exists in the database
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token with the student ID
    const token = jwt.sign({ id: student._id }, "key-is-very-secret", { expiresIn: '1m' });

    return res.status(200).json({msg:"login successfully", data:student, token:token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllStudents = async function(req, res) {
  try {
    // Find all students in the database
    const students = await studentModel.find();

    // Return the list of students
    return res.status(200).json({ data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


  module.exports = {createStudent,loginStudent,getAllStudents};