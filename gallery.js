document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    // Xử lý Lightbox
    const handleImageClick = (e) => {
        const targetImg = e.target.closest('.gallery-img');
        if (!targetImg) return;
        
        // Kiểm tra ảnh đã load chưa
        if (!targetImg.complete || targetImg.naturalWidth === 0) {
            targetImg.addEventListener('load', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = targetImg.src;
            });
        } else {
            lightbox.style.display = 'block';
            lightboxImg.src = targetImg.src;
        }
    };

    // Lazy Load với xử lý lỗi
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (!img) return;

                // Load ảnh và xử lý lỗi
                img.src = img.dataset.src;
                img.onload = () => {
                    img.style.opacity = 1;
                    observer.unobserve(entry.target);
                };
                img.onerror = () => {
                    console.error('Lỗi tải ảnh:', img.dataset.src);
                    img.src = 'placeholder.jpg';
                    observer.unobserve(entry.target);
                };
            }
        });
    };

    // Khởi tạo Observer
    const observer = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.01
    });

    // Khởi tạo sự kiện
    const initGallery = () => {
        // Thêm sự kiện click cho toàn bộ gallery
        document.querySelector('.gallery-grid')?.addEventListener('click', handleImageClick);

        // Quan sát tất cả gallery item
        document.querySelectorAll('.gallery-item').forEach(item => {
            // Thêm loading state
            const img = item.querySelector('img');
            if (img) {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = 0;
            }
            observer.observe(item);
        });
    };

    // Xử lý đóng Lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    };

    // Gán sự kiện đóng
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Khởi động gallery
    initGallery();

    // Fallback cho trình duyệt cũ
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
});
// Thêm vào gallery.js
document.addEventListener('DOMContentLoaded', () => {
    // ... các code hiện có

    // Xử lý active navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.n a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Thêm smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', updateActiveNav);
});