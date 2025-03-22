const Project = require('../models/project.model');
const projectService = require('../services/project.service');

exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id } = req.body;
        const newProject = await projectService.createProject(nombre, descripcion, fecha_inicio, fecha_fin, administrador_id);
        res.status(201).json({ message: 'Proyecto creado exitosamente', project: newProject });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'Proyectos consultados con exito', projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto consultado con exito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, administrador_id } = req.body;
    try {
        const project = await projectService.updateProject(id, nombre, descripcion, fecha_inicio, fecha_fin, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con exito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await projectService.deleteProject(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message

        });
    }
};

exports.assignUserToProjects = async (req, res) => {
    const { project_id, user_id } = req.body;
    try {
        const result = await projectService.assignUserToProjects(project_id, user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.removeUserFromProjects = async (req, res) => {
    const { project_id, user_id } = req.body;
    try {
        const result = await projectService.removeUserFromProjects(project_id, user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}