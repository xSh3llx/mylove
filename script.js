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

let flipped = [];
function checkMatch() {
    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
        flipped.forEach(c => {
            c.classList.add('matched');
            c.style.backgroundColor = '#4caf50';
        });
        const totalMatched = document.querySelectorAll('.card-game.matched').length;
        if (totalMatched === 6) {
            vibrate();
            setTimeout(() => next(4), 800);
        }
    } else {
        flipped.forEach(c => {
            c.classList.remove('flipped');
            c.innerHTML = '?';
        });
    }
    flipped = [];
}

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
        if(points > 60) document.getElementById('btn-to-final').classList.remove('hidden');
    };
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); }, {passive: false});
}
