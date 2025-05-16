<?php
// Configuración de conexión
$host = "localhost";
$usuario = "root"; // cambia según tu entorno
$contrasena = "";  // cambia si tienes clave
$basedatos = "tu_basedatos"; // cambia por el nombre real

// Crear conexión
$conn = new mysqli($host, $usuario, $contrasena, $basedatos);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recoger datos del formulario
$id_cliente = $_POST['id_cliente'];
$nombre = $_POST['nombre'];
$direccion = $_POST['direccion'];
$fecha_venta = $_POST['fecha_venta'];
$metodo_pago = $_POST['metodo_pago'];
$observaciones = $_POST['observaciones'];

// Preparar la consulta SQL
$sql = "INSERT INTO ventas (id_cliente, nombre, direccion, fecha_venta, metodo_pago, observaciones)
        VALUES (?, ?, ?, ?, ?, ?)";

// Preparar la sentencia
$stmt = $conn->prepare($sql);

// Verificar preparación
if ($stmt === false) {
    die("Error al preparar: " . $conn->error);
}

// Asignar valores a la consulta
$stmt->bind_param("ssssss", $id_cliente, $nombre, $direccion, $fecha_venta, $metodo_pago, $observaciones);

// Ejecutar y verificar
if ($stmt->execute()) {
    echo "✅ Venta registrada exitosamente.";
    // Aquí puedes redirigir si lo deseas:
    // header("Location: tu_pagina_principal.php");
} else {
    echo "❌ Error al registrar la venta: " . $stmt->error;
}

// Cerrar conexiones
$stmt->close();
$conn->close();
?>