document.getElementById('clienteForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        email: document.getElementById('email').value,
    };

    // Enviar datos al backend
    fetch('../backend/guardar_cliente.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Mostrar mensaje de éxito
            document.getElementById('clienteForm').reset(); // Limpiar el formulario
        } else if (data.error) {
            alert(data.error); // Mostrar mensaje de error
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});