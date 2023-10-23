const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Токен не предоставлен" });
  }
  try {
    const access = jwt.verify(token, "secretKey");
    req.user = access;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Неправильный токен" });
  }
};
