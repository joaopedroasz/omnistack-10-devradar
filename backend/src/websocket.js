// Lidando com o Protocolo WebSocket:
// Possibilidade do backend enviar informações para o front sem necessariamente precisar de uma requisisão.
const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = []; // Armazenar as conexões.
let io;

module.exports.setupWebsocket = (server) => {
  io = socketio(server); // Pegando as funcionalidades do servidor HTTP e colocando no WebSocket.

  // Ouvindo eventos através do SocketIO:
  io.on('connection', socket => { // Sempre que o usuário se conectar através do protocolo WebSocket, essa função será executada.
    const {
      latitude,
      longitude,
      techs
    } = socket.handshake.query // Pegando as informações passadas pelo frontend. 

    // Armazenando todas as conexões:
    connections.push({
      id: socket.id,
      coordinates: {
        // Convertendo para número por que o WebSocket por padrão manda tudo como string.
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });
};

module.exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    // Comparando se as coordenadas passadas e as coordenadas das conexões existentes tem uma diferença de até 10KM.
    return calculateDistance(coordinates, connection.coordinates) < 20
      // Vendo se as tecnologas dos usuários incluem pelo menos uma tecnologia pesquisada.
      &&
      connection.techs.some(item => techs.includes(item));
  });
};

module.exports.sendMessage = (to, messageType, data) => {
  to.forEach(connection => {
    // Enviando uma menssagem para o usuário conectado.
    io.to(connection.id).emit(messageType, data);
  });
};