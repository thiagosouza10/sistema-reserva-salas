function validateReserva(data) {
    const {
        sala,
        responsavel,
        data: dataReserva,
        horaInicio,
        horaFim,
        participantes
    } = data;

    // CAMPOS OBRIGATÓRIOS
    if (!sala || !sala.trim()) {
        throw new Error('Campo sala é obrigatório');
    }

    if (!responsavel || !responsavel.trim()) {
        throw new Error('Campo responsável é obrigatório');
    }

    if (!dataReserva || !dataReserva.trim()) {
        throw new Error('Campo data é obrigatório');
    }

    if (!horaInicio || !horaInicio.trim()) {
        throw new Error('Campo horaInicio é obrigatório');
    }

    if (!horaFim || !horaFim.trim()) {
        throw new Error('Campo horaFim é obrigatório');
    }

    // SALAS PERMITIDAS
    const salasPermitidas = [
        'Brasil',
        'Portugal',
        'Espanha'
    ];

    if (!salasPermitidas.includes(sala)) {
        throw new Error('Sala inválida, escolha entre Brasil, Portugal ou Espanha');
    }

    // RESPONSÁVEIS PERMITIDOS
    const responsaveisPermitidos = [
        'Thiago',
        'Helena'
    ];

    if (!responsaveisPermitidos.includes(responsavel)) {
        throw new Error('Responsável inválido, escolha entre Thiago ou Helena');
    }

    // VALIDAÇÃO DATA
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dataRegex.test(dataReserva)) {
        throw new Error(
            'Campo data possui formato inválido, deve ser YYYY-MM-DD'
        );
    }

    // VALIDAÇÃO HORA
    const horaRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!horaRegex.test(horaInicio)) {
        throw new Error(
            'Campo horaInicio possui formato inválido, deve ser HH:MM'
        );
    }

    if (!horaRegex.test(horaFim)) {
        throw new Error(
            'Campo horaFim possui formato inválido, deve ser HH:MM'
        );
    }

    // VALIDAR PARTICIPANTES
    if (
        participantes &&
        !Array.isArray(participantes)
    ) {
        throw new Error(
            'Campo participantes deve ser um array'
        );
    }

    const LIMITE_PARTICIPANTES = 10;
    if (
        participantes &&
        participantes.length > LIMITE_PARTICIPANTES
    ) {
        throw new Error(
            'Reserva permite no máximo 10 participantes'
        );
    }

    // VALIDAR DATA RETROATIVA
    const [ano, mes, dia] = dataReserva.split('-');
    const dataReservaFormatada = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataReservaFormatada < dataAtual) {
        throw new Error(
            'Não é permitido reservar datas passadas'
        );
    }

    // VALIDAR DOMINGO
    const diaSemana = dataReservaFormatada.getDay();

    if (diaSemana === 0 || diaSemana === 6) {
        throw new Error(
            'Não é permitido reservar aos finais de semana'
        );
    }

    // VALIDAR HORÁRIO
    if (horaFim <= horaInicio) {
        throw new Error(
            'Hora fim deve ser maior que hora início'
        );
    }

    const inicioEmMinutos =
        Number(horaInicio.split(':')[0]) * 60 +
        Number(horaInicio.split(':')[1]);

    const fimEmMinutos =
        Number(horaFim.split(':')[0]) * 60 +
        Number(horaFim.split(':')[1]);

    const duracaoReserva = fimEmMinutos - inicioEmMinutos;
    const DURACAO_MAXIMA = 240;

    if (duracaoReserva > DURACAO_MAXIMA) {
        throw new Error(
            'Reserva não pode ultrapassar 4 horas'
        );
    }

    const HORA_INICIO_EXPEDIENTE = '08:00';
    const HORA_FIM_EXPEDIENTE = '18:00';

    if (
        horaInicio < HORA_INICIO_EXPEDIENTE ||
        horaFim > HORA_FIM_EXPEDIENTE
    ) {
        throw new Error(
            'Reservas permitidas somente entre 08:00 e 18:00'
        );
    }
}

module.exports = validateReserva;