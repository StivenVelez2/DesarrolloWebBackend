const app = require('./app');
const sequelize = require('./config/db');
const dotenv = require('dotenv');
require('./models/associations');

dotenv.config();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Conectarse a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));

// Sincronizar la base de datos
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});
