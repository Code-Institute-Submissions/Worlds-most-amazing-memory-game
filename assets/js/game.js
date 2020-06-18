const memoryCards = document.querySelectorAll('.memory-card');

function flipCard(){
    this.classList.toggle('flip');
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));