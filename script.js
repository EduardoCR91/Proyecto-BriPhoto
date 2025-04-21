  // Importar Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  // Tu configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBX79fAnbfQRrlwPVg5Sr4e5qL2is2x7wo",
    authDomain: "proyectobriphoto.firebaseapp.com",
    projectId: "proyectobriphoto",
    storageBucket: "proyectobriphoto.firebasestorage.app",
    messagingSenderId: "635884550744",
    appId: "1:635884550744:web:d2f011f722bf776afce82d"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Tu script adaptado
  document.getElementById('btn-message').addEventListener('click', async function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || subject === '' || message === '') {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    try {
      // Guardar en Firebase Firestore
      await addDoc(collection(db, "mensajes"), {
        nombre: name,
        correo: email,
        asunto: subject,
        mensaje: message,
        fecha: new Date()
      });

      // Mostrar mensaje de confirmación
      const feedback = document.getElementById('feedback');
      feedback.style.display = 'block';

      // Limpiar el formulario
      document.getElementById('contactForm').reset();

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    } catch (error) {
      alert('❌ Ocurrió un error al enviar el mensaje: ' + error.message);
    }
  });
