const cartas = document.querySelectorAll('.carta-memoria'); 
let haVolteadoCarta=false; 
let primeraCarta, segundaCarta;
let bloquearTablero=false;

function orden(){

}

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
        }
        return;
    }
    noEsMatch();
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

let segundos=0;
let minutos=3;
let iniciarTemporizador = setInterval(actualizarTemporizador, 1000);

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
function actualizarTemporizador() {
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
    
        let TextSegundos = segundos < 10 ? "0" + segundos : segundos;
        document.getElementById('minutos').innerHTML = minutos;
        document.getElementById('segundos').innerHTML = TextSegundos;
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

    cartas.forEach(carta=>{
        carta.classList.remove('voltear');
        carta.addEventListener('click',voltearCarta);
    });
    resetear();
}
    


}