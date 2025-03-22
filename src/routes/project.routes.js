const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const {authenticateToken, checkRole} = require('../middleware/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');


router.post('/projects/create', authenticateToken,checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/projects/update', authenticateToken,checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/projects/delete/id', authenticateToken,checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/projects', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/projects/:id', authenticateToken,checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectById);

router.post('/projects/associate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.assignUserToProjects);
router.delete('/projects/disassociate', authenticateToken,checkRole([ROLES.ADMIN]), projectController.removeUserFromProjects);

router.use(errorHandler);

module.exports = router;
