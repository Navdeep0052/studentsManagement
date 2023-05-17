const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  school_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set(manage) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(manage, salt);
      return hashedPassword;
    },
  },
  age: {
    type: Number,
    required: true,
  },
  studentinfo : {
    type : [{
      roll: {
       type : Number,
       required : true,
      },
      subjects : {
        type : String,
        required : true
      },
      gender : {
        type : String,
        required : true
      },
    }],
    required : true,
  }
  // photo: {
  //   type: String,
  //   required: true
  // }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
