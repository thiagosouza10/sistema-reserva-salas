function validateRequiredFields(data) {
    const {
        sala,
        responsavel,
        data: dataReserva,
        horaInicio,
        horaFim
    } = data;

    if (!sala || !sala.trim()) throw new Error('Campo sala é obrigatório');
    if (!responsavel || !responsavel.trim()) throw new Error('Campo responsável é obrigatório');
    if (!dataReserva || !dataReserva.trim()) throw new Error('Campo data é obrigatório');
    if (!horaInicio || !horaInicio.trim()) throw new Error('Campo horaInicio é obrigatório');
    if (!horaFim || !horaFim.trim()) throw new Error('Campo horaFim é obrigatório');
}

module.exports = validateRequiredFields;