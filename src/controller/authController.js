const bcrypt = require("bcryptjs");
const model = require("../model/auth");

exports.login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  const resultLogin = await model.login(phoneNumber, password);

  if (resultLogin.errCode === 1) {
    res.send("User not found");
  } else if (resultLogin.errCode === 2) {
    res.send("Wrong password");
  }
  return res.status(200).json({
    status: 200,
    phoneNumber: resultLogin.phonenumber,
    role: resultLogin.role,
    fullName: resultLogin.fullname,
  });
};

exports.register = async (req, res) => {
  try {
    const { fullName, phoneNumber, password } = req.body;
    if (!fullName) {
      res.status(404).json({ message: "FullName is not null" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await model.register(fullName, phoneNumber, hashedPassword);
    await res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      errCode: 0,
      message: "Error registering user",
    });
  }
};
