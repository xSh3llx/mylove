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

let score = 0;
let gameInterval;
function initGame() {
    score = 0;
    const area = document.getElementById('game-area');
    area.innerHTML = '';
    document.getElementById('game-score').innerText = "Złapano: 0 / 5";
    gameInterval = setInterval(() => {
        if (score < 5) createHeart();
        else clearInterval(gameInterval);
    }, 1000);
}

function createHeart() {
    const area = document.getElementById('game-area');
    const heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * (area.clientWidth - 50) + 'px';
    heart.style.top = Math.random() * (area.clientHeight - 50) + 'px';
    const pop = (e) => {
        if (e) e.preventDefault();
        vibrate();
        score++;
        heart.remove();
        document.getElementById('game-score').innerText = `Złapano: ${score} / 5`;
        if (score === 5) {
            document.getElementById('game-next-container').innerHTML = '<button class="btn" onclick="next(4)">Dalej ✨</button>';
        }
    };
    heart.addEventListener('touchstart', pop);
    heart.addEventListener('click', pop);
    area.appendChild(heart);
    setTimeout(() => { if(heart) heart.remove(); }, 2000);
}

function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    const scratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2); ctx.fill();
        if (Math.random() > 0.95) document.getElementById('btn-to-final').classList.remove('hidden');
    };
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
}
