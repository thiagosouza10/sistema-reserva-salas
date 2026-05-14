const prisma = require('../database/prisma');

const validateReserva = require(
    '../validators/reservaValidator'
);

class ReservaController {
    async create(request, response) {
        try {
            const {
                sala,
                responsavel,
                data,
                horaInicio,
                horaFim,
                participantes
            } = request.body;

            // VALIDAR DADOS
            validateReserva(request.body);

            // VALIDAR CONFLITO
            const conflitoReserva =
                await prisma.reserva.findFirst({
                    where: {
                        sala,
                        data,
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
                return response.status(409).json({
                    message:
                        'Sala já reservada nesse horário'
                });
            }

            // CRIAR RESERVA
            const reserva =
                await prisma.reserva.create({
                    data: {
                        sala,
                        responsavel,
                        data,
                        horaInicio,
                        horaFim,
                        participantes
                    }
                });

            return response.status(201).json(reserva);

        } catch (error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            const {
                sala,
                responsavel,
                data,
                horaInicio,
                horaFim,
                participantes
            } = request.body;

            // VALIDAR ID
            if (!id) {
                return response.status(400).json({
                    message: 'ID da reserva é obrigatório'
                });
            }

            // BUSCAR RESERVA
            const reservaExistente =
                await prisma.reserva.findUnique({
                    where: {
                        id: id
                    }
                });

            // VALIDAR EXISTÊNCIA
            if (!reservaExistente) {
                return response.status(404).json({
                    message: 'Reserva não encontrada'
                });
            }

            // VALIDAR STATUS
            if (
                reservaExistente.status ===
                'CANCELADA'
            ) {
                return response.status(400).json({
                    message:
                        'Não é permitido atualizar reserva cancelada'
                });
            }

            // VALIDAR DADOS
            validateReserva(request.body);

            // VALIDAR CONFLITO
            const conflitoReserva =
                await prisma.reserva.findFirst({
                    where: {
                        id: {
                            not: id
                        },
                        sala,
                        data,
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
                return response.status(409).json({
                    message:
                        'Sala já reservada nesse horário'
                });
            }

            // ATUALIZAR RESERVA
            const reservaAtualizada =
                await prisma.reserva.update({
                    where: {
                        id: id
                    },
                    data: {
                        sala,
                        responsavel,
                        data,
                        horaInicio,
                        horaFim,
                        participantes
                    }
                });

            return response.status(200).json(
                reservaAtualizada
            );

        } catch (error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;

            // VALIDAR ID
            if (!id) {
                return response.status(400).json({
                    message: 'ID da reserva é obrigatório'
                });
            }

            // BUSCAR RESERVA
            const reservaExistente =
                await prisma.reserva.findUnique({
                    where: {
                        id: id
                    }
                });

            // VALIDAR EXISTÊNCIA
            if (!reservaExistente) {
                return response.status(404).json({
                    message: 'Reserva não encontrada'
                });
            }

            // DELETAR RESERVA
            await prisma.reserva.delete({
                where: {
                    id: id
                }
            });

            return response.status(200).json({
                message:
                    'Reserva deletada com sucesso'
            });

        } catch (error) {
            return response.status(500).json({
                message: error.message
            });
        }
    }

    async index(request, response) {
        try {

            // BUSCAR RESERVAS
            const reservas =
                await prisma.reserva.findMany({
                    orderBy: {
                        createdAt: 'desc'
                    }
                });

            return response.status(200).json(
                reservas
            );

        } catch (error) {
            return response.status(500).json({
                message: error.message
            });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            // VALIDAR ID
            if (!id) {
                return response.status(400).json({
                    message: 'ID da reserva é obrigatório'
                });
            }

            // BUSCAR RESERVA
            const reserva =
                await prisma.reserva.findUnique({
                    where: {
                        id: id
                    }
                });

            // VALIDAR EXISTÊNCIA
            if (!reserva) {
                return response.status(404).json({
                    message: 'Reserva não encontrada'
                });
            }

            return response.status(200).json(
                reserva
            );

        } catch (error) {
            return response.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = new ReservaController();