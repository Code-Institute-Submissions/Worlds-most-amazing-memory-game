const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let memoryCard1, memoryCard2;

function flipCard(){
    this.classList.add('flip');

    if(!cardFlipped) {
    // first click
    cardFlipped = true;
    memoryCard1 = this;

    return;

    // second click
  }
      cardFlipped = false;
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
}

function removeFlipClass(){
          setTimeout(() =>{
          memoryCard1.classList.remove('flip');
          memoryCard2.classList.remove('flip');
      }, 1500);
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));