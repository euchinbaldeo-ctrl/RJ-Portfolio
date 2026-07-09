const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
//keep js starting here 
// Scroll-triggered fade-up animations — KEEP THIS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Gallery — REPLACE OLD GALLERY CODE WITH THIS
document.querySelectorAll('.gallery-trigger').forEach(trigger => {
    const images = JSON.parse(trigger.dataset.images);
    let index = 0;
    const mainImg = trigger.querySelector('.gallery-main-img');
    const counter = trigger.querySelector('.gallery-counter');

    function update() {
        mainImg.src = images[index];
        counter.textContent = (index + 1) + ' / ' + images.length;
    }

    update();

    trigger.querySelector('.gallery-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        index = (index - 1 + images.length) % images.length;
        update();
    });

    trigger.querySelector('.gallery-next').addEventListener('click', (e) => {
        e.stopPropagation();
        index = (index + 1) % images.length;
        update();
    });
});
