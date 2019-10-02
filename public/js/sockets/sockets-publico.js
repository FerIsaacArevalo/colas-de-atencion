socket = io();

var lblticket = ['#lblTicket1', '#lblTicket2', '#lblTicket3', '#lblTicket4'];
var lblescritorio = ['#lblEscritorio1', '#lblEscritorio2', '#lblEscritorio3', '#lblEscritorio4'];


socket.on('getUltimos4', function(ultimos4) {
    cargarHTML(ultimos4);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

function cargarHTML(ultimos4) {


    var largo = ultimos4.length
    if (largo !== 0) {

        for (var i = 0; i < largo; i++) {
            $(lblticket[i]).text('Número ' + ultimos4[i].numero)
            $(lblescritorio[i]).text('Escritorio ' + ultimos4[i].escritorio);
        }
    }

}