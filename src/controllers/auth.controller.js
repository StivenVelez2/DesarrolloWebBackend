const authServices = require('../services/auth.services');

// Registro de usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authServices.loginUser(email, password);//se crea el token
        res.status(200).json({ message: 'Inicio de sesion exitoso', token });
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { nombre, email, password, rol_id, administrador_id } = req.body;
    try {
        const user = await authServices.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado exitosamente', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
