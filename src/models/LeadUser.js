const { Sequelize, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./User");
const Task = require("./Task");

const Leader = sequelize.define("Leader", {
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
Leader.hasMany(User, { foreignKey: "leaderId" });
User.belongsTo(Leader);
Leader.hasMany(Task, { foreignKey: "leaderId" });
Task.belongsTo(Leader);

module.exports = Leader;
