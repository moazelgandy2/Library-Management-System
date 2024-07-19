import jsonwebtoken from "jsonwebtoken";
import User from "../../db/model/user.model.js";

export const validateToken = async (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.json({ message: "Token is required" });
  }
  const decoded = jsonwebtoken.verify(token, "secret");
  if (decoded) {
    const userToken = await User.findOne({ where: { token } });
    if (!userToken) {
      return res.json({ message: "Invalid token" });
    } else {
      req.headers.user = decoded;
      return next();
    }
  } else {
    return res.json({ message: "Invalid token" });
  }
};
