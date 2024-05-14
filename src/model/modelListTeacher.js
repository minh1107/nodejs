const db = require("../db");

const listTeacher = async (params)=> {
  try {
    let query = `SELECT name, status FROM teacher`;
    const { page = 1, pageSize = 20 } = params;
    let totalQuery = `SELECT COUNT(*) FROM teacher`;
    const conditions = [];
    if (typeof params.status === 'number') {
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

 const viewTeacher = async(id)=> {
  try {
    const query = `select * from teacher
    join listSchool on listSchool.id = teacher.listSchool_id
    where teacher.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows;
  } catch (error) {
    return error;
  }

 }

module.exports  = {
  listTeacher,
  viewTeacher
}