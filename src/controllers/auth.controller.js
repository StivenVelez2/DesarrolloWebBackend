const authServices = require('../services/auth.services');

// Registro de usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Email: ', email);
        console.log('Password: ', password);
        const token = await authServices.loginUser(email, password);//se crea el token
        console.log('Token generado: ', token);
        res.status(200).json({ message: 'Inicio de sesion exitoso', token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Registro de usuario
exports.createUser = async (req, res) => {
    const { nombre, email, password, rol_id, administrador_id } = req.body;
    try {
        const user = await authServices.createUser(nombre, email, password, rol_id, administrador_id);//se crea el usuario
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
