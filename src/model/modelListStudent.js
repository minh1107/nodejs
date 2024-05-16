const db = require("../db");

const listStudent = async params => {
  try {
    let query = `SELECT name,nameschool,status,studentstudy,price,declarationdate,numberSchool
    FROM studentManagement JOIN listSchool ON studentManagement.listSchool_id = listSchool.id`;
    const { page = 1, pageSize = 20 } = params;
    let totalQuery = `SELECT COUNT(*) FROM studentManagement JOIN listSchool ON studentManagement.listSchool_id = listSchool.id`;
    const conditions = [];
    if (params.status) {
      conditions.push(`status = ${params.status}`);
    }
    if (params.name) {
      conditions.push(`name LIKE '%${params.name}%'`);
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
  } catch (error) {}
};

const viewStudent = async id => {
  try {
    const query = `select * from studentManagement
    join listSchool ON studentManagement.listSchool_id = listSchool.id
    where studentManagement.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

const exportss = async () => {
  try {
    const query = `SELECT name,nameschool,status,studentstudy,price,declarationdate,numberSchool 
  FROM studentManagement JOIN listSchool ON studentManagement.listSchool_id = listSchool.id`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    return error;
  }
};


module.exports = {
  listStudent,
  viewStudent,
  exportss,
};
