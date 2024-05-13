const db = require("../db");

const register = async (fullName, hashedPhoneNumber, hashedPassword) => {
  try {
    console.log(fullName)
    // await db.query(`INSERT INTO users (fullName, phoneNumber, password)
    //        VALUES (${fullName}, ${hashedPhoneNumber}, ${hashedPassword})`);
  } catch (error) {
    return error;
  }
};

module.exports = {
  register,
};
