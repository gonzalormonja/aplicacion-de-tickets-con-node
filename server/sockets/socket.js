const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let ticketAtendido = ticketControl.atenderTicket(data.escritorio);

        callback(ticketAtendido);
        if (ticketAtendido !== "No hay tickets") {
            client.broadcast.emit('ultimos4', {
                ultimos4: ticketControl.getUltimos4()
            })
        }
    });
});