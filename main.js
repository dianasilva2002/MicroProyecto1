const cartas = document.querySelectorAll('.carta-memoria');
let haVolteadoCarta=false;
let primeraCarta, segundaCarta;

function voltearCarta() {
  console.log('se hizo click en la carta')
  this.classList.add('voltear');

  if(!haVolteadoCarta){
    haVolteadoCarta=true;
    primeraCarta=this;
    return;

}

segundaCarta=this;
haVolteadoCarta=false;

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
    primeraCarta.removeEventListener('click',voltearCarta)
    segundaCarta.removeEventListener('click',voltearCarta)
}
function noEsMatch(){
    setTimeout(()=>{
        primeraCarta.classList.remove('voltear');
        segundaCarta.classList.remove('voltear');
    },1300);

    
}




cartas.forEach(carta => carta.addEventListener('click', voltearCarta));