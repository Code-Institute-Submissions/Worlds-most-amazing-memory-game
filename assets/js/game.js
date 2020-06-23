const memoryCards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let memoryCard1, memoryCard2;
let stopUser = false;
let winCondition = 7;
let loseCondition = 40;

const gameRef = document.querySelector('#card-row');

const heroes = [ 
  {
    name: 'Black-Widow',
  },
  {
    name: 'captain-america',
  },
   {
    name: 'captain-marvel',
  },
  {
    name: 'hawkeye',
  },
   {
    name: 'iron-man',
  },
  {
    name: 'spiderman',
  },
   {
    name: 'thanos',
  },
  {
    name: 'the-hulk',
  }
];


  const createHtmlForGame = (heroCards) => {
    heroCards.forEach((hero) => {
    // Create HTML
    let html = ` 
        <div class="memory-card col-sm-6 col-md-4 col-lg-3 my-1" data-framework="${hero.name}">
         <img class="back-face" src="assets/images/marvel-logo.jpg" alt="Marvel Logo">
          <img class="front-face" src="assets/images/${hero.name}.jpg" alt="${hero.name}">
        </div>`;


        gameRef.appendChild(html);  

  });
  
};
// Write HTML
createHtmlForGame(heroes);

  document.querySelector('#click-counter').innerHTML ="<div class='lose-counter'>"+loseCondition+"</div>";

function flipCard(){
//flips the cards over
    loseCondition -= 1;
    document.querySelector('#click-counter').innerHTML ='<div class="lose-counter">'+loseCondition+'</div>';
     if (loseCondition === 0){
        showLoseScreen();
        return;
    }
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
       winCondition +=1;
       if (winCondition === 8){
        showWinScreen();
        return;
    }
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
/*(function shuffleHeroes(){
    memoryCards.forEach(card => {
        let randomize = Math.floor(Math.random() * 16);
        card.style.order = randomize;

    });
})();*/

  

function playAgain(){
      location.reload();
}

function showWinScreen(){
    document.querySelector('#memory-game').innerHTML=`
    <div class="losescreen">
     <h2 class="win-title">You Win!</h2>
      <button id="play-again" class="btn-primary">Play Again</button>
    </div>`;
    document.getElementById("play-again").addEventListener("click", playAgain);
}

function showLoseScreen(){
    document.querySelector('#memory-game').innerHTML=`
    <div class="winscreen">
     <h2 class="lose-title">You Lose!</h2>
      <button id-"play-again" class="btn-primary">Play Again</button>
    </div>`;
    document.getElementById("play-again").addEventListener("click", playAgain);
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));