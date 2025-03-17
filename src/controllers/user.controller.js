const User = require('../models/user.models');
const userService = require('../services/user.services');

//funcion para crear un usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;//se obtienen los datos del usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);//se crea el usuario
        res.status(201).json({ message: 'Usuario creado exitosamente', User: newUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//funcion para obtener todos los usuarios por administrador
exports.getAllUsersByAdministradorId = async (req,res) => {
    try{
        const admin_from_token = req.user.id;//se obtiene el id del administrador
        const { email } = req.query;//se obtiene el email
        const users = await userService.getAllUserByAdministradorId(admin_from_token ,email);//se obtienen los usuarios
        res.status(200).json({ message: 'Usuarios consultados con exito', users});
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los usuarios', error});
    }
};

//funcion para obtener todos los usuarios por rol
exports.getAllUsersByRolId = async (req, res) => {
    try{
        const users = await userService.getAllUsersByRolId(req.params.id);//se obtienen los usuarios
        res.status(200).json({message: 'Usuarios consultados con exito', users})//se envian los usuarios
    }catch (error){
        res.status(500).json({message: 'Error al obtener los usuarios', error});
    }
};

//funcion para actualizar un usuario
exports.updateUser = async(req,res) => {//funcion para actualizar un usuario
    const{id} = req.params;//se obtiene el id del usuario
    const {nombre, email, rol_id, administrador_id} = req.body;//se obtienen los datos del usuario
    const admin_from_token = req.user.id;//se obtiene el id del administrador
    try{
        const user = await userService.updateUser(id, nombre, email,rol_id, administrador_id, admin_from_token);//se actualiza el usuario
        res.status(200).json({message : 'Usuario actualizado con exito', user})
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

//funcion para eliminar un usuario
exports.deleteUser = async (req, res) => {//funcion para eliminar un usuario
    const {id} = req.params;//se obtiene el id del usuario
    const admin_from_token = req.user.id;//se obtiene el id del administrador
    try{
        const result = await userService.deleteUser(id, admin_from_token);//se elimina el usuario
        res.status(200).json(result);
    }catch (err){
        res.status(500).json ({ message: err.message});
    }
};



