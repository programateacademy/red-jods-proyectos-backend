const projectModel = require("../models/project");

const getProjects = async (req, res) => {
  try {
    const listAll = await projectModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const one = await projectModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const getProjectContainTitle = async (req, res) =>  {
 const entrada =req.params.title;
  try {
    const one = await projectModel.find({title: { $regex: entrada, $options: 'i' } });
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
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

const updateProject = async (req, res) => {
  try {
    const resUpdate = await projectModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(resUpdate);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
  return false;
};

const updateProjectState = async (req, res) => {
  const id = req.params.id;
  const state = req.body.state;
  projectModel.findById(id, (err, project) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el producto" });
    }

    if (!project) {
      return res.status(404).json({ error: "El project no existe" });
    }

    project.state = state;
    project.save((err, projectActualizado) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al actualizar el project" });
      }

      res.json(projectActualizado);
    });
  });
};


module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectState,
  getProjectContainTitle,
};
