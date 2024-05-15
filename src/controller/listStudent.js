const model = require("../model/modelListStudent");
const ExcelJS = require("exceljs");

exports.listStudent = async (req, res) => {
  const resultStudent = await model.listStudent(req.body);
  res.status(200).json({
    status: 200,
    message: "success",
    ...resultStudent,
  });
};

exports.viewStudent = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await model.viewStudent(id);
    res.status(200).json({
      status: 200,
      message: "success",
      details: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

exports.expostStudent = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "School Name", key: "nameschool", width: 32 },
      { header: "Age School", key: "ageschool", width: 15 },
      { header: "Status School", key: "statusschool", width: 15 },
      { header: "Declaration Date", key: "declarationdate", width: 15 },
      { header: "Number School", key: "numberschool", width: 15 },
      { header: "Method Study", key: "methodstudy", width: 15 },
      { header: "Min Number", key: "minnumber", width: 15 },
      { header: "Description", key: "description", width: 32 },
      { header: "Subject", key: "subject", width: 32 },
      { header: "Max Number", key: "maxnumber", width: 15 },
      { header: "Time Minute", key: "timeminute", width: 15 },
      { header: "Price", key: "price", width: 15 },
      { header: "Study Time", key: "studytime", width: 32 },
    ];

    const resultExcel = await model.exportss();
    resultExcel?.forEach(item => {
      worksheet.addRow(item);
    });
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=MySheet.xlsx");

    res.send(buffer);
  } catch (error) {
    return error;
  }
};
