const model = require("../model/modelListTeacher");

exports.listTeacher = async (req, res) => {
  try {
    const resultTeacher = await model.listTeacher(req.body);
  res.status(200).json({
    status:200,
    message:"success",
    ...resultTeacher
  })
  } catch (error) {
    res.status(500).json({
      status:500,
      message:"error",
      
    })
  }
};

exports.viewTeacher = async (req,res)=>{
  try {
    const {id} = req.query
    const resultTeacher = await model.viewTeacher(id);
   
    res.status(200).json({
    status:200,
    message:"success",
    details :resultTeacher
  })
  } catch (error) {
    res.status(500).json({
      status:500,
      message:"error",
      
    })
  }
}