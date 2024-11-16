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
    widthVid = 100/3;//slider.length//cuenta la cantidad de imagenes en carruceles
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
        operacion = widthVid*(3-1)//slider.length-1
        deslisador.style.transform = `translate(-${operacion}%)`
        deslisador.style.transition = "none"
    }else{
        operacion = operacion - widthVid;
        deslisador.style.transform = `translate(-${operacion}%)`// mueve el contenedor carruceles a la derecha
        deslisador.style.transition = "all ease .6s"// realiza una transicion suave
    }
}