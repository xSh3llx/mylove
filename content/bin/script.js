let clickCount = 0;
const noButton = document.getElementById('noButton');
const surpriseDiv = document.getElementById('surprise');
const surpriseImage = document.getElementById('surpriseImage');
const surpriseText = document.getElementById('surpriseText');

const images = [
    './content/img/1.jpg', // Путь к первому сюрпризному изображению
    './content/img/2.jpg', // Путь ко второму сюрпризному изображению
    './content/img/3.jpg'  // Путь к третьему сюрпризному изображению
];

const texts = [
    'Aha... ',
    'Czemu nie?!?!?!',
    'Zaraz po dupie dostaniesz! >:('
];

noButton.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5 || clickCount === 10 || clickCount === 15) {
        const index = Math.floor(clickCount / 5) - 1;
        surpriseImage.src = images[index];
        surpriseText.textContent = texts[index];
        surpriseDiv.classList.remove('hidden');
    } else {
        const xMargin = document.body.clientWidth - noButton.offsetWidth;
        const yMargin = document.body.clientHeight - noButton.offsetHeight - 20; // Ограничиваем по оси Y, учитывая высоту кнопки и добавляем отступ
        const x = Math.floor(Math.random() * xMargin);
        noButton.style.position = 'absolute';
        noButton.style.left = `${x}px`;
    }
});

// Создание сердечек
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
