const validateRequiredFields = require('./validateRequiredFields');
const validateAllowedValues = require('./validateAllowedValues');
const validateFormat = require('./validateFormat');
const validateBusinessRules = require('./validateBusinessRules');

function validateReserva(data) {
    validateRequiredFields(data);
    validateAllowedValues(data);
    validateFormat(data);
    validateBusinessRules(data);
}

module.exports = validateReserva;