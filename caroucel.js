let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-image');
    const totalSlides = slides.length;
    currentIndex = (index + totalSlides) % totalSlides;
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function currentSlide(index) {
    showSlide(index);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showSlide(currentIndex + 1);
        } else {
            showSlide(currentIndex - 1);
        }
    }
}

let autoSlideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);

document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
});