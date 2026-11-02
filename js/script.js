function createLightbox(images) {
    // images = [{src: 'thumb.jpg', full: 'large.jpg', alt: 'caption'},...]

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
       .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
       .gallery img { width: 100%; height: 200px; object-fit: cover; cursor: pointer; border-radius: 8px; transition: transform 0.2s; }
       .gallery img:hover { transform: scale(1.03); }
       .lightbox { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 1000; align-items: center; justify-content: center; }
       .lightbox.active { display: flex; }
       .lightbox-content { position: relative; max-width: 90vw; max-height: 90vh; }
       .lightbox-content img { max-width: 100%; max-height: 85vh; }
       .close,.prev,.next { position: absolute; background: rgba(255,255,255,0.1); color: #fff; border: none; font-size: 32px; cursor: pointer; padding: 8px 16px; }
       .close { top: 20px; right: 30px; }
       .prev { left: 20px; top: 50%; transform: translateY(-50%); }
       .next { right: 20px; top: 50%; transform: translateY(-50%); }
       .caption { text-align: center; color: #ccc; padding: 12px; }
       .counter { position: absolute; top: 20px; left: 30px; color: #ccc; }
    `;
    document.head.appendChild(style);

    // Build gallery
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    images.forEach((img, i) => {
        const el = document.createElement('img');
        el.src = img.src;
        el.alt = img.alt;
        el.dataset.full = img.full;
        el.dataset.index = i;
        gallery.appendChild(el);
    });
    document.body.appendChild(gallery);

    // Build lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="counter"></span>
        <button class="close">&times;</button>
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
        <div class="lightbox-content">
            <img src="" alt="">
            <div class="caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Logic
    const lightboxImg = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.caption');
    const counter = lightbox.querySelector('.counter');
    let currentIndex = 0;

    function showImage() {
        const img = images[currentIndex];
        lightboxImg.src = img.full || img.src;
        lightboxImg.alt = img.alt;
        caption.textContent = img.alt;
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    gallery.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showImage();
            lightbox.classList.add('active');
        });
    });

    lightbox.querySelector('.next').onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    };
    lightbox.querySelector('.prev').onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    };
    lightbox.querySelector('.close').onclick = () => lightbox.classList.remove('active');
}

// Usage:
createLightbox([
    { src: 'file:///C:/Users/Student/Downloads/ST10530939%20PRESS%20AND%20WASH.jpg', full: 'file:///C:/Users/Student/Downloads/ST10530939%20PRESS%20AND%20WASH.jpg', alt: 'Mountain' },
    { src: 'file:///C:/Users/Student/Downloads/SERVICE%20IMAGE.webp', full: 'file:///C:/Users/Student/Downloads/SERVICE%20IMAGE.webp', alt: 'Dog' }
]);