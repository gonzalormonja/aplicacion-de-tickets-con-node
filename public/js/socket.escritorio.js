//comando para estableecer conexion con el servidor

var socket = io();

//obtener parametros get
var searchParams = new URLSearchParams(window.location.search);
// searchParams.has('escritorio') return boolean
if (!searchParams.has('escritorio')) {
    window.location = "index.html";
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
        if (data === "No hay tickets") {
            $('small').text(data);
            alert(data);
            return;
        }
        $('small').text(data.numero);
    });
});