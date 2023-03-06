const projectModel = require('../models/project')

const getProjects = async (req, res) => {
  try {
    const listAll = await projectModel.find({})
     res.status(200).json(listAll);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}

const getProjectById = async(req, res) => {
  try {
    const one = await projectModel.findById(req.params.id);
    res.status(200).json(one);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}

const createProject = async (req, res) => {
  try {
    const resDetail = await projectModel.create(req.body);
    res.status(200).json(resDetail);
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}


const updateProject = async (req, res) => {
  try {
    const resUpdate = await projectModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json(resUpdate);
  } catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
  }
  return false;
}

const updateProjectState = async (req, res) => {
  try {
    const resDetail = await projectModel.findOneAndRemove({ _id: req.body.id });
    res.status(200);
    res.send("Eliminado Exitosamente");
} catch (e) {
    res.status(500)
    res.send({ error: 'Algo ocurrio' })
}
}
module.exports = { getProjects, getProjectById, createProject,updateProject, updateProjectState }