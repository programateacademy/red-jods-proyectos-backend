// const {httpErro} require=('../helpers/handleBcrypt.js')
/**metodos y funciones post get put delete busqueda */
const userModel = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const listAll = await userModel.find({})
     res.status(200).json(listAll);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}

const getUserById = async(req, res) => {
  try {
    const one = await userModel.findById(req.params.id);
    res.status(200).json(one);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}

const createUser = async (req, res) => {
  try {
    const resDetail = await userModel.create(req.body);
    res.status(200).json(resDetail);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}


const updateUser = async (req, res) => {
  try {
    const resUpdate = await userModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(resUpdate);
  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
  return false;
}
/**pendiente a modificar */
const updateUserState = async (req, res) => {
  try {
    const resUpdate = await userModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(resUpdate);
  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
  return false;
} 

module.exports = { getUsers, getUserById, createUser, updateUser, updateUserState}