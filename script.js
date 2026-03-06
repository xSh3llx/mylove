const vibrate = () => { if (navigator.vibrate) navigator.vibrate(40); };

function next(num) {
    vibrate();
    document.querySelectorAll('.container').forEach(c => {
        c.classList.add('hidden');
        c.style.display = 'none';
    });
    const target = document.getElementById('s' + num);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.remove('hidden'), 50);
        if (num === 3) initGame();
        if (num === 4) initScratch();
    }
}

const compliments = [
    "Wiki, Twoje wsparcie jest nieocenione! ❤️",
    "Wiki, masz najpiękniejszy uśmiech! 😊",
    "Jesteś niesamowicie mądra, Wiki! 🧠",
    "Wiki, Twoja energia jest zaraźliwa! ⚡",
    "Jesteś po prostu najlepsza, Wiki! 👑"
];

let compCount = 0;
function handleComp(e) {
    if (e) e.preventDefault();
    vibrate();
    const box = document.getElementById('compliment-box');
    box.innerText = compliments[Math.floor(Math.random() * compliments.length)];
    compCount++;
    if (compCount >= 3) document.getElementById('btn-to-game').classList.remove('hidden');
}

window.onload = () => {
    const box = document.getElementById('compliment-box');
    if (box) {
        box.addEventListener('touchstart', handleComp);
        box.addEventListener('click', handleComp);
    }
    const container = document.getElementById('particles-container');
    const imgs = ['1.png', '2.png', '3.png'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = imgs[Math.floor(Math.random() * imgs.length)];
            img.className = 'particle';
            img.style.width = '45px';
            img.style.left = Math.random() * 90 + 'vw';
            img.style.animationDuration = (Math.random() * 3 + 5) + 's';
            container.appendChild(img);
        }, i * 500);
    }
};

let matched = 0;
let flipped = [];

function initGame() {
    matched = 0; flipped = [];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const icons = ['🌸', '🐱', '🎀', '🌸', '🐱', '🎀'].sort(() => Math.random() - 0.5);
    icons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        const flip = (e) => {
            if (e) e.preventDefault();
            if (flipped.length < 2 && !card.classList.contains('flipped')) {
                vibrate();
                card.classList.add('flipped');
                card.innerHTML = card.dataset.icon;
                flipped.push(card);
                if (flipped.length === 2) setTimeout(check, 600);
            }
        };
        card.addEventListener('touchstart', flip);
        card.addEventListener('click', flip);
        grid.appendChild(card);
    });
}

function check() {
    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
        flipped.forEach(c => c.classList.add('matched'));
        matched++;
        if (matched === 3) {
            document.getElementById('game-next-container').innerHTML = '<button class="btn" onclick="next(4)">Dalej ✨</button>';
        }
    } else {
        flipped.forEach(c => { c.classList.remove('flipped'); c.innerHTML = '?'; });
    }
    flipped = [];
}

function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    const scratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
        if (Math.random() > 0.9) document.getElementById('btn-to-final').classList.remove('hidden');
    };
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
}
