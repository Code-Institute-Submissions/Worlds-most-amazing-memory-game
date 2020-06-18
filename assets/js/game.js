const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let memoryCard1, memoryCard2;
let stopUser = false;

function flipCard(){
    if (stopUser) return;
    if (this === memoryCard1) return;
    this.classList.add('flip');

    if(!cardFlipped) {
    // first click
    cardFlipped = true;
    memoryCard1 = this;

    return;
    }
    // second click

      memoryCard2 = this;

    checkCardsMatch();  
  }


function checkCardsMatch() {
//check to see if cards match?
       let cardsMatch = memoryCard1.dataset.framework === memoryCard2.dataset.framework;

       cardsMatch ? disableCardFlip() : removeFlipClass();
      
    }


function disableCardFlip(){
       memoryCard1.removeEventListener('click', flipCard);
       memoryCard2.removeEventListener('click', flipCard);

       resetGame();
}

function removeFlipClass(){

    stopUser = true;
          setTimeout(() =>{
          memoryCard1.classList.remove('flip');
          memoryCard2.classList.remove('flip');

          resetGame();

      }, 1500);
}

function resetGame(){
    [cardFlipped, stopUser] = [false, false];
    [memoryCard1, memoryCard2] = [null,null];
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));