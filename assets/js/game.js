const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let memoryCard1, memoryCard2;

function flipCard(){
    this.classList.add('flip');

    if(cardFlipped) {
    // first click
    cardFlipped = true;
    memoryCard1 = this;
    // second click
  } else {
      cardFlipped = false;
      memoryCard2 = this;

      //check to see if cards match?
      if (memoryCard1.dataset.framework === memoryCard2.dataset.framework) {
          //if its a match
          memoryCard1.removeEventListener('click', flipCard);
          memoryCard2.removeEventListener('click', flipCard);
      } else {
          //the cards dont match
          setTimeout(() =>{
          memoryCard1.classList.remove('flip');
          memoryCard2.classList.remove('flip');
      }, 1500);
    }
  }
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));