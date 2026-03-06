const vibrate = () => window.navigator.vibrate && window.navigator.vibrate(40);

function next(num) {
    vibrate();
    document.querySelectorAll('.container').forEach(c => {
        c.classList.add('hidden');
        c.style.display = 'none';
    });
    const target = document.getElementById('s' + num);
    if(target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.remove('hidden'), 50);
        if(num === 3) initGame();
        if(num === 4) initScratch();
    }
}

// ГЕНЕРАТОР КОМПЛИМЕНТОВ
const compliments = [
    "Wiki, Twoje wsparcie jest nieocenione! ❤️",
    "Wiki, masz najpiękniejszy uśmiech! 😊",
    "Jesteś niesamowicie mądra, Wiki! 🧠",
    "Wiki, Twoja energia jest zaraźliwa! ⚡",
    "Zawsze potrafisz mnie rozśmieszyć! 😂",
    "Jesteś po prostu najlepsza, Wiki! 👑"
];

let compCount = 0;
function handleCompliment(e) {
    if (e) e.preventDefault();
    vibrate();
    const box = document.getElementById('compliment-box');
    box.innerText = compliments[Math.floor(Math.random() * compliments.length)];
    compCount++;
    if(compCount >= 3) document.getElementById('btn-to-game').classList.remove('hidden');
}

window.onload = () => {
    const box = document.getElementById('compliment-box');
    if(box) {
        box.addEventListener('touchstart', handleCompliment, {passive: false});
        box.addEventListener('click', handleCompliment);
    }

    const container = document.getElementById('particles-container');
    const images = ['1.png', '2.png', '3.png'];
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = 'particle';
            img.style.width = (Math.random() * 20 + 40) + 'px';
            img.style.left = Math.random() * 90 + 'vw';
            img.style.animationDuration = (Math.random() * 4 + 7) + 's';
            img.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(img);
        }, i * 400);
    }
};

// --- ЛОГИКА ИГРЫ (С КНОПКОЙ "ДАЛЕЕ" В КОНЦЕ) ---
let matchedPairs = 0;
let flipped = [];

function initGame() {
    matchedPairs = 0;
    flipped = [];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    // Добавляем контейнер для кнопки "Далее", если его нет
    let nextContainer = document.getElementById('game-next-container');
    if (!nextContainer) {
        nextContainer = document.createElement('div');
        nextContainer.id = 'game-next-container';
        grid.parentNode.appendChild(nextContainer);
    }
    nextContainer.innerHTML = ''; 

    const icons = ['🌸', '🐱', '🎀', '🌸', '🐱', '🎀'];
    icons.sort(() => Math.random() - 0.5);
    
    icons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        
        const flipAction = (e) => {
            if (e) e.preventDefault();
            if (flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                vibrate();
                card.classList.add('flipped');
                card.innerHTML = card.dataset.icon;
                flipped.push(card);
                if (flipped.length === 2) setTimeout(checkMatch, 600);
            }
        };

        card.addEventListener('touchstart', flipAction, {passive: false});
        card.addEventListener('click', flipAction);
        grid.appendChild(card);
    });
}

function checkMatch() {
    const [card1, card2] = flipped;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        vibrate();

        if (matchedPairs === 3) {
            // ВМЕСТО АВТО-ПЕРЕХОДА — ПОКАЗЫВАЕМ КНОПКУ
            const nextContainer = document.getElementById('game-next-container');
            nextContainer.innerHTML = `<button class="btn" onclick="next(4)">Brawo! Kliknij dalej ✨</button>`;
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
        card2.innerHTML = '?';
    }
    flipped = [];
}

// --- СКРЕТЧ-КАРТА ---
function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    let points = 0;
    const scratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
        points++;
        if(points > 50) document.getElementById('btn-to-final').classList.remove('hidden');
    };
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); }, {passive: false});
}
