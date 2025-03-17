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
