const gameRef = document.querySelector('#memory-game');
const heroes = [
  {
    name: 'Black Widow',
    imageUrl: 'black-widow.jpg',
  },
  {
    name: 'captain america',
    imageUrl: 'captain-america.jpg',
  },
  {
    name: 'The Hulk',
    imageUrl: 'the-hulk.jpg',
  },
  {
    name: 'Captain Marvel',
    imageUrl: 'captain-marvel.jpg',
  },
  {
    name: 'Spiderman',
    imageUrl: 'spiderman.jpg',
  },
  {
    name: 'Star Lord',
    imageUrl: 'star-lord.jpg',
  },
  {
    name: 'Thanos',
    imageUrl: 'thanos.jpg',
  },
  {
    name: 'Thor',
    imageUrl: 'thor.jpg',
  },
];
const shuffle = (heroCards) => {
  heroCards.sort(() => Math.random() - 0.5);
};
const createHtmlForGame = (shuffledHeroes) => {
  shuffledHeroes.forEach((hero) => {
    // Create HTML
    let html = ` <img class="back-face" src="assets/images/marvel-logo.jpg" alt="Marvel Logo">
              <img class="front-face" src="assets/images/${hero.imageUrl}" alt="${hero.name}">`;
    
            document.getElementsByClassName('.memory-game').innerHTML += (html);
    

  });
};
// Shuffle the card and store in variable
const shuffledCards = shuffle(heroes);
// Write HTML
createHtmlForGame(shuffledCards);














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

/*(function shuffleHeroes(){
    memoryCards.forEach(card => {
        let randomize = math.floor(math.random() * 16);
        cards.style.order = randomize;

    });
})();*/

memoryCards.forEach(card => card.addEventListener('click', flipCard));