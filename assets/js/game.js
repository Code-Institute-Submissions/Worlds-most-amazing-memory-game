const gameRef = document.querySelector('#card-row');
const clickcountRef = document.querySelector('#click-counter');
const outcomeScreenRef = document.querySelector('#memory-game');

let cardFlipped = false;
let firstClickedMemoryCard;
let secondClickedMemoryCard;
let stopUser = false;
let winCondition = 0;
let loseCondition = 40;



const heroes = [ 
  {
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






const shuffle = (shufflingHeroes) => {
  shufflingHeroes.sort(() => Math.random() - 0.5);
};


  const createHtmlForGame = (heroCards) => {
    heroCards.forEach((hero) => {
    // Create HTML


        gameRef.innerHTML +=  ` 
        <div class="memory-card col-3 col-md-3 col-lg-3 my-1" data-framework="${hero.name}">
         <img class="back-face" src="assets/images/marvel-logo.jpg" alt="Marvel Logo">
          <img class="front-face" src="assets/images/${hero.name}.jpg" alt="${hero.name}">
        </div>`;
  });
  
};
// Shuffle the heroes
shuffle(duplicateHeroes);

// Write HTML with shuffled heroes
createHtmlForGame(duplicateHeroes);


  const memoryCards = document.querySelectorAll('.memory-card');
  clickcountRef.innerHTML ="<div class='lose-counter'>"+loseCondition+"  Clicks Left!</div>";

function flipCard(){
//flips the cards over
    loseCondition -= 1;
    document.querySelector('#click-counter').innerHTML ='<div class="lose-counter">'+loseCondition+'  Clicks Left!</div>';
     if (loseCondition === 0){
        showOutcomeScreen(false);
        return;
    }
    if (stopUser) return; // stops cards being flipped whilst flipped cards are being checked
    if (this === firstClickedMemoryCard) return; // when a card has been flipped this code wont run
    this.classList.add('flip');
    if(!cardFlipped) {
    // first click
    cardFlipped = true;
    firstClickedMemoryCard = this;

    return;
    }
    // second click
      secondClickedMemoryCard = this;
    checkCardsMatch();  

    
  }


const checkCardsMatch = () => {
//check to see if cards match?
       let cardsMatch = firstClickedMemoryCard.dataset.framework === secondClickedMemoryCard.dataset.framework;

       cardsMatch ? disableCardFlip() : removeFlipClass();

    }

/** 
 * stops user interacting with matched cards card 
 * */ 

const disableCardFlip = () => {
       firstClickedMemoryCard.removeEventListener('click', flipCard);
       secondClickedMemoryCard.removeEventListener('click', flipCard);
       winCondition +=1;
       if (winCondition === 8){
        showOutcomeScreen(true);
        return;
    }
       resetGame();
}

const removeFlipClass = () =>{

    stopUser = true;
          setTimeout(() =>{
          firstClickedMemoryCard.classList.remove('flip');
          secondClickedMemoryCard.classList.remove('flip');

          resetGame();

      }, 1500);
}

const resetGame = () =>{
    [cardFlipped, stopUser] = [false, false];
    [firstClickedMemoryCard, secondClickedMemoryCard] = [null,null];
}

  

const playAgain = () => {
      location.reload();
}


const showOutcomeScreen = (winorlose) => {
let outcomeText;
winorlose ? (outcomeText = `You Win`) : (outcomeText = `You Lose!`)

outcomeScreenRef.innerHTML=`
    <div class="outcomeScreen">
     <h2 class="outcometext">${outcomeText}</h2>
       <button id="play-again">Play Again</button>
     </div>`;
    document.getElementById("play-again").addEventListener("click", playAgain);
}



memoryCards.forEach(card => card.addEventListener('click', flipCard));