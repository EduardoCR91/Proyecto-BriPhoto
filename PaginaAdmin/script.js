document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // VARIABLES GLOBALES
  // =============================================
  let clientes = []; // Almacena todos los clientes registrados
  let ventas = [];   // Almacena todas las ventas registradas
  let currentSection = 'clientes'; // Controla la sección activa (clientes/ventas)

  // =============================================
  // ELEMENTOS DEL DOM - SECCIÓN CLIENTES
  // =============================================
  const clientesSection = document.getElementById('clientesSection');
  const btnCrearCliente = document.getElementById('btnCrearCliente');
  const btnBuscarCliente = document.getElementById('btnBuscarCliente');
  const searchClienteInput = document.getElementById('searchClienteInput');
  const formClienteContainer = document.getElementById('formClienteContainer');
  const clientForm = document.getElementById('clientForm');
  const btnGuardarCliente = document.getElementById('btnGuardarCliente');
  const btnCancelarCliente = document.getElementById('btnCancelarCliente');
  const clientTableBody = document.getElementById('clientTableBody');
  const clientIdInput = document.getElementById('clientId');

  // =============================================
  // ELEMENTOS DEL DOM - SECCIÓN VENTAS
  // =============================================
  const ventasSection = document.getElementById('ventasSection');
  const btnCrearVenta = document.getElementById('btnCrearVenta');
  const btnBuscarVenta = document.getElementById('btnBuscarVenta');
  const searchVentaInput = document.getElementById('searchVentaInput');
  const formVentaContainer = document.getElementById('formVentaContainer');
  const ventaForm = document.getElementById('ventaForm');
  const btnGuardarVenta = document.getElementById('btnGuardarVenta');
  const btnCancelarVenta = document.getElementById('btnCancelarVenta');
  const ventaTableBody = document.getElementById('ventaTableBody');
  const ventaIdInput = document.getElementById('ventaId');
  const sectionTitle = document.getElementById('sectionTitle');

  // =============================================
  // ELEMENTOS DEL SIDEBAR
  // =============================================
  const sidebarItems = document.querySelectorAll('.sidebar li[data-section]');

  // =============================================
  // FUNCIONES AUXILIARES
  // =============================================
  
  /**
   * Genera un ID único para nuevos registros
   * @returns {string} ID único generado
   */
  function generarIdUnico() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Cambia entre las secciones de clientes y ventas
   * @param {string} seccion - Nombre de la sección a mostrar ('clientes' o 'ventas')
   */
  function cambiarSeccion(seccion) {
    currentSection = seccion;
    // Oculta ambas secciones
    clientesSection.classList.add('hidden');
    ventasSection.classList.add('hidden');
    
    // Muestra la sección correspondiente
    if (seccion === 'clientes') {
      clientesSection.classList.remove('hidden');
      sectionTitle.textContent = 'Gestión de Clientes';
    } else if (seccion === 'ventas') {
      ventasSection.classList.remove('hidden');
      sectionTitle.textContent = 'Gestión de Ventas';
    }
    
    // Actualiza el estado activo en el sidebar
    sidebarItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === seccion);
    });
  }

  // =============================================
  // FUNCIONES PARA GESTIÓN DE CLIENTES
  // =============================================

  /**
   * Renderiza la tabla de clientes con los datos proporcionados
   * @param {Array} data - Array de objetos cliente a mostrar
   */
  function renderizarTablaClientes(data) {
    clientTableBody.innerHTML = '';
    data.forEach(cliente => {
      const row = clientTableBody.insertRow();
      // Columnas de datos del cliente
      row.insertCell().textContent = cliente.id;
      row.insertCell().textContent = cliente.nombre;
      row.insertCell().textContent = cliente.email;
      row.insertCell().textContent = cliente.telefono || '-';
      row.insertCell().textContent = cliente.asunto || '-';
      row.insertCell().textContent = cliente.fechaIngreso ? new Date(cliente.fechaIngreso).toLocaleDateString() : '-';
      
      // Columna de acciones
      const actionsCell = row.insertCell();
      actionsCell.classList.add('actions');

      // Botón Editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => editarCliente(cliente.id));

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.addEventListener('click', () => eliminarCliente(cliente.id));

      actionsCell.appendChild(btnEditar);
      actionsCell.appendChild(btnEliminar);
    });
  }

  /**
   * Muestra el formulario de cliente (para crear o editar)
   * @param {Object|null} cliente - Objeto cliente a editar o null para crear nuevo
   */
  function mostrarFormularioCliente(cliente = null) {
    formClienteContainer.classList.remove('hidden');
    if (cliente) {
      // Rellena el formulario con datos existentes
      clientIdInput.value = cliente.id;
      document.getElementById('nombre').value = cliente.nombre;
      document.getElementById('email').value = cliente.email;
      document.getElementById('telefono').value = cliente.telefono || '';
      document.getElementById('asunto').value = cliente.asunto || '';
      document.getElementById('sms').value = cliente.sms || '';
      document.getElementById('fechaIngreso').value = cliente.fechaIngreso || '';
    } else {
      // Resetea el formulario para nuevo cliente
      clientForm.reset();
      clientIdInput.value = '';
      document.getElementById('fechaIngreso').valueAsDate = new Date();
    }
  }

  /**
   * Oculta el formulario de cliente
   */
  function ocultarFormularioCliente() {
    formClienteContainer.classList.add('hidden');
  }

  /**
   * Guarda un cliente (crea nuevo o actualiza existente)
   */
  function guardarCliente() {
    const id = clientIdInput.value;
    // Obtiene valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const sms = document.getElementById('sms').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;

    if (id) {
      // Actualiza cliente existente
      clientes = clientes.map(cliente =>
        cliente.id === id ? { ...cliente, nombre, email, telefono, asunto, sms, fechaIngreso } : cliente
      );
    } else {
      // Crea nuevo cliente
      const nuevoCliente = { 
        id: generarIdUnico(), 
        nombre, 
        email, 
        telefono, 
        asunto, 
        sms, 
        fechaIngreso 
      };
      clientes.push(nuevoCliente);
    }

    renderizarTablaClientes(clientes);
    ocultarFormularioCliente();
  }

  /**
   * Prepara el formulario para editar un cliente existente
   * @param {string} id - ID del cliente a editar
   */
  function editarCliente(id) {
    const cliente = clientes.find(cliente => cliente.id === id);
    if (cliente) {
      mostrarFormularioCliente(cliente);
    }
  }

  /**
   * Elimina un cliente después de confirmación
   * @param {string} id - ID del cliente a eliminar
   */
  function eliminarCliente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      clientes = clientes.filter(cliente => cliente.id !== id);
      renderizarTablaClientes(clientes);
    }
  }

  /**
   * Busca clientes según término de búsqueda
   */
  function buscarClientes() {
    const searchTerm = searchClienteInput.value.toLowerCase();
    const resultados = clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm) ||
      (cliente.telefono && cliente.telefono.includes(searchTerm)) ||
      (cliente.asunto && cliente.asunto.toLowerCase().includes(searchTerm))
    );
    renderizarTablaClientes(resultados);
  }

  // =============================================
  // FUNCIONES PARA GESTIÓN DE VENTAS
  // =============================================

  /**
   * Renderiza la tabla de ventas con los datos proporcionados
   * @param {Array} data - Array de objetos venta a mostrar
   */
  function renderizarTablaVentas(data) {
    ventaTableBody.innerHTML = '';
    data.forEach(venta => {
      const row = ventaTableBody.insertRow();
      // Columnas de datos de la venta
      row.insertCell().textContent = venta.id;
      row.insertCell().textContent = venta.cliente;
      row.insertCell().textContent = venta.cedula;
      row.insertCell().textContent = new Date(venta.fecha).toLocaleDateString();
      row.insertCell().textContent = venta.metodoPago;
      
      // Columna de acciones
      const actionsCell = row.insertCell();
      actionsCell.classList.add('actions');

      // Botón Editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => editarVenta(venta.id));

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.addEventListener('click', () => eliminarVenta(venta.id));

      actionsCell.appendChild(btnEditar);
      actionsCell.appendChild(btnEliminar);
    });
  }

  /**
   * Muestra el formulario de venta (para crear o editar)
   * @param {Object|null} venta - Objeto venta a editar o null para crear nueva
   */
  function mostrarFormularioVenta(venta = null) {
    formVentaContainer.classList.remove('hidden');
    if (venta) {
      // Rellena el formulario con datos existentes
      ventaIdInput.value = venta.id;
      document.getElementById('ventaCliente').value = venta.cliente;
      document.getElementById('ventaCedula').value = venta.cedula;
      document.getElementById('ventaDireccion').value = venta.direccion;
      document.getElementById('ventaFecha').value = venta.fecha;
      document.getElementById('ventaMetodoPago').value = venta.metodoPago;
      document.getElementById('ventaObservaciones').value = venta.observaciones || '';
    } else {
      // Resetea el formulario para nueva venta
      ventaForm.reset();
      ventaIdInput.value = '';
      document.getElementById('ventaFecha').valueAsDate = new Date();
    }
  }

  /**
   * Oculta el formulario de venta
   */
  function ocultarFormularioVenta() {
    formVentaContainer.classList.add('hidden');
  }

  /**
   * Guarda una venta (crea nueva o actualiza existente)
   */
  function guardarVenta() {
    const id = ventaIdInput.value;
    // Obtiene valores del formulario
    const cliente = document.getElementById('ventaCliente').value;
    const cedula = document.getElementById('ventaCedula').value;
    const direccion = document.getElementById('ventaDireccion').value;
    const fecha = document.getElementById('ventaFecha').value;
    const metodoPago = document.getElementById('ventaMetodoPago').value;
    const observaciones = document.getElementById('ventaObservaciones').value;

    const ventaData = {
      id: id || generarIdUnico(),
      cliente,
      cedula,
      direccion,
      fecha,
      metodoPago,
      observaciones
    };

    if (id) {
      // Actualiza venta existente
      ventas = ventas.map(v => v.id === id ? ventaData : v);
    } else {
      // Crea nueva venta
      ventas.push(ventaData);
    }

    renderizarTablaVentas(ventas);
    ocultarFormularioVenta();
  }

  /**
   * Prepara el formulario para editar una venta existente
   * @param {string} id - ID de la venta a editar
   */
  function editarVenta(id) {
    const venta = ventas.find(v => v.id === id);
    if (venta) {
      mostrarFormularioVenta(venta);
    }
  }

  /**
   * Elimina una venta después de confirmación
   * @param {string} id - ID de la venta a eliminar
   */
  function eliminarVenta(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
      ventas = ventas.filter(v => v.id !== id);
      renderizarTablaVentas(ventas);
    }
  }

  /**
   * Busca ventas según término de búsqueda
   */
  function buscarVentas() {
    const searchTerm = searchVentaInput.value.toLowerCase();
    const resultados = ventas.filter(venta =>
      venta.cliente.toLowerCase().includes(searchTerm) ||
      venta.cedula.toLowerCase().includes(searchTerm) ||
      venta.metodoPago.toLowerCase().includes(searchTerm) ||
      (venta.observaciones && venta.observaciones.toLowerCase().includes(searchTerm))
    );
    renderizarTablaVentas(resultados);
  }

  // =============================================
  // EVENT LISTENERS
  // =============================================

  // Navegación del sidebar
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      cambiarSeccion(item.dataset.section);
    });
  });

  // Eventos para clientes
  btnCrearCliente.addEventListener('click', mostrarFormularioCliente);
  btnCancelarCliente.addEventListener('click', ocultarFormularioCliente);
  btnGuardarCliente.addEventListener('click', guardarCliente);
  btnBuscarCliente.addEventListener('click', buscarClientes);
  searchClienteInput.addEventListener('input', buscarClientes);

  // Eventos para ventas
  btnCrearVenta.addEventListener('click', mostrarFormularioVenta);
  btnCancelarVenta.addEventListener('click', ocultarFormularioVenta);
  btnGuardarVenta.addEventListener('click', guardarVenta);
  btnBuscarVenta.addEventListener('click', buscarVentas);
  searchVentaInput.addEventListener('input', buscarVentas);

  // Evento para cerrar sesión
  document.getElementById('btnLogout').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      alert('Sesión cerrada. Redirigiendo al inicio...');
      window.location.href = 'Logueo.html';
    }
  });

  // =============================================
  // DATOS INICIALES DE PRUEBA
  // =============================================
  clientes = [
    { 
      id: generarIdUnico(), 
      nombre: 'Juan Pérez', 
      email: 'juan.perez@example.com', 
      telefono: '3001234567',
      asunto: 'Consulta técnica', 
      sms: 'Necesito soporte urgente', 
      fechaIngreso: '2023-05-15' 
    },
    { 
      id: generarIdUnico(), 
      nombre: 'María Gómez', 
      email: 'maria.gomez@example.com',
      asunto: 'Cotización', 
      sms: 'Enviar precios por SMS', 
      fechaIngreso: '2023-06-20' 
    },
    { 
      id: generarIdUnico(), 
      nombre: 'David Pérez', 
      email: 'David.perez@example.com', 
      telefono: '31564899',
      asunto: 'Consulta técnica', 
      sms: 'Cotización', 
      fechaIngreso: '2023-05-15' 
    }
  ];

  ventas = [
    { 
      id: generarIdUnico(), 
      cliente: 'Juan Pérez', 
      cedula: '123456789', 
      direccion: 'Calle 123 #45-67', 
      fecha: '2023-05-15', 
      metodoPago: 'Tarjeta', 
      observaciones: 'Entrega urgente' 
    },
    { 
      id: generarIdUnico(), 
      cliente: 'Juan Pérez', 
      cedula: '123456789', 
      direccion: 'Calle 123 #45-67', 
      fecha: '2023-05-15', 
      metodoPago: 'Tarjeta', 
      observaciones: 'Entrega urgente' 
    }
  ];

  // =============================================
  // INICIALIZACIÓN DE LA APLICACIÓN
  // =============================================
  renderizarTablaClientes(clientes);
  renderizarTablaVentas(ventas);
  cambiarSeccion('clientes');
});