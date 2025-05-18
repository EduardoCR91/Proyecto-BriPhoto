<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['usuario'] ?? '';
    $clave = $_POST['clave'] ?? '';

    // Cambia estas credenciales según tu necesidad
    $usuario_valido = "admin";
    $clave_valida = "12345";

    if ($usuario === $usuario_valido && $clave === $clave_valida) {
        $_SESSION['admin'] = $usuario;
        header("Location: index.php");
        exit;
    } else {
        $error = "Credenciales incorrectas.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Login | AdminPanel</title>
  <link rel="stylesheet" href="logueo.css">
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span>AdminPanel</span>
      </div>
      
      <?php if (!empty($error)) echo "<p style='color:red;text-align:center;'>$error</p>"; ?>

      <form method="POST" action="">
        <div class="input-group">
          <input type="text" name="usuario" required placeholder="Usuario">
        </div>
        
        <div class="input-group">
          <input type="password" name="clave" required placeholder="Contraseña">
        </div>
        
        <button type="submit" class="btn-login">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</body>
</html>