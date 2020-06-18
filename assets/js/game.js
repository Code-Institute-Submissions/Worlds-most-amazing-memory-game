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
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
          //if its a match
          firstCard.removeEventListener('click', flipCard);
          secondCard.removeEventListener('click', flipCard);
      } else {
          //the cards dont match
          setTimeout(() =>{
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
      }, 1500);
    }
  }
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));