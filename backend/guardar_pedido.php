<?php
// Habilitar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir archivo de conexión
include 'conexion.php';

// Verificar si los datos se enviaron por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Usar isset() para verificar si las claves existen antes de acceder a ellas
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : ''; // Valor por defecto vacío
    $apellido = isset($_POST['apellido']) ? $_POST['apellido'] : '';
    $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
    $direccion = isset($_POST['direccion']) ? $_POST['direccion'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    // ... (código para validación de datos sin cambios)

    // Verificar si el teléfono ya existe en la base de datos (sin cambios)

    // Insertar datos en la base de datos
    $stmt = $conn->prepare("INSERT INTO Clientes (Nombre, Apellido, Telefono, Direccion, Email) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nombre, $apellido, $telefono, $direccion, $email);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cliente guardado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al guardar cliente: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Se requiere una solicitud POST"]);
}

$conn->close();
?>