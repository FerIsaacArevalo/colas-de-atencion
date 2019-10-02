const fs = require('fs');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require("../data/data");



        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.hoy = data.hoy;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciar()

        }
    }

    siguiente() {
        //this.reiniciar();
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return -1;
        }
        let atendido = this.tickets[0].numero;
        //shift para eliminar al de la primera posición
        this.tickets.shift();

        let atenderTicket = new Ticket(atendido, escritorio);
        //unshift hace un push pero al principio de un arreglo ej: unshift-> [1,2,3] <-push
        this.ultimos4.unshift(atenderTicket);


        if (this.ultimos4.length > 4) {
            //splice borra uno de atras para adelante, osea, el ultimo
            this.ultimos4.splice(-1, 1);
        }

        this.grabarArchivo();

        return atendido;
    }

    getUltimos4() {
        return this.ultimos4;
    }
    grabarArchivo() {
        let dataJson = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let dataString = JSON.stringify(dataJson);

        fs.writeFileSync("./server/data/data.json", dataString);
    }

    actual() {
        return `Ticket ${this.ultimo}`;
    }
    reiniciar() {
        this.grabarArchivo();
    }



}


module.exports = {
    TicketControl
}