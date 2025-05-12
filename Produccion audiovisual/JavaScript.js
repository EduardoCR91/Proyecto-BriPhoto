//llamado de variables del HTML
const btnLeft = document.querySelector(".boton_izq"),
      btnRigt = document.querySelector(".boton_der"),
      deslisador = document.querySelector("#deslisador")//,
      //slider= document.querySelectorAll(".Slider")
      ;
//variables de movimiento en los botones
btnLeft.addEventListener("click", e => moveToLeft())
btnRigt.addEventListener("click", e => moveToRight())
//variables para simplificar operaciones
let operacion = 0;
    counter = 0,
    widthVid = 100/2;//slider.length//cuenta la cantidad de imagenes en carruceles
function moveToRight() {
    if(counter >= 2-1){ //slider.length-1//me permite volver a la primera imagen al acabar el carrucel
        counter=0;
        operacion=0;
        deslisador.style.transform = `translate(-${operacion}%)`;//mueve el contenedor carrucel a la derecha
        deslisador.style.transition = "none"//cancela la animacion de regreso
    }else{
        counter++;
        operacion = operacion + widthVid;
        deslisador.style.transform = `translate(-${operacion}%)`// mueve el contenedor carruceles a la izquierda
        deslisador.style.transition = "all ease .6s"
    }
}
function moveToLeft(){
    counter--;//resetea el valor de counter
    if(counter < 0 ){
        counter = 2-1;//slider.length-1
        operacion = widthVid*(2-1)//slider.length-1
        deslisador.style.transform = `translate(-${operacion}%)`
        deslisador.style.transition = "none"
    }else{
        operacion = operacion - widthVid;
        deslisador.style.transform = `translate(-${operacion}%)`// mueve el contenedor carruceles a la derecha
        deslisador.style.transition = "all ease .6s"// realiza una transicion suave
    }
}
// Añadir este código a tu archivo JavaScript.js para mejorar la responsividad

// Función para ajustar la altura del iframe según la altura del video
function adjustIframeHeight() {
  const videos = document.querySelectorAll('.Slider video');
  const iframes = document.querySelectorAll('.Slider iframe');
  
  if (videos.length > 0 && iframes.length > 0) {
    // Si existe un video de referencia, ajustar la altura del iframe
    const videoHeight = videos[0].clientHeight;
    iframes.forEach(iframe => {
      iframe.style.height = `${videoHeight}px`;
    });
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Ajustar altura inicial
  adjustIframeHeight();
  
  // Ajustar cuando cambie el tamaño de la ventana
  window.addEventListener('resize', adjustIframeHeight);
  
  // Mejorar la interacción del carrusel para que funcione mejor en móviles
  const slider = document.getElementById('deslisador');
  const btnLeft = document.querySelector('.boton_izq');
  const btnRight = document.querySelector('.boton_der');
  
  if (slider && btnLeft && btnRight) {
    let position = 0;
    const slides = slider.querySelectorAll('.Slider').length;
    
    btnLeft.addEventListener('click', function() {
      position = position > 0 ? position - 1 : slides - 1;
      slider.style.transform = `translateX(-${position * 100 / slides}%)`;
      adjustIframeHeight(); // Reajustar después del movimiento
    });
    
    btnRight.addEventListener('click', function() {
      position = position < slides - 1 ? position + 1 : 0;
      slider.style.transform = `translateX(-${position * 100 / slides}%)`;
      adjustIframeHeight(); // Reajustar después del movimiento
    });
  }
});
// mas ajustes para la interactividad del carucel para cuadno es en pantallas pequeñas
// JavaScript mejorado para el carrusel con manejo de iframe

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('deslisador');
  const btnLeft = document.querySelector('.boton_izq');
  const btnRight = document.querySelector('.boton_der');
  const areaLeft = document.querySelector('.area-izq');
  const areaRight = document.querySelector('.area-der');
  const iframes = document.querySelectorAll('.Slider iframe');
  
  // Función para ajustar tamaños
  function adjustSizes() {
    const videos = document.querySelectorAll('.Slider video');
    
    if (videos.length > 0 && iframes.length > 0) {
      const videoHeight = videos[0].clientHeight;
      iframes.forEach(iframe => {
        iframe.style.height = `${videoHeight}px`;
      });
    }
  }
  
  // Inicialización
  let position = 0;
  const slides = slider.querySelectorAll('.Slider').length;
  
  // Función para mover el carrusel
  function moveSlider(newPosition) {
    position = newPosition;
    slider.style.transform = `translateX(-${position * 100 / slides}%)`;
    
    // Desactivar temporalmente la interacción con el iframe durante la transición
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'none';
    });
    
    // Reactivar la interacción después de la transición
    setTimeout(() => {
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'auto';
      });
    }, 500);
    
    adjustSizes();
  }
  
  // Evento para el botón izquierdo
  if (btnLeft) {
    btnLeft.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar propagación del evento
      const newPosition = position > 0 ? position - 1 : slides - 1;
      moveSlider(newPosition);
    });
  }
  
  // Evento para el botón derecho
  if (btnRight) {
    btnRight.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar propagación del evento
      const newPosition = position < slides - 1 ? position + 1 : 0;
      moveSlider(newPosition);
    });
  }
  
  // Eventos para las áreas de protección (opcional)
  if (areaLeft) {
    areaLeft.addEventListener('mouseover', function() {
      // Desactivar interacción con iframe cuando el mouse está cerca del botón izquierdo
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });
    });
    
    areaLeft.addEventListener('mouseout', function() {
      // Reactivar interacción cuando el mouse se aleja
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'auto';
      });
    });
    
    // Hacer que el área izquierda también active el botón izquierdo
    areaLeft.addEventListener('click', function() {
      btnLeft.click();
    });
  }
  
  // Similar para el área derecha
  if (areaRight) {
    areaRight.addEventListener('mouseover', function() {
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });
    });
    
    areaRight.addEventListener('mouseout', function() {
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'auto';
      });
    });
    
    areaRight.addEventListener('click', function() {
      btnRight.click();
    });
  }
  
  // Ajustar tamaños iniciales
  adjustSizes();
  
  // Ajustar cuando cambia el tamaño de la ventana
  window.addEventListener('resize', adjustSizes);
  
  // Control de teclado (opcional)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      btnLeft.click();
    } else if (e.key === 'ArrowRight') {
      btnRight.click();
    }
  });
});