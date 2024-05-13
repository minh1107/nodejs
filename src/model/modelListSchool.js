const db = require("../db");

const modelListSchool = async (params) => {
  try {
    const { page = 1, pageSize = 20 } = params;
    let totalQuery = `SELECT COUNT(*) FROM listSchool JOIN users ON users.id = listSchool.user_id`;
    let query = `SELECT listSchool.id, nameSchool, ageSchool, statusSchool, declarationdate, numberSchool FROM listSchool JOIN users ON users.id = listSchool.user_id`;
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
      query += ' WHERE ' + conditions.join(' AND ');
      totalQuery += ' WHERE ' + conditions.join(' AND ');
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
     WHERE id = $7
      `;
    const values = [
      nameSchool, ageSchool, methodStudy, minNumber, description, subject,
      id
    ];
    const result = await db.query(query,values);
    return result
  } catch (error) {
      console.log(error)
  }

}

const exportExcel = async()=>{
   const query = `select * from listSchool`
   const result = await db.query(query);
   return result 
}

module.exports = {
  modelListSchool,
  modelUpdate,
  exportExcel
};
