<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "root", "bri_contacto");

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

// Insertar en la base de datos
$sql = "INSERT INTO mensajes (nombre, correo, asunto, mensaje)
        VALUES ('$nombre', '$correo', '$asunto', '$mensaje')";

if ($conexion->query($sql) === TRUE) {
    echo "✅ Mensaje enviado correctamente.";
} else {
    echo "❌ Error: " . $conexion->error;
}

$conexion->close();
?>