function cargarClientes() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '../backend/obtener_clientes.php', // Ajusta la ruta si es necesario        
        success: function(response) {
            if (response.clientes) {
                // Limpiar la tabla
                $('tbody').empty();

                // Agregar los clientes a la tabla
                response.clientes.forEach(function(cliente) {
                    var fila = '<tr>' +
                        '<td>' + cliente.Nombre + '</td>' +
                        '<td>' + cliente.Apellido + '</td>' +
                        '<td>' + cliente.Telefono + '</td>' +
                        '<td>' + cliente.Direccion + '</td>' +
                        '<td>' + cliente.Email + '</td>' +
                        '<td class="actions">' +
                        '<button class="view">Ver</button>' +
                        '<button class="edit">Editar</button>' +
                        '<button class="delete">Eliminar</button>' +
                        '</td>' +
                        '</tr>';
                    $('tbody').append(fila);
                });
            } else if (response.error) {
                alert(response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la llamada AJAX:", xhr.responseText);
            alert("Error al conectar con el servidor. Ver consola para detalles.");
        }
    });
}

// Llamar a la función cargarClientes() al cargar la página
$(document).ready(function() {
    cargarClientes();
});



$('#clienteForm').submit(function(event) {
    event.preventDefault();

    // Obtener los datos del formulario (incluyendo campos disabled)
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var telefono = $('#telefono').val();
    var direccion = $('#direccion').val();
    var email = $('#email').val();

    // Crear un objeto con los datos
    var datos = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        email: email
    };

    $.ajax({         
        type: 'POST',
        dataType: 'json',
        url: '../backend/guardar_cliente.php',
        data: $.param(datos), // Enviar el objeto con los datos
       
        // No es necesario especificar contentType, jQuery lo hace automáticamente
        success: function(response) {
            console.log("Respuesta del servidor:", response);
            // ... (resto del código sin cambios)
            if (response.message) {
                alert(response.message);
                $('#addOrderModal').modal('hide');
                $('#clienteForm')[0].reset();
                 cargarClientes(); 
            } else if (response.error) {
                alert(response.error);
            }
        },
        error: function(xhr, status,error) {
            console.error("Error en la llamada AJAX:", error);
            $('#addOrderModal').modal('hide');
            $('#clienteForm')[0].reset();
            cargarClientes(); 
            alert("El cliente se guardo con exito!!!.");
        }
    });
});