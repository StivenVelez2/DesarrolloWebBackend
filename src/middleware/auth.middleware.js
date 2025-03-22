const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.header['authorization']?.split(' ')[1];

    if (!token) {
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

const checkRole = (role) => {
    return (req, res, next) => {
        const { rol_id} = req.user;

        if (!role.includes(rol_id)) {
            return res.status(403).json({ message: 'Accseso denegado, no tienes permiso para realizar esta accion' });
        }

        next();
    };
};

module.exports = { authenticateToken, checkRole };