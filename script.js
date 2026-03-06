// Вибрация для iPhone (Taptic Engine)
const vibrate = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(40); // Короткий мягкий удар
    }
};

function next(num) {
    vibrate();
    document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
    setTimeout(() => {
        const nextS = document.getElementById('s' + num);
        nextS.classList.remove('hidden');
        if(num === 3) initGame();
    }, 400);
}

function createParticles() {
    const container = document.getElementById('particles-container');
    const images = ['1.png', '2.png', '3.png']; // Лежат в корне рядом с index.html
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = 'particle';
            img.style.width = (Math.random() * 20 + 40) + 'px'; // 40-60px для iPhone
            img.style.left = Math.random() * 90 + 'vw';
            img.style.animationDuration = (Math.random() * 4 + 6) + 's';
            img.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(img);
        }, i * 400);
    }
}

function initGame() {
    const icons = ['🌸', '🐱', '🎀', '🌸', '🐱', '🎀'];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
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
        vibrate();
        card.classList.add('flipped');
        card.innerHTML = card.dataset.icon;
        flipped.push(card);
        if (flipped.length === 2) setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
        flipped.forEach(c => {
            c.style.transition = '0.3s';
            c.style.transform = 'scale(0)';
            c.classList.add('matched');
        });
        if (document.querySelectorAll('.matched').length === 6) {
            vibrate();
            setTimeout(() => next(4), 600);
        }
    } else {
        flipped.forEach(c => {
            c.classList.remove('flipped');
            c.innerHTML = '?';
        });
    }
    flipped = [];
}

window.onload = createParticles;
