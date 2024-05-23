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
        let xMargin, yMargin;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            xMargin = window.innerWidth - noButton.offsetWidth;
            yMargin = window.innerHeight - noButton.offsetHeight - 20; // Ограничиваем по оси Y, учитывая высоту кнопки и добавляем отступ
        } else {
            xMargin = document.body.clientWidth - noButton.offsetWidth;
            yMargin = document.body.clientHeight - noButton.offsetHeight - 20; // Ограничиваем по оси Y, учитывая высоту кнопки и добавляем отступ
        }
        const x = Math.floor(Math.random() * xMargin);
        const y = Math.floor(Math.random() * yMargin);
        noButton.style.position = 'absolute';
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }
});
