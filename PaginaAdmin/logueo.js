document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Validación básica (Se debe implementar la autenticacion real para que cuando el admin
      // ingrese, las credenciales sean las correctas)
      if(username && password) {

        // Simulación de login exitoso, se puede modificar luego de hacer pruebas de validación básica
        alert('Inicio de sesión exitoso. Redirigiendo...');
        window.location.href = 'index.html'; // 
      } else {
        alert('Por favor completa todos los campos');
      }
    });
  });