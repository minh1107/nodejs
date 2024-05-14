const model = require("../model/modelListSchool");
const ExcelJS = require("exceljs");

exports.listSchool = async (req, res) => {
  const resultLogin = await model.modelListSchool(req.body);

  res.status(200).json({
    status: 200,
    message: "success",
    ...resultLogin,
  });
};

exports.update = async (req, res) => {
  try {
    const { id } = req.query;
    const { nameSchool, ageSchool, methodStudy, minNumber, description, subject } = req.body;
    await model.modelUpdate(nameSchool, ageSchool, methodStudy, minNumber, description, subject, id);
    res.status(200).json({ message: "School updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.exportExcel = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  worksheet.columns = [
    { header: "Id", key: "id", width: 10 },
    { header: "School Name", key: "nameschool", width: 32 },
    { header: "Age School", key: "ageschool", width: 15 },
    { header: "Status School", key: "statusschool", width: 15 },
    { header: "Declaration Date", key: "declarationdate", width: 15 },
    { header: "Number School", key: "numberschool", width: 15 },
    { header: "User Id", key: "user_id", width: 15 },
    { header: "Method Study", key: "methodstudy", width: 15 },
    { header: "Min Number", key: "minnumber", width: 15 },
    { header: "Description", key: "description", width: 32 },
    { header: "Subject", key: "subject", width: 32 },
  ];

  const resultExcel = await model.exportExcel();
  resultExcel?.rows?.forEach(item => {
    worksheet.addRow(item);
  });
  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=MySheet.xlsx");

  res.send(buffer);
};

exports.viewSchool = async (req, res) => {
  const { id } = req.query;
  const result = await model.viewSchool(id);

  res.status(200).json({
    status: 200,
    message: "success",
    details: result,
  });
};

exports.postSchool = async (req, res) => {
  try {
    const result = await model.postSchool(req.body);
    
   if(result?.rows.length >=0){
     res.status(200).json({
       status: 200,
       message: "success",
       data: result.rows,
     });
   } else{
    res.status(404).json({
      status: 404,
      message: "error",
      data: result,
    });
   }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};


exports.addTeacher = async(req, res) =>{
  try {
    const {id} = req.body
    const result = await model.addTeacher(id);
    console.log(result)
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error",
    });
  }

}