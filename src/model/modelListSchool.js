const db = require("../db");

const modelListSchool = async params => {
  try {
    const { page = 1, pageSize = 20 } = params;

    let totalQuery = `SELECT COUNT(*) AS total FROM listSchool`;

    let query = `SELECT
     listSchool.id,
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

const viewSchool = async id => {
  try {
    const query = `select * from listSchool where id = $1`;
    const queryTeacher = `select * from listSchool_teacher
    join teacher on teacher.listSchool_id = teacher.listSchool_id
    where teacher.listSchool_id = $1`;
    const queryStudent = `select * from studentManagement where listSchool_id = $1`;
    const result = await db.query(query, [id]);
    const resultTeacher = await db.query(queryTeacher, [id]);
    const resultStudent = await db.query(queryStudent, [id]);
    return {
      info: {
        data: result.rows[0],
        teacher: resultTeacher.rows,
        student: resultStudent.rows,
      },
    };
  } catch (error) {
    return error;
  }
};

const addTeacher = async body => {
  try {
    const { teacher_id, listSchool_id, endDate, startDate, role } = body;
    const queryListSchool_teacher = await `select * from listSchool_teacher 
    where teacher_id = $1
    `;
    const resultqueryListSchool_teacher = await db.query(queryListSchool_teacher, [teacher_id]);
    if (resultqueryListSchool_teacher?.rows?.length > 0) {
      return { errorCode: 1, messenger: "teacher was in class" };
    } else {
      const query =
        await "INSERT INTO listSchool_teacher (teacher_id, listSchool_id, endDate,startDate,role) VALUES ($1, $2, $3, $4, $5)";
      const values = [teacher_id, listSchool_id, endDate, startDate, role];

      const resultqueryQueryInsert = await db.query(query, values);
      return resultqueryQueryInsert.rows;
    }
  } catch (error) {
    return error;
  }
};

const deleteTeacher = async id => {
  try {
    const query = `delete from listSchool_teacher where teacher_id = ${id}`;
    const resultqueryQueryInsert = await db.query(query);
    return resultqueryQueryInsert;
  } catch (error) {
    return error;
  }
};

const postSchool = async body => {
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
      price
    } = body.data;
    const query = `insert into listSchool(nameSchool,subject,methodStudy,ageSchool,numberSchool,timeMinute,studyTime,declarationDate,minNumber,maxNumber,description,price)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
`;
    const values = [
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
      price
    ];
    const resultqueryQueryInsert = await db.query(query, values);
    return resultqueryQueryInsert;
  } catch (error) {}
};

module.exports = {
  modelListSchool,
  modelUpdate,
  exportExcel,
  viewSchool,
  addTeacher,
  deleteTeacher,
  postSchool,
};
