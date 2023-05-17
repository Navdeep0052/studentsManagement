const AssignmentModel = require("../models/assignmentModel");
const StudentModel = require("../models/studentModel");
const validation = require("../validation/validator")
const aws = require("../Aws/aws");

const assignment = async function(req, res) {
  try {
    const { title, description } = req.body;
    const { studentId } = req.params;
    //const files = req.files

    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    

    if(!title){
      return res.status(400).send({status:false,msg:"title is mendatory"})
  }
  if (!validation.isValidTitle(title)) return res.status(400).send({ status: false, message: "title is not valid" })
    if(!description){
      return res.status(400).send({status:false,msg:"description is mendatory"})
  }
    

    // if (!files || files.length == 0) {
    //   return res.status(400).send({ msg: "No file found" });
    // }

    //const uploadedFile = await aws.uploadFile(files[0]);
    const assignment = new AssignmentModel({
      title,
      description,
      //files: JSON.stringify(files), // Convert files array to a string
      student_id: studentId,
      //files: uploadedFile
    });

    const savedAssignment = await assignment.save();
    res.json(savedAssignment);
  } catch (err) {
    // Log the error to a file or a monitoring service instead of console.error
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getassignment = async function(req, res) {
  try {
    const assignment = await AssignmentModel.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "Student"
        }
      },
      // {
      //   $unwind: {
      //     path: "$Student",
      //   }
      // }
    ]);
    res.status(200).send({ assignment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server error!" });
  }
}


const deleteassignment = async function(req,res){
  try{
  await AssignmentModel.deleteMany({})
  return res.status(200).send({msg:"deleted"})
  }catch(error){
    console.log(error);
    return res.status(500).send({error:"server error"})
  }
}

module.exports = { assignment, getassignment, deleteassignment };
