const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Leader = require("../../../models/LeadUser");
const { v4: uuidv4 } = require("uuid");

class authController {
  async registration(req, res) {
    const { formData } = req.body;
    const { username, password, firstName, secondName, role, selectedLeader } =
      formData;

    if (!username || !password || !firstName || !secondName || !role) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните все поля" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "Руководитель") {
      const token = jwt.sign({ password }, "secretKey");
      try {
        const user = await Leader.create({
          username,
          password: hashedPassword,
          firstName,
          secondName,
          role,
          token,
        });
        res.status(200).json({ token, user });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ошибка при регистрации пользователя" });
      }
    } else
      try {
        const token = jwt.sign({ password }, "secretKey");
        const user = await User.create({
          username,
          password: hashedPassword,
          firstName,
          secondName,
          role,
          leaderId: selectedLeader,
          token,
        });

        res.status(200).json({ token, user });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ошибка при регистрации пользователя" });
      }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Не все данные указаны" });
    }
    try {
      let user;

      const userFromUserModel = await User.findOne({ where: { username } });
      const userFromLeaderModel = await Leader.findOne({ where: { username } });

      if (userFromUserModel) {
        user = userFromUserModel;
      } else if (userFromLeaderModel) {
        user = userFromLeaderModel;
      } else {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ password }, "secretKey");
        res.status(200).json({ token, user });
      } else {
        return res.status(400).json({ message: "Неверный пароль" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Серверная ошибка при авторизации" });
    }
  }

  async getLeadWorkers(req, res) {
    try {
      const Leaders = await Leader.findAll();
      res.status(200).json(Leaders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при получении задач для струдника" });
    }
  }
  async taskWorker(req, res) {
    const { role, userId } = req.body;
    if (role === "Руководитель") {
      try {
        const responsible = await User.findAll({
          where: { leaderId: userId },
        });
        const userFromUserModel = await Leader.findOne({
          where: { id: userId },
        });
        res.status(200).json([responsible, userFromUserModel]);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ошибка при получении задач для струдника" });
      }
    } else {
      try {
        const userFromUserModel = await User.findOne({ where: { id: userId } });
        console.log(req.body);
        console.log(userFromUserModel);
        res.status(200).json([userFromUserModel]);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Ошибка при получении задач для струдника" });
      }
    }
  }
  async authentication(req, res) {
    const userId = req.params.userId;
    try {
      let user;
      const userFromUserModel = await User.findOne({ where: { id: userId } });
      const userFromLeaderModel = await Leader.findOne({
        where: { id: userId },
      });
      if (userFromUserModel) {
        user = userFromUserModel;
      } else if (userFromLeaderModel) {
        user = userFromLeaderModel;
      } else {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Неправильный токен" });
    }
  }
}

module.exports = { authController: new authController() };
