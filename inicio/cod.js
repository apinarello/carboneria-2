// Mostrar/Ocultar Contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

// Validación del Correo Electrónico
document.querySelector('form').addEventListener('submit', function (event) {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        event.preventDefault();
        showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar Mensajes
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}