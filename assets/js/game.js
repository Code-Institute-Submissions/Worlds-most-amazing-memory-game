const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let firstCard, secondCard;

function flipCard(){
    this.classList.add('flip');

    if(cardFlipped) {
    // first click
    cardFlipped = true;
    firstCard = this;
    // second click
  } else {
      cardFlipped = false;
      secondCard = this;

      //check to see if cards match?
      
  }
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));