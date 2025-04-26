const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const {authenticateToken, checkRole} = require('../middleware/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');

// Define las rutas para los proyectos
router.post('/project/create', authenticateToken,checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/project/update/:id', authenticateToken,checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/project/delete/:id', authenticateToken,checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/project/', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/project/:id', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectById);

// Define las rutas para la asignación de usuarios a proyectos
router.post('/project/associate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.assignUserToProjects);
router.delete('/project/disassociate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.removeUserFromProjects);

router.use(errorHandler);

module.exports = router;
