const { Router } = require('express');

const ReservaController =
    require('../controllers/ReservaController');

const reservasRoutes = Router();

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Criar uma reserva
 *     tags:
 *       - Reservas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sala:
 *                 type: string
 *               responsavel:
 *                 type: string
 *               data:
 *                 type: string
 *               horaInicio:
 *                 type: string
 *               horaFim:
 *                 type: string
 *               participantes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Conflito de horário
 */

reservasRoutes.post('/', ReservaController.create);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Listar reservas
 *     tags:
 *       - Reservas
 *     responses:
 *       200:
 *         description: Lista de reservas
 */

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Atualizar uma reserva
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sala:
 *                 type: string
 *               responsavel:
 *                 type: string
 *               data:
 *                 type: string
 *               horaInicio:
 *                 type: string
 *               horaFim:
 *                 type: string
 *               participantes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Reserva atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Reserva não encontrada
 *       409:
 *         description: Conflito de horário
 */
reservasRoutes.put('/:id', ReservaController.update);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Deletar uma reserva
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva deletada com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Reserva não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
reservasRoutes.delete('/:id', ReservaController.delete);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Listar reservas
 *     tags:
 *       - Reservas
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Erro interno do servidor
 */
reservasRoutes.get('/', ReservaController.index);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Buscar reserva por ID
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
reservasRoutes.get('/:id', ReservaController.show);

module.exports = reservasRoutes;