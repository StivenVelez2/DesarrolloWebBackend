const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// Definir el modelo de la tabla usuarios
const User = sequelize.define('usuarios', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' }
    }
}, {// Definir opciones del modelo
    timestamps: false,
    tableName: 'usuarios'
});

module.exports = User;
