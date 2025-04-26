const User = require('../models/user.model');//importar el modelo de usuario
const bcrypt = require('bcrypt');//importar bcrypt para encriptar la contraseña

//Exporta la funcion de crear usuario y verifica que el usuario no exista, encripta la contraseña y muestra el mensaje
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email } });//verifica si el usuario existe
        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(
            { nombre, email, password: hashPassword, rol_id, administrador_id});//crea el usuario
        return newUser;
    }
    catch (err) {
        throw new Error(err.message);//si hay un error lo muestra
    }
};

//Exporta la funcion de obtener todos los usuarios por administrador y verifica que los usuarios existan
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
    try{
        const whereClause = { administrador_id };
        if(email){
            whereClause.email = email;
        }
        const user = await User.findAll({ where: whereClause, attributes: { exclude: ['password']}});//obtiene todos los usuarios por administrador
        return user;
    }catch (err){
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }

}

//Exporta la funcion de obtener todos los usuarios por rol y verifica que los usuarios existan
// En services/user.services.js

exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({
            where: { rol_id },
            attributes: { exclude: ['password'] }
        });
        return users;
    } catch (err) {
        throw new Error(err.message); // Lanza el error para que el controlador lo capture
    }
};

//Exporta la funcion de actualizar usuario y verifica que el usuario exista, que el email no este en uso y muestra el mensaje
exports.updateUser = async(id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try{
    const user = await User.findByPk(id);
        if (user.administrador_id != admin_from_token){
            throw new Error('Acceso denegado, este usuario no esta bajo su administracion');
        }

        if (!user){
            throw new Error ('Usuario no encontrado');
        }

        if (email && email !== user.email){
            const userExists = await User.findOne({where:{email}});
            if ( userExists){
                throw new Error('El email ya esta en uso');
            }
        }

        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id,
        });

        return user;
    } catch(err){
        throw new Error(`Error al actualizar el usuario: ${err.message}`)
    }
};

//Exporta la funcion de eliminar usuario y verifica que el usuario exista y muestra el mensaje
exports.deleteUser = async (id, admin_from_token) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.administrador_id !== admin_from_token) {
        throw new Error('Acceso denegado, este usuario no está bajo su administración');
    }

    await user.destroy();
    return { message: 'Usuario eliminado con éxito' };
};
