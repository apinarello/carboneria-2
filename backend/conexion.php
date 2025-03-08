<?php
$servername = "localhost"; // Servidor de la base de datos
$username = "aledb";        // Usuario de la base de datos
$password = "BN30tcDTX-OGm[rn";            // 
$dbname = "carboneria_db"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "Conexión exitosa."; // Añade este mensaje
}
?>