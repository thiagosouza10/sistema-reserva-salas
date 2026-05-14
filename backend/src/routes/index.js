const { Router } = require('express');

const reservasRoutes = require('./reservas.routes');

const routes = Router();

routes.use('/reservas', reservasRoutes);

routes.get('/', (request, response) => {
    return response.json({
        message: 'API Sistema Reserva Salas'
    });
});

module.exports = routes;