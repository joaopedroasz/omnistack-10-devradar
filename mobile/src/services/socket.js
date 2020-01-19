// Configurações para o cliente SocketIO, que vai receber as informações do backend.
import socketio from 'socket.io-client';

// Informando para o Frontend qual é o backend Socket.
const socket = socketio('http://10.0.2.2:8000', {
  autoConnect: false // Fazendo com que o socket frontend não se conecte com o socket backend altomaticamente.
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

// Conectando com o Socket do backend: 
function connect(latitude, longitude, techs) {
  // Enviando dados para o backend com o WebSocket:
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) { // Se o socket estiver conectado:
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs
};