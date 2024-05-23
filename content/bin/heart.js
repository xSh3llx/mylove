const heartsContainer = document.querySelector('.hearts');
const numHearts = 50;

for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${2 + Math.random() * 3}s`; // Длительность анимации от 2 до 5 секунд
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heartsContainer.appendChild(heart);
}
