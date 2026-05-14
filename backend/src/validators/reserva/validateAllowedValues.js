function validateAllowedValues(data) {
    const salasPermitidas = ['Brasil', 'Portugal', 'Espanha'];
    const responsaveisPermitidos = ['Thiago', 'Helena'];

    if (!salasPermitidas.includes(data.sala)) {
        throw new Error('Sala inválida, escolha entre Brasil, Portugal ou Espanha');
    }

    if (!responsaveisPermitidos.includes(data.responsavel)) {
        throw new Error('Responsável inválido, escolha entre Thiago ou Helena');
    }
}

module.exports = validateAllowedValues;