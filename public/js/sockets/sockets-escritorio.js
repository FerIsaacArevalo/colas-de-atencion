//Comando para comunicarme con el servidor

var socket = io();

//Forma para extraer todos los parametros del url
//Esto solo funciona en googleChrome tal vez en los otros pero no es seguro
var parametrosURL = new URLSearchParams(window.location.search);



if (!parametrosURL.has('escritorio')) {

    window.location.assign('index.html');
    throw new Error('El escritorio es necesario');
}
var escritorio = parametrosURL.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').click(function() {

    //EL METODO EMIT ES PARA EMITIR ALGO
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(resp) {
        if (resp === -1) {
            $('h4').text('No hay tickets por atender');
        } else {
            $('h4').text('Atendiendo a ' + resp);
        }


    })

})