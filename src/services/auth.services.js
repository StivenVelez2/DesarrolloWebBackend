const jwt = require('jsonwebtoken');//importar libreria jsonweb token para generar token
const bcrypt = require('bcrypt');//importar libreria bcrypt para encriptar contraseñas
const dotenv = require('dotenv');
dotenv.config();//importar libreria dotenv para variables de entorno
const User = require('../models/user.model');//importar los modelos de usuario y roles
const RolePermissions = require('../models/role_permissions.models');//importar los modelos de usuario y roles

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY; //se crea una variable de entorno para la clave secreta

exports.loginUser = async (email, password) => {//funcion para logearse
    try {
        const user = await User.findOne({ where: { email } });//busca el usuario por el email
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);//compara la contraseña ingresada con la contraseña encriptada en la base de datos
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        const rolePermissions = await RolePermissions.findAll({//busca los roles del usuario
            where: { rol_id: user.rol_id },
            atributes: ['permiso_id']
        });

        const permiso = rolePermissions.map(rp => rp.permiso_id);//mapea los permisos del usuario

        //genera el token con la informacion del usuario
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permiso }, 
            SECRET_KEY, 
            { expiresIn: '1h' });

        return token;
    }
    catch (error) {
        throw new Error(error.message || 'Error al iniciara sesion ');//si hay un error lo muestra
    }
};
