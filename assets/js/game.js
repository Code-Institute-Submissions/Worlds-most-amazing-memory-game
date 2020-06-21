const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let memoryCard1, memoryCard2;
let stopUser = false;
let winCondition = 0;

function flipCard(){

//flips the cards over

    if (stopUser) return; // stops cards being flipped whilst flipped cards are being checked
    if (this === memoryCard1) return; // when a card has been flipped this code wont run
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

    if (winCondition === 7){
        showWinScreen();
        return;
    }
  }


function checkCardsMatch() {
//check to see if cards match?
       let cardsMatch = memoryCard1.dataset.framework === memoryCard2.dataset.framework;

       cardsMatch ? disableCardFlip() : removeFlipClass();

    }

// stops user interacting with matched cards card 

function disableCardFlip(){
       memoryCard1.removeEventListener('click', flipCard);
       memoryCard2.removeEventListener('click', flipCard);
       winCondition +-1;
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
// shufles the cards at the beginning of the game
(function shuffleHeroes(){
    memoryCards.forEach(card => {
        let randomize = Math.floor(Math.random() * 16);
        card.style.order = randomize;

    });
})();

function showWinScreen(){
    concole.log(this);
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));