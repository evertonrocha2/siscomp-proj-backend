const userService = require("../services/userService");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, uid, isAdmin } = req.body;
    const user = await userService.createUser(email, password, uid, isAdmin);
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    next(error);
  }
};
//Changes for commit
exports.updateAdminStatus = async (req, res, next) => {
  try {
    const { uid, isAdmin } = req.body;
    await userService.updateAdminStatus(uid, isAdmin);
    res.status(200).json({ message: "Status de admin atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
};
