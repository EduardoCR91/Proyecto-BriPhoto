<?php
$conn = new mysqli("localhost", "root", "root", "bri_contacto", 8889);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$result = $conn->query("SELECT nombre, id_cliente, direccion, fecha_venta, metodo_pago, observaciones FROM ventas");

$ventas = [];
while ($row = $result->fetch_assoc()) {
    $ventas[] = $row;
}

header('Content-Type: application/json');
echo json_encode($ventas);

$conn->close();
?>