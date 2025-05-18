document.addEventListener("DOMContentLoaded", () => {


  const btnCrearCliente = document.getElementById("btnCrearCliente");
  const formClienteContainer = document.getElementById("formClienteContainer");
  const btnCancelarCliente = document.getElementById("btnCancelarCliente");

  // Mostrar el formulario al hacer clic en "Nuevo Cliente"
  if (btnCrearCliente && formClienteContainer) {
    btnCrearCliente.addEventListener("click", () => {
      formClienteContainer.classList.remove("hidden");
    });
  }

  // Ocultar el formulario al hacer clic en "Cancelar"
  if (btnCancelarCliente && formClienteContainer) {
    btnCancelarCliente.addEventListener("click", () => {
      formClienteContainer.classList.add("hidden");
      // También puedes limpiar los campos si quieres
      document.getElementById("clientForm").reset();
    });
  }


const btnNuevaVenta = document.getElementById("btnNuevaVenta");
const formVentaContainer = document.getElementById("formVentaContainer");
const btnCancelarVenta = document.getElementById("btnCancelarVenta");

btnNuevaVenta.addEventListener("click", () => {
  formVentaContainer.classList.remove("hidden");
});

btnCancelarVenta.addEventListener("click", () => {
  formVentaContainer.classList.add("hidden");
  document.getElementById("ventaForm").reset();
});



  document.querySelector('[data-section="clientes"]').addEventListener("click", () => {
    mostrarSeccion("clientesSection", "Gestión de Clientes");
    cargarClientes();
  });

  document.querySelector('[data-section="ventas"]').addEventListener("click", () => {
    mostrarSeccion("ventasSection", "Gestión de Ventas");
    cargarVentas();
  });


  const btnNuevaVenta1 = document.getElementById("btnNuevaVenta");
  const formVenta = document.getElementById("ventaForm");

  btnNuevaVenta1.addEventListener("click", () => {
    formVenta.classList.toggle("hidden");
  });

  formVenta.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formVenta);

    fetch("registrar_venta.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert("Venta registrada exitosamente");
        formVenta.reset();
        formVenta.classList.add("hidden");
        cargarVentas(); // recarga la tabla
      } else {
        alert("Error al registrar venta: " + response.error);
      }
    })
    .catch(err => {
      console.error("Error al registrar venta:", err);
    });
  });
  
});

function mostrarSeccion(id, titulo) {
  document.querySelectorAll(".content").forEach(section => section.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.getElementById("sectionTitle").textContent = titulo;
}

function cargarClientes() {
  fetch("obtener_clientes.php")
    .then(res => res.json())
    .then(clientes => {
      const tbody = document.getElementById("clientTableBody");
      tbody.innerHTML = "";

      if (clientes.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6'>No hay clientes registrados</td></tr>";
        return;
      }

      clientes.forEach(cliente => {
        console.log(cliente);
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.correo}</td>
          <td>${cliente.asunto}</td>
          <td>${cliente.mensaje}</td>
          <td>${new Date(cliente.fecha).toLocaleDateString()}</td>
          <td><button onclick="editarCliente(${cliente.id})">✏️</button> <button onclick="eliminarCliente(${cliente.id})">🗑️</button></td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Error al cargar clientes:", error);
    });
}

// Funciones por implementar:
function editarCliente(id) {
  alert("Editar cliente ID: " + id);
}

function eliminarCliente(id) {
  alert("Eliminar cliente ID: " + id);
}

function cargarVentas() {
  fetch("obtener_ventas.php")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("ventaTableBody");
      tbody.innerHTML = ""; // limpia antes de volver a cargar

      data.forEach(venta => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${venta.id}</td>
          <td>${venta.nombre}</td>
          <td>${venta.id_cliente}</td>
          <td>${venta.fecha_venta}</td>
          <td>${venta.metodo_pago}</td>
          <td>
            <button onclick="editarVenta(${venta.id})">✏️</button>
            <button onclick="eliminarVenta(${venta.id})">🗑️</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error("Error cargando ventas:", err));
}