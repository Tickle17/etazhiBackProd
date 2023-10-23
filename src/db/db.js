const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("etazhidb", "etazhitest", "etazhitest", {
  host: "95.163.233.132",
  dialect: "postgres",
  port: "5432",
});
module.exports = sequelize;
