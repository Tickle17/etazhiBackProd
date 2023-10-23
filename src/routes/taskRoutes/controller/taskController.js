const Task = require("../../../models/Task");
const User = require("../../../models/User");

class taskController {
  async createTask(req, res) {
    const {
      title,
      description,
      priority,
      status,
      createdBy,
      responsible,
      responsibleId,
      deadLine,
      userRole,
      userId,
    } = req.body;
    console.log(title, description, priority, status, createdBy);
    try {
      if (userId === responsibleId && userRole === "Руководитель") {
        const task = await Task.create({
          title,
          description,
          priority,
          status,
          createdBy,
          responsible,
          leaderId: userId,
          deadLine,
        });
        res.status(200).json(task);
      } else if (userRole === "Руководитель") {
        const task = await Task.create({
          title,
          description,
          priority,
          status,
          createdBy,
          responsible,
          leaderId: userId,
          userId: responsibleId,
          deadLine,
        });
        res.status(200).json(task);
      } else {
        const user = await User.findOne({ where: { id: userId } });
        const task = await Task.create({
          title,
          description,
          priority,
          status,
          createdBy,
          responsible,
          createdId: userId,
          userId: responsibleId,
          deadLine,
          leaderId: user.leaderId,
        });
        res.status(200).json(task);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при создании задачи" });
    }
  }
  async updateTask(req, res) {
    const taskId = req.params.taskId;
    const updatedTask = req.body;

    try {
      const updatedRows = await Task.update(updatedTask, {
        where: { id: taskId },
      });
      console.log(updatedRows);
      if (updatedRows > 0) {
        res.status(200).json({ message: "Задача успешно обновлена" });
      } else {
        res.status(404).json({ error: "Задача не найдена" });
      }
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      res.status(500).json({ error: "Ошибка на сервере" });
    }
  }
  async getLeaderTasks(req, res) {
    const leaderId = req.params.leaderId;
    console.log(leaderId);
    try {
      const tasks = await Task.findAll({ where: { leaderId: leaderId } });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при получении задач для руководителя" });
    }
  }
  async getUserTasks(req, res) {
    const userId = req.params.userId;
    try {
      const tasks = await Task.findAll({ where: { userId } });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при получении задач для руководителя" });
    }
  }
}

module.exports = { taskController: new taskController() };
