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

if (isset($_POST['token']) && isset($_POST['password'])) {
    $token = $_POST['token'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashear la contraseña

    // Actualizar contraseña en la base de datos
    $sql = "UPDATE usuarios SET Contrasena = '$password', token = NULL WHERE token = '$token'"; // Eliminar token después de usarlo
    $result = $conn->query($sql);

    if ($result) {
        echo json_encode(['mensaje' => 'Contraseña restablecida correctamente.']);
    } else {
        echo json_encode(['mensaje' => 'Error al restablecer la contraseña.']);
    }
}

$conn->close();
?>