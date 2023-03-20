
const userModel = require("../models/user");
const { encrypt } = require("../helpers/handleBcrypt");

const getUsers = async (req, res) => {
  try {
    const listAll = await userModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const getUserById = async (req, res) => {
  try {
    const one = await userModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const getUserByName = async (req, res) => {
  try {
    const one = await userModel.find({ name: req.params.name });
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const createUser = async (req, res) => {
  try {
    //TODO: Datos que envias desde el front (postman)
    const { name, last_name, email, password, phone, role, state } = req.body;
    const passwordHash = await encrypt(password); //TODO: (123456)<--- Encriptando!!
    const registerUser = await userModel.create({
      name,
      last_name,
      email,
      phone,
      role,
      state,
      password: passwordHash,
    });
    res.status(200);
    res.send({ data: registerUser });

  } catch (e) {
    res.status(500);
    res.send({ error: "Correo Ya Existente" });
  }
};

const updateUser = async (req, res) => {
  const { name, last_name, email, phone, role, state } = req.body;
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

const updateUserState = async (req, res) => {
  const id = req.params.id;
  const state = req.body.state;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserState,
  getUserByName,
};
