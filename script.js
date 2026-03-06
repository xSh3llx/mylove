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
        if (num === 3) initScratch();
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
    if (compCount >= 3) {
        const btn = document.getElementById('btn-to-scratch');
        if (btn) btn.classList.remove('hidden');
    }
}

window.onload = () => {
    const box = document.getElementById('compliment-box');
    if (box) {
        box.addEventListener('touchstart', handleComp, {passive: false});
        box.addEventListener('click', handleComp);
    }

    // АНИМАЦИЯ КОТИКОВ (HELLO KITTY)
    const container = document.getElementById('particles-container');
    const imgs = ['1.png', '2.png', '3.png']; 
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = imgs[Math.floor(Math.random() * imgs.length)];
            img.className = 'particle';
            // Рандомные размеры и позиции
            const size = Math.random() * 20 + 40;
            img.style.width = size + 'px';
            img.style.left = Math.random() * 90 + 'vw';
            img.style.animationDuration = (Math.random() * 4 + 6) + 's';
            img.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(img);
        }, i * 600);
    }
};

function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    
    let totalErased = 0;

    const scratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); 
        ctx.arc(x, y, 25, 0, Math.PI * 2); 
        ctx.fill();
        
        totalErased++;
        if (totalErased > 40) {
            const btn = document.getElementById('btn-to-final');
            if (btn) btn.classList.remove('hidden');
        }
    };
    
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); }, {passive: false});
    canvas.addEventListener('mousemove', (e) => { if(e.buttons === 1) scratch(e); });
}
