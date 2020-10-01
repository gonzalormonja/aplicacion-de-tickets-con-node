//comando para estableecer conexion con el servidor

var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log("Se establecio conexion con el servidor");
});
socket.on('disconnect', function() {
    console.log("Se perdio conexion con el servidor");
});
socket.on('estadoActual', function(data) {
    label.text(data.actual);
})
$('button.nuevoTicket').on('click', function() {

    socket.emit('siguienteTicket', null, function(ticket) {
        label.text(ticket)
    })
});