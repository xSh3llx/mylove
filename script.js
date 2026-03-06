// Вибрация для iPhone (Taptic Engine)
const vibrate = () => {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(40); // Короткий мягкий удар
    }
};

// Переход между экранами
function next(num) {
    vibrate();
    // Скрываем все контейнеры
    document.querySelectorAll('.container').forEach(c => {
        c.classList.add('hidden');
        c.style.display = 'none';
    });
    
    const target = document.getElementById('s' + num);
    if (target) {
        target.style.display = 'block';
        // Небольшая задержка для плавности анимации появления
        setTimeout(() => target.classList.remove('hidden'), 50);
        
        // Если переходим к скретч-карте (экран 3)
        if (num === 3) initScratch();
    }
}

// АНИМАЦИЯ КОТИКОВ (КАК В ПЕРВОМ ВАРИАНТЕ)
function createParticles() {
    const container = document.getElementById('particles-container');
    const images = ['1.png', '2.png', '3.png']; // Должны лежать в корне
    
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

// КОМПЛИМЕНТЫ
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
    
    // После 3-го клика показываем кнопку перехода к стирашке
    if (compCount >= 3) {
        const btn = document.getElementById('btn-to-scratch');
        if (btn) btn.classList.remove('hidden');
    }
}

// ЛОГИКА СТИРАШКИ (SCRATCH CARD)
function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#d3d3d3'; // Серый слой
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
        // Появляется кнопка финала, когда стерто достаточно
        if (totalErased > 45) {
            const btn = document.getElementById('btn-to-final');
            if (btn) btn.classList.remove('hidden');
        }
    };
    
    // Поддержка iPhone (touch) и ПК (mouse)
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); }, {passive: false});
    canvas.addEventListener('mousemove', (e) => { if(e.buttons === 1) scratch(e); });
}

// ЗАПУСК ПРИ ЗАГРУЗКЕ
window.onload = () => {
    // Запускаем котиков
    createParticles();
    
    // Настраиваем клики по комплиментам
    const box = document.getElementById('compliment-box');
    if (box) {
        box.addEventListener('touchstart', handleComp, {passive: false});
        box.addEventListener('click', handleComp);
    }
};
