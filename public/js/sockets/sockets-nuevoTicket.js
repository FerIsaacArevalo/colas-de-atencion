//Comando para comunicarme con el servidor

var socket = io();


socket.on('connect', function() {
    console.log('conectado al servidor');


    // socket.emit('ticketActual', null, function(resp) {
    //     $("#lblActual").text(resp);
    // })
})

//Configuracion para ver si perdimos conexión con el servidor (activo desactivo)
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

//Metodo on para escuchar lo que el servidor nos envio
socket.on('ticketActual', function(mensaje) {

    $("#lblActual").text(mensaje);
})

$('button').click(function() {

    //EL METODO EMIT ES PARA EMITIR ALGO
    socket.emit('siguienteTicket', {
        usuario: 'Fernando'
    }, function(resp) {
        $("#lblNuevo").text(resp.ticketAsignado);
    })

})






// //EL METODO EMIT ES PARA EMITIR ALGO
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     edad: 24
// }, function(resp) {
//     console.log(resp);
// })


// //Metodo on para escuchar lo que el servidor nos envio
// socket.on('enviarMensaje', function(mensaje) {
//     console.log(mensaje);
// })