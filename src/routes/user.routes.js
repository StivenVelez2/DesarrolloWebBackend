const express = require('express');// Importamos express para poder acceder al Router
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middleware/auth.middleware');// Importamos el middleware para autenticar el token
const ROLES = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');

//Rutas de usuario
router.post('/users/create', authenticateToken, checkRole([ROLES.ADMIN]), userController.createUser);// Ruta para crear un usuario
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);// Ruta para actualizar un usuario
router.get('/users/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);// Ruta para obtener todos los usuarios
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);// Ruta para eliminar un usuario
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);// Ruta para obtener todos los usuarios por rol

// Middleware para manejar errores
router.use(errorHandler);

module.exports = router;// Exportamos el router para poder utilizarlo en otros archivos

