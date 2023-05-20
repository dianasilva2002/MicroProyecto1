const cartas = document.querySelectorAll('.carta-memoria'); 
let haVolteadoCarta=false; 
let primeraCarta, segundaCarta;
let bloquearTablero=false;


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






cartas.forEach(carta => carta.addEventListener('click', voltearCarta));