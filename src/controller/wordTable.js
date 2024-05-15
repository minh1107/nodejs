const model = require("../model/modelWorkTable");


exports.workTable = async (req, res) => {
  try {
  const result = await model.workTable();
  res.status(200).json({
    status: 200,
    message: "success",
    details: result,
  });
  } catch (error) {
    res.status(500).json({
      status:500,
      message:"error",
      
    })
  }
};