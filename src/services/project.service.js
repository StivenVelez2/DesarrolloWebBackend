const Project = require('../models/project.model');
const User = require('../models/user.model'); // Asegúrate de que este modelo exista

// Esta función crea un nuevo proyecto
exports.createProject = async (data) => {
    try {
        const project = await Project.create(data);
        return project;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Esta función obtiene todos los proyectos
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Esta función obtiene un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Esta función actualiza un proyecto por su ID
exports.updateProject = async (id, data) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update(data);
        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Esta función elimina un proyecto por su ID
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

// Esta función asigna usuarios a un proyecto específico
exports.assignUserToProjects = async (projectId, userIds) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('El proyecto no existe');
        }

        const users = await User.findAll({ where: { id: userIds } });
        if (users.length !== userIds.length) {
            throw new Error('No todos los usuarios fueron encontrados');
        }

        await project.addUsuarios(users);
        return await Project.findByPk(projectId, {
            include: [
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
    } catch (err) {
        throw new Error(`Error al asignar usuarios al proyecto: ${err.message}`);
    }
};

// Esta función elimina un usuario de un proyecto específico
exports.removeUserFromProjects = async (projectId, userId) => {
    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('El proyecto no existe');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('El usuario no existe');
        }

        await project.removeUsuario(user);
        return { message: 'Usuario eliminado del proyecto con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar usuario del proyecto: ${err.message}`);
    }
};
