// Функция вибрации для iPhone и Android
const vibrate = () => {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(40);
    }
};

// Переключение экранов
function next(num) {
    vibrate();
    
    // Скрываем все контейнеры
    document.querySelectorAll('.container').forEach(c => {
        c.classList.add('hidden');
        c.style.display = 'none'; 
    });
    
    // Находим нужный экран
    const target = document.getElementById('s' + num);
    if (target) {
        target.style.display = 'block';
        // Небольшая задержка, чтобы анимация появления сработала плавно
        setTimeout(() => {
            target.classList.remove('hidden');
        }, 50);
        
        // Запуск специфических функций для экранов
        if (num === 3) initGame();
        if (num === 4) initScratch();
    }
}

// --- ГЕНЕРАТОР КОМПЛИМЕНТОВ ---
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
    const randomComp = compliments[Math.floor(Math.random() * compliments.length)];
    
    box.innerText = randomComp;
    compCount++;
    
    // После 3-х нажатий появляется кнопка идти дальше
    if (compCount >= 3) {
        const nextBtn = document.getElementById('btn-to-game');
        if (nextBtn) nextBtn.classList.remove('hidden');
    }
}

// --- ЛЕТАЮЩИЕ КАРТИНКИ (HELLO KITTY) ---
window.onload = () => {
    const box = document.getElementById('compliment-box');
    if (box) {
        box.addEventListener('touchstart', handleCompliment, {passive: false});
        box.addEventListener('click', handleCompliment);
    }

    const container = document.getElementById('particles-container');
    const images = ['1.png', '2.png', '3.png']; // Лежат в корне репозитория
    
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

// --- ЛОГИКА ИГРЫ MEMORY ---
let matchedPairs = 0; 
let flipped = [];

function initGame() {
    matchedPairs = 0; 
    flipped = [];
    const icons = ['🌸', '🐱', '🎀', '🌸', '🐱', '🎀'];
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    // Перемешиваем иконки
    icons.sort(() => Math.random() - 0.5);
    
    icons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card-game';
        card.dataset.icon = icon;
        card.innerHTML = '?';
        
        const flipAction = (e) => {
            if (e) e.preventDefault();
            
            // Условие: можно нажать, если открыто меньше 2-х карт и карта еще не открыта
            if (flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                vibrate();
                card.classList.add('flipped');
                card.innerHTML = card.dataset.icon;
                flipped.push(card);
                
                if (flipped.length === 2) {
                    setTimeout(checkMatch, 600);
                }
            }
        };

        // Поддержка и тапа, и клика
        card.addEventListener('touchstart', flipAction, {passive: false});
        card.addEventListener('click', flipAction);
        grid.appendChild(card);
    });
}

function checkMatch() {
    const [card1, card2] = flipped;
    
    if (card1.dataset.icon === card2.dataset.icon) {
        // Пара совпала
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++; 
        vibrate();
        
        // Если все 3 пары найдены — идем на экран 4
        if (matchedPairs === 3) {
            setTimeout(() => next(4), 800);
        }
    } else {
        // Не совпало — закрываем карты обратно
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
        card2.innerHTML = '?';
    }
    flipped = [];
}

// --- ЛОГИКА СКРЕТЧ-КАРТЫ (СТИРАШКИ) ---
function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Рисуем защитный слой
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(0, 0, 250, 150);
    
    let points = 0;
    const scratch = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        // "Стираем" пиксели
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); 
        ctx.arc(x, y, 20, 0, Math.PI * 2); 
        ctx.fill();
        
        points++;
        // Если потерли достаточно много — показываем кнопку финала
        if (points > 60) {
            const finalBtn = document.getElementById('btn-to-final');
            if (finalBtn) finalBtn.classList.remove('hidden');
        }
    };

    canvas.addEventListener('touchmove', (e) => { 
        e.preventDefault(); 
        scratch(e); 
    }, {passive: false});
    
    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) scratch(e);
    });
}
