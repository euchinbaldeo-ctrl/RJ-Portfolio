const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Gallery lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close">&times;</button>
  <button class="lightbox-arrow prev">&#8249;</button>
  <img class="lightbox-main" id="lightboxMain">
  <div class="lightbox-thumbs" id="lightboxThumbs"></div>
  <button class="lightbox-arrow next">&#8250;</button>
`;
document.body.appendChild(lightbox);

let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
}

function updateLightbox() {
    document.getElementById('lightboxMain').src = currentImages[currentIndex];
    const thumbs = document.getElementById('lightboxThumbs');
    thumbs.innerHTML = currentImages.map((src, i) => `
        <img src="${src}" class="lightbox-thumb ${i === currentIndex ? 'active' : ''}" onclick="openLightbox(currentImages, ${i})">
    `).join('');
}

document.querySelectorAll('.gallery-trigger').forEach(trigger => {
    const images = JSON.parse(trigger.dataset.images);
    trigger.addEventListener('click', () => openLightbox(images, 0));
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('open');
});

lightbox.querySelector('.prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
});

lightbox.querySelector('.next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentImages.length; updateLightbox(); }
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; updateLightbox(); }
    if (e.key === 'Escape') lightbox.classList.remove('open');
});
