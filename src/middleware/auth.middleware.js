const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware para autenticar el token JWT
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token recibido:' ,token);

    if (!token) {
        console.log('no se proporciono el token');
        return res.status(401).json({ message: 'Acceso denegado, no se puede proporcionar un token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

// Middleware para verificar el rol del usuario
const checkRole = (role) => {
    return (req, res, next) => {
        const { rol_id} = req.user;

        if (!role.includes(rol_id)) {
            return res.status(403).json({ message: 'Accseso denegado, no tienes permiso para realizar esta accion' });
        }

        next();
    };
};

// Exportar los middleware
module.exports = { authenticateToken, checkRole };