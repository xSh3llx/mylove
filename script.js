function next(num) {
    document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
    document.getElementById('s' + num).classList.remove('hidden');
    if(num === 3) initGame();
}

function initGame() {
    const icons = ['🌸', '🌷', '🦋', '🌸', '🌷', '🦋'];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    // Перемешивание карточек
    icons.sort(() => Math.random() - 0.5);
    
    icons.forEach((icon) => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        card.onclick = () => flip(card);
        grid.appendChild(card);
    });
}

let flipped = [];
function flip(card) {
    if (flipped.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.icon;
        flipped.push(card);

        if (flipped.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
        flipped.forEach(c => c.classList.add('matched'));
        if (document.querySelectorAll('.matched').length === 6) {
            setTimeout(() => next(4), 500);
        }
    } else {
        flipped.forEach(c => {
            c.classList.remove('flipped');
            c.innerHTML = '?';
        });
    }
    flipped = [];
}
