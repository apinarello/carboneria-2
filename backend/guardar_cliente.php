<?php
//... (código para manejar errores y encabezados sin cambios)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'conexion.php';

// Verificar si se recibieron datos por POST o en formato JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST' ||!empty(file_get_contents("php://input"))) {
    // Obtener los datos del formulario (POST o JSON)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        $email = $_POST['email'];
    } else {
        $data = json_decode(file_get_contents("php://input"), true);
        $nombre = $data['nombre'];
        $apellido = $data['apellido'];
        $telefono = $data['telefono'];
        $direccion = $data['direccion'];
        $email = $data['email'];
    }

    //... (código para validación de datos sin cambios)
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($direccion) || empty($email)) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }

    // Verificar si el teléfono ya existe en la base de datos (sin cambios)
    if (!preg_match('/^[+0-9]+$/', $telefono)) {
        echo json_encode(["error" => "El teléfono debe contener solo números y el signo '+' opcionalmente."]);
        exit;
    }


    // Insertar datos en la base de datos
    $stmt = $conn->prepare("INSERT INTO Clientes (Nombre, Apellido, Telefono, Direccion, Email) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssss", $nombre, $apellido, $telefono, $direccion, $email);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cliente guardado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al guardar cliente: ". $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Se requiere una solicitud POST o datos JSON"]);
}

$conn->close();
?>