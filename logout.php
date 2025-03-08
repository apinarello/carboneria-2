<?php
session_start(); // Inicia la sesión

// Destruye todas las variables de sesión
session_destroy();

// Redirige al usuario a la página de inicio de sesión (o la página que desees)
header("Location: index.php"); // Reemplaza con la URL de tu página de inicio de sesión
exit();
?>