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
            clearInterval(intervalid)
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
let intervalid = setInterval(actualizarTemporizador, 1000);

function actualizarTemporizador(){
    let TextSegundos;

    if(segundos< 0){
        segundos=59;
    }

    if(segundos< 10){
        TextSegundos= `0${segundos}`
    }else{
        TextSegundos=segundos
    }
    document.getElementById('segundos').innerHTML = TextSegundos;
    segundos--;
   
    actualizarMins(segundos);
}

function actualizarMins(segundos){
    let TextMin;
    if(segundos==-1 & minutos!=0){
        setTimeout(()=>{
            minutos --;
        }, 500)
    }else if(segundos==-1 & minutos==0){
        setTimeout(()=>{
            minutos= 0;
            clearInterval(intervalid)
        }, 500)

    }

    if(segundos< 10){
        TextMin= `0${minutos}`
    }else{
        TextMin=minutos;
        setInterval(0, 1000)
        console.log(`El tiempo se ha acabado`)
    }
    document.getElementById('minutos').innerHTML = TextMin;
    


}