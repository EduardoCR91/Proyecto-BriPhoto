<?php
session_start();            // Inicia la sesión actual
session_destroy();          // Destruye toda la sesión (cierra la sesión del admin)
header("Location: login.php"); // Redirige al login
exit;
?>