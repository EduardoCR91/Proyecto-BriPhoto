<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "root", "bri_contacto"); // Ajusta "root"/"root" si usas otro servidor

if ($conexion->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conexion->connect_error]);
    exit;
}

$sql = "SELECT id, nombre, correo, asunto, mensaje, fecha FROM mensajes ORDER BY fecha ";
$resultado = $conexion->query($sql);

$clientes = [];

while ($fila = $resultado->fetch_assoc()) {
    $clientes[] = $fila;
}

echo json_encode($clientes);

$conexion->close();
?>