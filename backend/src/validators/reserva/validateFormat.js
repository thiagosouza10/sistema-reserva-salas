function validateFormat(data) {
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    const horaRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!dataRegex.test(data.data)) {
        throw new Error('Campo data possui formato inválido, deve ser YYYY-MM-DD');
    }

    if (!horaRegex.test(data.horaInicio)) {
        throw new Error('Campo horaInicio possui formato inválido, deve ser HH:MM');
    }

    if (!horaRegex.test(data.horaFim)) {
        throw new Error('Campo horaFim possui formato inválido, deve ser HH:MM');
    }

    if (data.participantes && !Array.isArray(data.participantes)) {
        throw new Error('Campo participantes deve ser um array');
    }
}

module.exports = validateFormat;