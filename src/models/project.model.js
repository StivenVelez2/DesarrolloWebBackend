const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo de la tabla de proyectos
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false},
    fecha_creacion: { 
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'id' }
        }
},{
    timestamps: false,
    tableName: 'proyectos',
    hooks: {
        afterCreate: (project, options) => {//restar 5 horas a la fecha de creación
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project;
