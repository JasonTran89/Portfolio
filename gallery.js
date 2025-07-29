document.addEventListener('DOMContentLoaded', () => {
    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // Xử lý click ảnh
    const showLightbox = (targetImg) => {
        // Lấy URL ảnh chất lượng cao từ data-src
        const fullSizeSrc = targetImg.dataset.src || targetImg.currentSrc;
        lightboxImg.src = fullSizeSrc;
        
        // Hiển thị lightbox với animation
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    // Lấy tất cả gallery items trong cả 2 sections
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Thêm sự kiện click cho từng item
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const img = item.querySelector('.gallery-img');
            if (img) showLightbox(img);
        });
    });

    // Đóng lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }, 300);
        document.body.style.overflow = 'auto';
    };

    // Sự kiện đóng
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => e.target === lightbox && closeLightbox());
    document.addEventListener('keydown', (e) => e.key === 'Escape' && closeLightbox());

    // Lazy Load
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('.gallery-img');
                if (img?.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.onload = () => img.style.opacity = 1;
                }
                observer.unobserve(entry.target);
            }
        });
    };

    // Khởi tạo Observer
    const observer = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.01
    });

    // Quan sát tất cả items
    galleryItems.forEach(item => observer.observe(item));
});