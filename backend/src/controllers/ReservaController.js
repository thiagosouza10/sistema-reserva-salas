const reservaService = require('../services/ReservaService');

class ReservaController {
    async create(req, res) {
        try {
            const reserva = await reservaService.create(req.body);
            return res.status(201).json(reserva);
        } catch (error) {
            return res.status(error.status || 400).json({
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const reserva = await reservaService.update(req.params.id, req.body);
            return res.status(200).json(reserva);
        } catch (error) {
            return res.status(error.status || 400).json({
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            await reservaService.delete(req.params.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.status || 400).json({
                message: error.message
            });
        }
    }

    async index(req, res) {
        try {
            const reservas = await reservaService.index(req.query);
            return res.status(200).json(reservas);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async show(req, res) {
        try {
            const reserva = await reservaService.show(req.params.id);
            return res.status(200).json(reserva);
        } catch (error) {
            return res.status(error.status || 500).json({
                message: error.message
            });
        }
    }

    async options(req, res) {
        try {
            const data = await reservaService.options();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = new ReservaController();