const cartas = document.querySelectorAll('.carta-memoria'); 
let haVolteadoCarta=false; 
let primeraCarta, segundaCarta;
let bloquearTablero=false;
let pt;

const botonEnviar = document.querySelector(".submit");
let segundos=0;
let minutos=3;
let iniciarTemporizador = setInterval(actualizarTemporizador, 1000);
const tablaPuntajes = document.getElementById("tabla-puntajes");
const filas = Array.from(tablaPuntajes.querySelectorAll("tbody tr"));

const cerrarPuntaje=document.querySelector('.cerrarPuntaje');
var cerrar = document.querySelector(".cerrar");
// console.log('4')
cerrar.addEventListener("click", ()=> {
    console.log('5')
  ocultarModal();
  console.log('6')
});

cerrarPuntaje.addEventListener("click", ()=> {
    console.log('5')
    var modal = document.getElementById("modalPuntaje").style.display = "none";;
  console.log('6')
});

function voltearCarta() {
  
    console.log('se hizo click en la carta')
    if (bloquearTablero)return;
    if(this==primeraCarta)return;
    this.classList.add('voltear');

    if(!haVolteadoCarta){
    haVolteadoCarta=true;
    primeraCarta=this;
    return;

}

segundaCarta=this;


match();
}

function match(){
 

    if (primeraCarta.dataset.framework==segundaCarta.dataset.framework){
        desabilitarCartas();
        if(document.querySelectorAll('.voltear').length===cartas.length){
           
            clearInterval(iniciarTemporizador)
            puntaje();
            mostrarModal();
        }
     
    }else{
        noEsMatch();
    }

}
function desabilitarCartas(){
    primeraCarta.removeEventListener('click',voltearCarta);
    segundaCarta.removeEventListener('click',voltearCarta);
    resetear();
}
function noEsMatch(){
    bloquearTablero=true;

    setTimeout(()=>{
        primeraCarta.classList.remove('voltear');
        segundaCarta.classList.remove('voltear');
        resetear();
  
    },1300);

    
}
function resetear(){
    haVolteadoCarta=false;
    bloquearTablero=false;
    primeraCarta=null;
    segundaCarta=null;
}
 (function cambiarOrdenCartas(){
   cartas.forEach(carta=>{
        let posicionRandom=Math.floor(Math.random()*16);
        carta.style.order=posicionRandom;
    });
})();

cartas.forEach(carta => carta.addEventListener('click', voltearCarta));


// function puntaje(tiempoRestante, tiempoTotal, maxPuntuacion) {
//     let puntuacion = maxPuntuacion * (tiempoRestante / tiempoTotal);
//     let puntosCalculados = Math.floor(puntuacion); // crear una variable local para puntos
//     return puntosCalculados; // retornar la variable local
//   }
  

function actualizarTemporizador() {
    if (segundos < 0) {
        segundos = 59;
        minutos--;
        if (minutos < 0) {
            minutos = 0;
            clearInterval(iniciarTemporizador);
            console.log('tiempo acabado');
        }
    }

    let TextSegundos = segundos < 10 ? `0${segundos}` : segundos;
    let TextMinutos = minutos < 10 ? `0${minutos}` : minutos;

    document.getElementById('segundos').innerHTML = TextSegundos;
    document.getElementById('minutos').innerHTML = TextMinutos;

    segundos--;

}


const botonReiniciar=document.getElementById('reiniciarPartida');
botonReiniciar.addEventListener('click',reiniciarPartida);

function reiniciarPartida(){
    clearInterval(iniciarTemporizador);
    segundos=0;
    minutos=3;
    
    iniciarTemporizador=setInterval(actualizarTemporizador,1000);
    document.getElementById('segundos').innerHTML='--';
    document.getElementById('minutos').innerHTML='--';
    punto.innerHTML='00'
    cartas.forEach(carta=>{
        carta.classList.remove('voltear');
        carta.addEventListener('click',voltearCarta);
    });
    resetear();
}

function obtenerTiempoRestante() {
    let minutosRestantes = parseInt(document.getElementById('minutos').innerHTML);
    let segundosRestantes = parseInt(document.getElementById('segundos').innerHTML);
    let tiempoRestante = minutosRestantes * 60 + segundosRestantes;
    return tiempoRestante;
  }
  


  function puntaje() {
    let tiempoRestante = obtenerTiempoRestante();
    let tiempoTotal = 180;
    let maxPuntuacion=100; 
    let puntuacion = maxPuntuacion * (tiempoRestante / tiempoTotal);
    let ptos= Math.floor(puntuacion);
    punto.innerHTML= ptos;
    pt=ptos;
    // return ptos;

}



function mostrarModal() {
    console.log('1')
    var modal = document.getElementById("modal");
    console.log('2')
    modal.style.display = "flex";
    console.log('3')

 
  }
  

  function ocultarModal() {
    console.log('7')
    punto.innerHTML='00'
    document.getElementById('segundos').innerHTML='--';
    document.getElementById('minutos').innerHTML='--';
    document.getElementById("modal").style.display = "none";
  
    console.log('8')
  
  }


// const botonEnviar = document.querySelector("button[type='submit']");
botonEnviar.addEventListener("click", (event)=> {
    event.preventDefault(); // Prevenir que se envíe el formulario
    console.log('kjnhbgvfcdcgvhbjnkml,;')

  const inputNombre = document.getElementById("nombre").value;
  const inputApellido = document.getElementById("apellido").value;

  let users=[];
  if(JSON.parse(localStorage.getItem('users')) !=null){
    users=JSON.parse(localStorage.getItem('users'))
    users.push({name:inputNombre,lastName:inputApellido,score:pt})
  }else{
    users.push({name:inputNombre,lastName:inputApellido,score:pt})
  }
  localStorage.setItem('users',JSON.stringify(users))
  ocultarModal()
  document.getElementById('segundos').innerHTML='--';
  document.getElementById('minutos').innerHTML='--';
  punto.innerHTML='00'
  cartas.forEach(carta=>{
    carta.classList.remove('voltear');
    carta.addEventListener('click',voltearCarta);
});
document.getElementById("modalPuntaje").style.display = "flex";
tablaPuntajesCalcular()
resetear();

});
function tablaPuntajesCalcular() {
    let users=[];
    if(JSON.parse(localStorage.getItem('users')) !=null){
      users=JSON.parse(localStorage.getItem('users'))
      
    }
    users.sort((a, b) => b.score - a.score);
for(let i=0;i<users.length;i++){
    agregarFila(users[i].name+' '+users[i].lastName, users[i].score)
}
    
}

function agregarFila(nombre, puntaje) {
    console.log('crear')
    const fila = document.createElement("tr");
    const celdaNombre = document.createElement("td");
    const celdaPuntaje = document.createElement("td");
    celdaNombre.textContent = nombre;
    celdaPuntaje.textContent = puntaje;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntaje);
    tablaPuntajes.querySelector("tbody").appendChild(fila);

}
  



  

