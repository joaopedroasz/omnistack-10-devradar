// Arquivos 'utils' armazenam trechos de códigos que poderam ser reaproveitados em qualquer lugar da aplicação.

module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(string => string.trim());
}