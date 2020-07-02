const gameRef = document.querySelector('#card-row');
const clickcountRef = document.querySelector('#click-counter');
const outcomeScreenRef = document.querySelector('#memory-game');
let cardFlipped = false;
let firstClickedMemoryCard;
let secondClickedMemoryCard;
let stopUser = false;
let winCondition = 0;
let loseCondition = 40;

const heroes = [{
    name: 'black-widow',
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

const duplicateHeroes = heroes.concat(heroes);

/**
 * shufflingHeroes shuffles the heroes before theyre written to html
 * @param {array} 
 */
const shuffle = (shufflingHeroes) => {
  shufflingHeroes.sort(() => Math.random() - 0.5);
};

/**
 * heroCards takes the shuffled cards and writes them to html
 * @param {array} 
 */
const createHtmlForGame = (heroCards) => {
  heroCards.forEach((hero) => {
    gameRef.innerHTML += ` 
        <div class="memory-card col-4 col-md-3 col-lg-3 my-1" data-framework="${hero.name}">
         <img class="back-face" src="assets/images/marvel-logo.jpg" alt="Marvel Logo">
          <img class="front-face" src="assets/images/${hero.name}.jpg" alt="${hero.name}">
        </div>`;
    });
  var memoryCards = document.querySelectorAll('.memory-card');
  memoryCards.forEach(card => card.addEventListener('click', flipCard));
};

shuffle(duplicateHeroes);

createHtmlForGame(duplicateHeroes);

clickcountRef.innerHTML = "<div class='lose-counter'>40 Clicks Left!</div>";

/**
 * adds the flip class and then runs check for match
 */
function flipCard() {
  loseCondition -= 1;
  checkCondition();
  clickcountRef.innerHTML = '<div class="lose-counter">' + loseCondition +
    '  Clicks Left!</div>';

  if (stopUser) return;
  if (this === firstClickedMemoryCard) return;
  this.classList.add('flip');
  if (!cardFlipped) {
    cardFlipped = true;
    firstClickedMemoryCard = this;
    return;
  }
  secondClickedMemoryCard = this;
  checkCardsMatch();
}

/**
 * checks that cards match
 */
const checkCardsMatch = () => {

  let cardsMatch = firstClickedMemoryCard.dataset.framework ===
    secondClickedMemoryCard.dataset.framework;

  cardsMatch ? disableCardFlip() : removeFlipClass();
}

/**
 * checks to make sure you dont lose if you get the final pair on your final click
 */
const checkCondition = () => {
  if (winCondition === 8) {
    showOutcomeScreen(true);
    return;
  }
  if (loseCondition === 0 && winCondition != 8)
    showOutcomeScreen(false);
  return;
}



/** 
 * stops user interacting with matched cards card 
 * */
const disableCardFlip = () => {
  firstClickedMemoryCard.removeEventListener('click', flipCard);
  secondClickedMemoryCard.removeEventListener('click', flipCard);
  winCondition += 1;
  checkCondition();

  resetGame();
}

/**
 * if the cards dont match they turn back over
 */
const removeFlipClass = () => {

  stopUser = true;
  setTimeout(() => {
    firstClickedMemoryCard.classList.remove('flip');
    secondClickedMemoryCard.classList.remove('flip');

    resetGame();

  }, 1500);
}
/** 
 * stops a bug when the user tries to click the same first card twice
 */
const resetGame = () => {
  [cardFlipped, stopUser] = [false, false];
  [firstClickedMemoryCard, secondClickedMemoryCard] = [null, null];
}


/**
 * resets the game 
 */
const playAgain = () => {
  location.reload();
}

/**
 * winorlose shows the win or lose screen 
 * @param {boolean} 
 */
const showOutcomeScreen = (winorlose) => {
  let outcomeText;
  winorlose ? (outcomeText = `You Win!`) : (outcomeText = `You Lose!`)


  outcomeScreenRef.innerHTML = `
    <div class="outcomeScreen">
     <h2 class="outcometext">${outcomeText}</h2>
       <button id="play-again">Play Again</button>
     </div>`;
  document.getElementById('play-again').addEventListener("click", playAgain);
}



