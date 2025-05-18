<?php
session_start();

// Verificar si el usuario ha iniciado sesión como administrador
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Panel de Gestión</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="logo">Brifotophilms</h2>
      <h4>Admin-Panel</h4>
      <nav>
        <ul>
          <li data-section="clientes">Clientes</li>
          <li data-section="ventas">Ventas</li>
          <!--<li>Configuración</li>-->
        </ul>
        <div class="logout-section">
            <button id="btnLogout" type="button">🔓 Cerrar sesión</button>
            <!--<a href="logout.php" id="btnLogout">Cerrar sesión 🔒</a>-->
        </div>
      </nav>
    </aside>

    <div class="main-content">
      <header class="navbar">
        <div class="navbar-title" id="sectionTitle">Gestión de Clientes</div>
        <div class="navbar-user">👤 Admin</div>
      </header>

      <!-- Sección Clientes-->
      <section class="content" id="clientesSection">
        <div class="controls">
          <!--<button id="btnCrearCliente">➕ Nuevo Cliente</button>-->
          <input type="text" id="searchClienteInput" placeholder="Buscar cliente..." />
          <button id="btnBuscarCliente">Buscar</button>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="clientTableBody">
              <!-- Clientes se cargarán aquí -->
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sección Ventas  -->
      <section class="content hidden" id="ventasSection">
        <div class="controls">
          <button id="btnNuevaVenta">➕ Nueva Venta</button>
          <input type="text" id="searchVentaInput" placeholder="Buscar venta..." />
          <button id="btnBuscarVenta">Buscar</button>
        </div>

        <div id="formVentaContainer" class="card hidden">
          <h2>Registrar Venta</h2>
          <form id="ventaForm" method="POST" action="registrar_venta.php">
            <input type="hidden" id="ventaId" />
            <label>Cliente:
              <input type="text" id="nombre" name="nombre" required />
            </label>
            <label>Cédula:
              <input type="text" id="id_cliente" name="id_cliente" required />
            </label>
            <label>Dirección:
              <input type="text" id="direccion" name="direccion" required />
            </label>
            <label>Fecha:
              <input type="date" id="fecha_venta" name="fecha_venta" required />
            </label>
            <label>Método de Pago:
              <select id="metodo_pago" name="metodo_pago" required>
                <option value="">Seleccione...</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </label>
            <label>Observaciones:
              <textarea id="ventaObservaciones" name="observaciones"  rows="3"></textarea>
            </label>
            <div class="form-buttons">
              <button type="submit" id="btnGuardarVenta">💾 Guardar</button>
              <button type="button" id="btnCancelarVenta">❌ Cancelar</button>
            </div>
          </form>
        </div>

        <div class="card">
          <table>
            <thead>
              <tr>
                <th>ID Interno</th>
                <th>Cliente</th>
                <th>Cédula</th>
                <th>Fecha</th>
                <th>Método Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <!-- Pendiente desarrollo para que Ventas se carguen aquí -->
            <tbody id="ventaTableBody">
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>

  <script src="script.js"></script>
  <script src="logueo.js"></script>
</body>
</html>