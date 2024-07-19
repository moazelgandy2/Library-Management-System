import User from "../../../db/model/user.model.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const newUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const requiredFields = ["userName", "email", "password"];

  if (!userName || !email || !password) {
    return res.json({ message: `All fields are required`, requiredFields });
  }
  try {
    const existUser = await User.findOne({ where: { email } });
    if (existUser) return res.json({ message: "User already exists" });
  } catch (error) {
    return res.json({ message: "Unable to find user", error });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const userData = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    userData.password = undefined;
    return res.json({ message: "User created successfully", userData });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Unable to create user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const requiredFields = ["email", "password"];

  if (!email || !password) {
    return res.json({ message: `All fields are required`, requiredFields });
  }

  const userData = await User.findOne({ where: { email } });
  if (!userData) {
    return res.json({ message: "User not found" });
  }

  const passwordIsValid = bcrypt.compareSync(password, userData.password);
  if (!passwordIsValid) {
    return res.json({ message: "Invalid password" });
  }
  userData.password = undefined;
  const token = await jsonwebtoken.sign(
    { id: userData.id, role: userData.role, email: userData.email },
    "secret"
  );
  try {
    User.update({ token }, { where: { email } });
    return res.json({ message: "Login successful", token });
  } catch (error) {
    return res.json({ message: "Unable to update token", error });
  }
};

export { login, newUser };
