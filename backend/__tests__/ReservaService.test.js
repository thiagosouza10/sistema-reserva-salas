jest.mock('../src/database/prisma', () => ({
  reserva: {
    findFirst: jest.fn(),
    create: jest.fn()
  }
}));

const prisma = require('../src/database/prisma');
const reservaService = require('../src/services/ReservaService');

describe('ReservaService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar reserva com sucesso', async () => {

    prisma.reserva.findFirst.mockResolvedValue(null);

    prisma.reserva.create.mockResolvedValue({
      id: '1',
      sala: 'Brasil',
      responsavel: 'Thiago'
    });

    const payload = {
      sala: 'Brasil',
      responsavel: 'Thiago',
      data: '2026-05-14',
      horaInicio: '09:00',
      horaFim: '10:00',
      participantes: []
    };

    const result = await reservaService.create(payload);
    expect(result).toHaveProperty('sala');
    expect(prisma.reserva.create).toHaveBeenCalledTimes(1);
  });

  it('não deve criar reserva com data retroativa', async () => {

    const payload = {
      sala: 'Brasil',
      responsavel: 'Thiago',
      data: '2026-05-13',
      horaInicio: '09:00',
      horaFim: '10:00',
      participantes: []
    };

    await expect(reservaService.create(payload))
      .rejects
      .toThrow('Não é permitido reservar datas passadas');

    expect(prisma.reserva.create).not.toHaveBeenCalled();
  });




});
