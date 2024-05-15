const db = require("../db");

const modelListSchool = async params => {
  try {
    const { page = 1, pageSize = 20 } = params;

    let totalQuery = `SELECT COUNT(*) AS total FROM listSchool`;
    
    let query = `SELECT
      listSchool.nameSchool,
      listSchool.ageSchool,
      listSchool.statusSchool,
      listSchool.declarationdate,
      listSchool.numberSchool,
      COALESCE(counts.count_listSchool_id, 0) AS count_listSchool_id
    FROM
      listSchool
    LEFT JOIN (
      SELECT
        listSchool_id,
        COUNT(*) AS count_listSchool_id
      FROM
        studentManagement
      GROUP BY
        listSchool_id
    ) AS counts ON listSchool.id = counts.listSchool_id`;

    const conditions = [];
    if (params.statusSchool) {
      conditions.push(`statusSchool = '${params.statusSchool}'`);
    }
    if (params.ageSchool) {
      conditions.push(`ageSchool LIKE '%${params.ageSchool}%'`);
    }
    if (params.nameSchool) {
      conditions.push(`nameSchool LIKE '%${params.nameSchool}%'`);
    }
    if (conditions.length > 0) {
      const whereClause = " WHERE " + conditions.join(" AND ");
      query += whereClause;
      totalQuery += whereClause;
    }

    const skip = (page - 1) * pageSize;
    query += ` LIMIT ${pageSize} OFFSET ${skip}`;

    const totalResult = await db.query(totalQuery);
    const total = totalResult.rows[0].total;

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

const viewSchool = async (id) => {
  try {
    const query = `select * from listSchool where id = $1`;
    const queryTeacher = `select * from teacher where listSchool_id = $1`;
    const queryStudent = `select * from studentManagement where listSchool_id = $1`;
    const result = await db.query(query, [id]);
    const resultTeacher = await db.query(queryTeacher, [id]);
    const resultStudent = await db.query(queryStudent, [id]);
    return {
      info :result.rows[0],
      teacher: resultTeacher.rows,
      student:resultStudent.rows
    };

  } catch (error) {
    return error

  }
};

const addTeacher = (id)=>{
  try {
    
  } catch (error) {
    return error
  }
}

module.exports = {
  modelListSchool,
  modelUpdate,
  exportExcel,
  viewSchool,
  addTeacher
};
