let clickCount = 0;
const noButton = document.getElementById('noButton');
const surpriseDiv = document.getElementById('surprise');
const surpriseImage = document.getElementById('surpriseImage');
const surpriseText = document.getElementById('surpriseText');

const images = [
    './content/img/1.jpg',
    './content/img/2.jpg',
    './content/img/3.jpg'
];

const texts = [
    'O co chodzi...',
    'Marta w sensie nie?',
    'Aha.. >:('
];

noButton.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5 || clickCount === 10 || clickCount === 15) {
        const index = Math.floor(clickCount / 5) - 1;
        surpriseImage.src = images[index];
        surpriseText.textContent = texts[index];
        surpriseDiv.classList.remove('hidden');
    } else {
        const xMargin = 500; 
        const yMargin = 50; 
        const x = Math.floor(Math.random() * xMargin);
        const y = Math.floor(Math.random() * yMargin);
        noButton.style.position = 'absolute';
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }
});
