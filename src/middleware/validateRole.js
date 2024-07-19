export const validateRole = (req, res, next) => {
  const { user } = req.headers;
  if (user.role !== "admin") {
    return res.json({ message: "Unauthorized" });
  }
  return next();
};
