const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo de la tabla de la base de datos
const UserProject = sequelize.define('usuarios_proyectos', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'usuarios', key: 'id' } 
    },
    proyecto_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'proyectos', key: 'id' } 
    }
}, {// Definir opciones del modelo
    timestamps: false,
    tableName: 'usuarios_proyectos'
});

module.exports = UserProject;

