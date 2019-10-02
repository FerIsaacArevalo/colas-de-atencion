const { io } = require('../server');

const { TicketControl } = require("../Classes/ticket-control")

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('ticketActual', ticketControl.actual());
    client.emit('getUltimos4', ticketControl.getUltimos4());

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let ticketAsignado = ticketControl.siguiente();

        callback({
            usuario: data,
            ticketAsignado
        });

        let ticketActual = ticketControl.actual();
        //Emitir una actualizacion a todos los clientes
        client.broadcast.emit('ticketActual', ticketActual);

    });

    client.on('ticketActual', (data, callback) => {

        let ticketActual = ticketControl.actual();

        callback(ticketActual);

        //Emitir una actualizacion a todos los clientes
        client.broadcast.emit('ticketActual', ticketActual);
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                Ok: false,
                message: 'No hay un escritorio en el envio'
            })
        }

        let ticketAtendido = ticketControl.atenderTicket(data.escritorio)

        callback(ticketAtendido);
        if (ticketAtendido !== -1) {
            //Emitir una actualizacion de los ultimos 4
            client.broadcast.emit('getUltimos4', ticketControl.getUltimos4());
        }

    });






});