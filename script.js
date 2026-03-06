const vibrate = () => window.navigator.vibrate && window.navigator.vibrate(40);

function next(num) {
    vibrate();
    document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
    setTimeout(() => {
        const target = document.getElementById('s' + num);
        if(target) {
            target.classList.remove('hidden');
            if(num === 3) initGame();
            if(num === 4) initScratch();
        }
    }, 400);
}

// 1. Комплименты
const compliments = [
    "Twój uśmiech rozjaśnia każdy dzień! ☀️",
    "Jesteś niesamowicie mądra i zdolna! 🧠",
    "Masz najlepszy styl na świecie! 👗",
    "Twoja energia jest po prostu zaraźliwa! ⚡",
    "Zawsze potrafisz mnie rozśmieszyć! 😂",
    "Jesteś najpiękniejszą osobą, jaką znam! 💖"
];
let compCount = 0;
function getRandomCompliment() {
    vibrate();
    const box = document.getElementById('compliment-box');
    const randomComp = compliments[Math.floor(Math.random() * compliments.length)];
    box.innerText = randomComp;
    compCount++;
    if(compCount >= 3) document.getElementById('btn-to-game').classList.remove('hidden');
}

// 2. Частицы (Hello Kitty)
window.onload = () => {
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

// 3. Игра Memory
function initGame() {
    const icons = ['🌸', '🐱', '🎀', '🌸', '🐱', '🎀'];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    icons.sort(() => Math.random() - 0.5);
    icons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        card.onclick = () => {
            if (flipped.length < 2 && !card.classList.contains('flipped')) {
                vibrate();
                card.classList.add('flipped');
                card.innerHTML = card.dataset.icon;
                flipped.push(card);
                if (flipped.length === 2) setTimeout(checkMatch, 600);
            }
        };
        grid.appendChild(card);
    });
}

let flipped = [];
function checkMatch() {
    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
        flipped.forEach(c => {
            c.style.backgroundColor = '#4caf50';
            setTimeout(() => c.style.visibility = 'hidden', 300);
        });
        if (document.querySelectorAll('.card-game:not([style*="hidden"])').length === 0) {
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

// 4. Скретч-карта
function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    
    let scratchPoints = 0;
    const handleScratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        scratchPoints++;
        if(scratchPoints > 50) {
            document.getElementById('btn-to-final').classList.remove('hidden');
        }
    };

    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); handleScratch(e); }, { passive: false });
}
