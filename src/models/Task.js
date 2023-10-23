const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Средний",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "К выполнению",
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdId: {
    type: DataTypes.UUID,
  },
  responsible: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadLine: {
    type: DataTypes.DATE,
  },
});

module.exports = Task;
