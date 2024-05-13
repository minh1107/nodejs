const db = require("../db");
const bcrypt = require("bcryptjs");

const register = async (fullName, hashedPhoneNumber, hashedPassword) => {
  try {
    const checkQuery = "SELECT * FROM users WHERE phoneNumber = $1";
    const checkResult = await db.query(checkQuery, [hashedPhoneNumber]);
    if (checkResult.rows.length > 0) {
      throw new Error("Phone number already exists");
    }

    const query = "INSERT INTO users (fullName, phoneNumber, password) VALUES ($1, $2, $3)";
    const result = await db.query(query, [fullName, hashedPhoneNumber, hashedPassword]);
    return result;
  } catch (error) {
    return error;
  }
};

const login = async (phoneNumber, password) => {
  try {
    const userQuery = "SELECT * FROM users WHERE phonenumber = $1";
    const userResult = await db.query(userQuery, [phoneNumber]);
    const user = userResult.rows[0];

    if (!user) {
      return({
        errCode: 1,
        message: "User not found",
      });
    }
   
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return({
        errCode: 2,
        message: "Phone",
      });
    }

    return user;
  } catch (error) {
    return error;
  }
};


module.exports = {
  register,
  login
};
