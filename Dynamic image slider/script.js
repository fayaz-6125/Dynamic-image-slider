let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumb");
const caption = document.querySelector(".caption");
const totalSlides = slides.length;

let autoSlideInterval; // To manage the auto-slide

// Show Slide Function
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        thumbnails[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    thumbnails[index].classList.add("active");
    caption.textContent = slides[index].getAttribute("data-caption");
}

// Navigation Functions
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
    resetAutoSlide(); // Reset auto-slide when manually navigating
}

// Auto-slide Function
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // Auto-slide every 4 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Stop auto-slide
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide(); // Restart auto-slide after manual interaction
}

// Pause auto-slide on hover and resume on mouse leave
const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

// Touch/Swipe Support
let startX;

sliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoSlide(); // Pause auto-slide during touch
});

sliderContainer.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        nextSlide(); // Swipe Left
    } else if (endX - startX > 50) {
        prevSlide(); // Swipe Right
    }
    startAutoSlide(); // Resume auto-slide after swipe
});

// Initialize First Slide and Start Auto-slide
showSlide(currentIndex);
startAutoSlide();
