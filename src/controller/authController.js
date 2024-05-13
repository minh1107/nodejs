const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const model = require("../model/auth");

const user = {
  username: "user1",
  password: "$2a$10$Qvg6GCYl6e4Fdzr8u4/cbO3N0GeR/3k3g3h9xU7khy/dObWVpte4u", // bcrypt hash of the password 'password'
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

exports.register = async (req, res) => {
  const { fullName, phoneNumber, password } = req.query;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedPhoneNumber = bcrypt.hashSync(phoneNumber, 10);
  console.log(fullName)
  try {
    const resultRegister = await model.register(fullName, hashedPhoneNumber, hashedPassword);
    res.status(201).json({ message: "User registered successfully", resultRegister });
    res.send("ggg");
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
console.log(req)
};
