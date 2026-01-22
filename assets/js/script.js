const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

let currentSlide = 0;
const slideInterval = 5000; // 5 seconds
let autoPlay;

// Initialize
function init() {
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoPlay();
    }
}

// Show Slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Next Slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Prev Slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto Play Logic
function startAutoPlay() {
    autoPlay = setInterval(nextSlide, slideInterval);
}

function stopAutoPlay() {
    clearInterval(autoPlay);
}

// Event Listeners
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopAutoPlay();
        showSlide(index);
        startAutoPlay();
    });
});

// Pause on hover (Optional, improves UX)
const container = document.querySelector('.carousel-container');
if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
}

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        // Burger Animation
        const spans = navToggle.querySelectorAll('span');
        spans[0].classList.toggle('rotate1');
        spans[1].classList.toggle('hide');
        spans[2].classList.toggle('rotate2');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Change style when scrolling past the hero section (viewport height)
    // Subtracting a small buffer (e.g. 100px) creates a smoother transition slightly before the white area fully hits
    const triggerHeight = window.innerHeight - 100;

    if (window.scrollY > triggerHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Start
init();
