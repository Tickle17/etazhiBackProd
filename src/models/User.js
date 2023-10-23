const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../db/db");
const Task = require("./Task");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
});
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User);

module.exports = User;
