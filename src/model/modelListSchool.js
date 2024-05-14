const db = require("../db");

const modelListSchool = async (params) => {
  try {
    const { page = 1, pageSize = 20 } = params;
    let totalQuery = `SELECT COUNT(*) FROM listSchool`;
    let query = `SELECT id, nameSchool, ageSchool, statusSchool, declarationdate, numberSchool FROM listSchool`;
    const conditions = [];
    if (params.statusSchool) {
      conditions.push(`statusSchool = ${params.statusSchool}`);
    }
    if (params.ageSchool) {
      conditions.push(`ageSchool = '${params.ageSchool}'`);
    }
    if (params.nameSchool) {
      conditions.push(`nameSchool LIKE '%${params.nameSchool}%'`);
    }
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
      totalQuery += " WHERE " + conditions.join(" AND ");
    }
    const skip = (page - 1) * pageSize;
    query += ` LIMIT ${pageSize} OFFSET ${skip}`;
    const totalResult = await db.query(totalQuery);
    const total = totalResult.rows[0].count;
    const result = await db.query(query);
    const numberOfPages = Math.ceil(total / pageSize);
    return { result: result.rows, totalPages: numberOfPages };
  } catch (error) {
    return error;
  }
};


const modelUpdate = async (nameSchool, ageSchool, methodStudy, minNumber, description, subject, id) => {
  try {
    const query = `
     UPDATE listSchool
     SET nameschool = $1, ageschool = $2, methodStudy = $3, minNumber = $4, description = $5,
     subject= $6
     WHERE id = $7 `;
    const values = [nameSchool, ageSchool, methodStudy, minNumber, description, subject, id];
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const exportExcel = async () => {
  const query = `select * from listSchool`;
  const result = await db.query(query);
  return result;
};

const viewSchool = async id => {
  try {
    const query = `select * from listSchool
    join studentManagement on studentManagement.listSchool_id = listSchool.id
     where listSchool.id = $1`;
    const result = await db.query(query, [id]);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const postSchool = async req => {
  try {
    const {
      nameSchool,
      subject,
      methodStudy,
      ageSchool,
      numberSchool,
      timeMinute,
      studyTime,
      declarationDate,
      minNumber,
      maxNumber,
      description,
      price,
    } = req;
    const ageSchoolJSON = JSON.stringify(ageSchool);

    const query = `insert into listSchool(nameSchool,subject,methodStudy,ageSchool,numberSchool,
    timeMinute,studyTime,declarationDate,minNumber,maxNumber,description,price
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `;
    const values = [
      nameSchool,
      subject,
      methodStudy,
      ageSchoolJSON,
      numberSchool,
      timeMinute,
      studyTime,
      declarationDate,
      minNumber,
      maxNumber,
      description,
      price,
    ];
    const result = await db.query(query, values);
    return result;
  } catch (error) {
    return error;
  }
};
 const addTeacher = (id)=>{
  try {
    const query = ``
  } catch (error) {
    
  }
 }
 
module.exports = {
  modelListSchool,
  modelUpdate,
  exportExcel,
  viewSchool,
  postSchool,
};
