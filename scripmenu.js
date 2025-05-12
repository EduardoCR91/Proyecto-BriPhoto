document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en un dispositivo móvil o pantalla pequeña
    const isMobile = window.innerWidth <= 600;
    
    if (isMobile) {
        // Obtener el elemento de servicios
        const serviciosMenu = document.getElementById('servicios');
        
        if (serviciosMenu) {
            // Prevenir el comportamiento por defecto del enlace en móviles
            serviciosMenu.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Obtener el submenú asociado
                const submenu = this.nextElementSibling;
                
                // Alternar la visibilidad del submenú
                if (submenu) {
                    submenu.classList.toggle('show-submenu');
                    this.parentElement.classList.toggle('active');
                }
            });
            
            // Cerrar el menú cuando se hace clic fuera de él
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.menu')) {
                    const allSubmenus = document.querySelectorAll('.submenu');
                    allSubmenus.forEach(submenu => {
                        submenu.classList.remove('show-submenu');
                    });
                    
                    const allActiveItems = document.querySelectorAll('.menu ul li.active');
                    allActiveItems.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
        }
    }
});