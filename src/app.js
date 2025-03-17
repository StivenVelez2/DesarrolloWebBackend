const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//importar rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes.js');

//configurar rutas
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', projectRoutes);

module.exports = app;