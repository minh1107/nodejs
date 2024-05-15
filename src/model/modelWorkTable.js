const db = require("../db");

const workTable = async params => {
  try {
    const { page = 1, pageSize = 20 } = params;
    let query = `select * from teacher
    join listSchool on listSchool.id = teacher.listSchool_id`;
    let totalQuery = `select COUNT(*) from teacher
    join listSchool on listSchool.id = teacher.listSchool_id`;
    if (params.name) {
      query += ` where name LIKE '%${params.name}%'`;
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

const exportssWork = async () => {
  try {
    const query = `select * from teacher
    join listSchool on listSchool.id = teacher.listSchool_id`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    return error;
  }
};

module.exports = {
  workTable,
  exportssWork,
};
