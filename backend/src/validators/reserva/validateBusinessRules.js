function validateBusinessRules(data) {
    const LIMITE_PARTICIPANTES = 10;

    if (data.participantes && data.participantes.length > LIMITE_PARTICIPANTES) {
        throw new Error('Reserva permite no máximo 10 participantes');
    }

    const [ano, mes, dia] = data.data.split('-');
    const dataReserva = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataReserva < dataAtual) {
        throw new Error('Não é permitido reservar datas passadass');
    }

    const diaSemana = dataReserva.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        throw new Error('Não é permitido reservar aos finais de semana');
    }

    const inicio = data.horaInicio;
    const fim = data.horaFim;

    if (fim <= inicio) {
        throw new Error('Hora fim deve ser maior que hora início');
    }

    const inicioMin = Number(inicio.split(':')[0]) * 60 + Number(inicio.split(':')[1]);
    const fimMin = Number(fim.split(':')[0]) * 60 + Number(fim.split(':')[1]);

    if (fimMin - inicioMin > 240) {
        throw new Error('Reserva não pode ultrapassar 4 horas');
    }

    if (inicio < '08:00' || fim > '18:00') {
        throw new Error('Reservas permitidas somente entre 08:00 e 18:00');
    }
}

module.exports = validateBusinessRules;