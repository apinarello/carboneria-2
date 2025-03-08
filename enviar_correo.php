<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "aledb";
$password = "BN30tcDTX-OGm[rn";
$dbname = "carboneria_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];

    // Verificar si el usuario existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE Email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Generar token único
        $token = bin2hex(random_bytes(32));

        // Guardar token en la base de datos (debes agregar una columna 'token' a tu tabla 'usuarios')
        $updateSql = "UPDATE usuarios SET token = '$token' WHERE Email = '$email'";
        $conn->query($updateSql);

        // Enviar correo electrónico
        $to = $email;
        $subject = "Recuperación de contraseña";
        $message = "Para restablecer su contraseña, haga clic en el siguiente enlace: http://localhost/carboneria/restablecer_contraseña.html?token=" . $token;
        $headers = "From: tu_correo@example.com"; // Reemplaza con tu correo

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['mensaje' => 'Se ha enviado un correo de recuperación a tu dirección de correo electrónico.']);
        } else {
            echo json_encode(['mensaje' => 'Error al enviar el correo.']);
        }
    } else {
        echo json_encode(['mensaje' => 'No se encontró ningún usuario con ese correo electrónico.']);
    }
}

$conn->close();
?>