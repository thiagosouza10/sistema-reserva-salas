const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Sistema Reserva Salas',
            version: '1.0.0',
            description: 'API para gerenciamento de reservas de salas'
        },
        servers: [
            {
                url: 'http://localhost:3333'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;