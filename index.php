<?php
session_start();

if (isset($_SESSION['usuario'])) {
    header("Location: /carboneria/main/main.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    // Obtener datos del formulario
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Buscar usuario en la base de datos
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE Email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['Contrasena'])) {
                session_start();
                $_SESSION['usuario'] = $email;
                $_SESSION['rol'] = $row['Rol'];
                header("Location: /carboneria/main/main.html");
                exit();
            } else {
                echo "Contraseña incorrecta.";
            }
        } else {
            echo "Usuario no encontrado.";
        }

        $stmt->close();
    } else {
        echo "Faltan datos del formulario.";
    }

    $conn->close();
} else {
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./inicio/style.css">  <title>Inicio de Sesión - Carbonería</title>
    </head>
    <body>
        <div class="login-container">
            <h1>Inicio de Sesión</h1>
            <form action="index.php" method="POST">
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn">Ingresar</button>
            </form>

            <div id="message" class="message"></div>

            <div class="forgot-password">
                <a href="recuperar_contraseña.html">¿Olvidaste tu contraseña?</a>
            </div>

            <div class="footer">
                © 2025 Carbonería23
            </div>
        </div>
        <script src="./inicio/cod.js"></script>  </body>
    </html>
    <?php
}
?>