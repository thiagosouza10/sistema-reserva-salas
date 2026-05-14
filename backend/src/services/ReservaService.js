const prisma = require('../database/prisma');
const validateReserva = require('../validators/reservaValidator');

class ReservaService {
    async create(data) {
        const {
            sala,
            responsavel,
            data: dataReserva,
            horaInicio,
            horaFim,
            participantes
        } = data;

        // VALIDAR DADOS
        validateReserva(data);

        // VALIDAR CONFLITO
        const conflitoReserva = await prisma.reserva.findFirst({
            where: {
                sala,
                data: dataReserva,
                status: 'ATIVA',
                AND: [
                    {
                        horaInicio: {
                            lt: horaFim
                        }
                    },
                    {
                        horaFim: {
                            gt: horaInicio
                        }
                    }
                ]
            }
        });

        if (conflitoReserva) {
            const error = new Error('Sala já reservada nesse horário');
            error.status = 409;
            throw error;
        }

        // CRIAR RESERVA
        return prisma.reserva.create({
            data: {
                sala,
                responsavel,
                data: dataReserva,
                horaInicio,
                horaFim,
                participantes
            }
        });
    }

    async update(id, data) {
        const {
            sala,
            responsavel,
            data: dataReserva,
            horaInicio,
            horaFim,
            participantes
        } = data;

        if (!id) {
            const error = new Error('ID da reserva é obrigatório');
            error.status = 400;
            throw error;
        }

        const reservaExistente = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reservaExistente) {
            const error = new Error('Reserva não encontrada');
            error.status = 404;
            throw error;
        }

        if (reservaExistente.status === 'CANCELADA') {
            const error = new Error('Não é permitido atualizar reserva cancelada');
            error.status = 400;
            throw error;
        }

        validateReserva(data);

        const conflitoReserva = await prisma.reserva.findFirst({
            where: {
                id: { not: id },
                sala,
                data: dataReserva,
                status: 'ATIVA',
                AND: [
                    {
                        horaInicio: { lt: horaFim }
                    },
                    {
                        horaFim: { gt: horaInicio }
                    }
                ]
            }
        });

        if (conflitoReserva) {
            const error = new Error('Sala já reservada nesse horário');
            error.status = 409;
            throw error;
        }

        return prisma.reserva.update({
            where: { id },
            data: {
                sala,
                responsavel,
                data: dataReserva,
                horaInicio,
                horaFim,
                participantes
            }
        });
    }

    async delete(id) {
        if (!id) {
            const error = new Error('ID da reserva é obrigatório');
            error.status = 400;
            throw error;
        }

        const reservaExistente = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reservaExistente) {
            const error = new Error('Reserva não encontrada');
            error.status = 404;
            throw error;
        }

        await prisma.reserva.delete({
            where: { id }
        });

        return;
    }

    async index(filters) {
        const { sala, responsavel } = filters;

        const where = {};

        if (sala) {
            where.sala = {
                contains: sala,
                mode: 'insensitive'
            };
        }

        if (responsavel) {
            where.responsavel = {
                contains: responsavel,
                mode: 'insensitive'
            };
        }

        return prisma.reserva.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async show(id) {
        if (!id) {
            const error = new Error('ID da reserva é obrigatório');
            error.status = 400;
            throw error;
        }

        const reserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reserva) {
            const error = new Error('Reserva não encontrada');
            error.status = 404;
            throw error;
        }

        return reserva;
    }

    async options() {
        const reservas = await prisma.reserva.findMany({
            select: {
                sala: true,
                responsavel: true
            }
        });

        const salasSet = new Set();
        const responsaveisSet = new Set();

        reservas.forEach((r) => {
            if (r.sala) salasSet.add(r.sala);
            if (r.responsavel) responsaveisSet.add(r.responsavel);
        });

        return {
            salas: Array.from(salasSet),
            responsaveis: Array.from(responsaveisSet)
        };
    }
}

module.exports = new ReservaService();