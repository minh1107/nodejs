const model = require("../model/modelListStudent");

exports.listStudent = async (req, res) => {
  const resultStudent = await model.listStudent(req.body);
  res.status(200).json({
    status:200,
    message:"success",
    ...resultStudent
  })
};

exports.viewStudent = async(req, res)=>{
  try {
    const {id} = req.query
  const result = await model.viewStudent(id)
  res.status(200).json({
    status:200,
    message:"success",
    details:result
  })
  } catch (error) {
    res.status(500).json({
      status:500,
      message:"error",
    })
  }
}