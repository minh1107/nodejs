const db = require("../db");

const workTable = async () => {
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
};
