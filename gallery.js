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

  const viewBtns = document.querySelectorAll(".view-cert-btn");
  const lightbox = document.getElementById("certLightbox");
  const lightboxImg = document.getElementById("certLightboxImg");
  const closeBtn = document.querySelector(".close-lightbox");

  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const certType = btn.dataset.cert;
      const imgSrc = `certificates/${certType}_cert.jpg`; // matches your folder structure
      lightboxImg.src = imgSrc;
      lightbox.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

// Minimalist Gallery Functionality
class MinimalistGallery {
    constructor() {
        this.grid = document.querySelector('.minimalist-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.gridItems = document.querySelectorAll('.grid-item');
        this.lightbox = document.getElementById('minimalist-lightbox');
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        this.visibleItems = 8; // Show first 8 items
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.setupFiltering();
        this.setupLightbox();
        this.setupLoadMore();
        this.initializeGrid();
    }

    initializeGrid() {
        // Show initial set of items
        this.showInitialItems();
    }

    showInitialItems() {
        let count = 0;
        this.gridItems.forEach((item, index) => {
            if (count < this.visibleItems && 
                (this.currentFilter === 'all' || item.dataset.category === this.currentFilter)) {
                item.classList.remove('hidden');
                count++;
            } else {
                item.classList.add('hidden');
            }
        });

        this.updateLoadMoreButton();
    }

    setupFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                this.currentFilter = button.dataset.filter;
                this.filterItems(this.currentFilter);
            });
        });
    }

    filterItems(filter) {
        this.visibleItems = 8; // Reset to initial count
        
        this.gridItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Show only initial items
        this.showInitialItems();
    }

    setupLoadMore() {
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreItems();
        });
    }

    loadMoreItems() {
        const hiddenItems = Array.from(this.gridItems).filter(item => 
            item.classList.contains('hidden') && 
            (this.currentFilter === 'all' || item.dataset.category === this.currentFilter)
        );

        // Show next batch of items
        const itemsToShow = hiddenItems.slice(0, 4); // Show 4 more items
        itemsToShow.forEach(item => {
            item.classList.remove('hidden');
        });

        this.visibleItems += itemsToShow.length;
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton() {
        const remainingItems = Array.from(this.gridItems).filter(item => 
            item.classList.contains('hidden') && 
            (this.currentFilter === 'all' || item.dataset.category === this.currentFilter)
        ).length;

        if (remainingItems === 0) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
        }
    }

    setupLightbox() {
        // Add click events to all images
        this.gridItems.forEach(item => {
            const img = item.querySelector('.minimalist-img');
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt, item.dataset.category);
            });
        });

        // Close lightbox
        document.querySelector('.close-lightbox').addEventListener('click', () => {
            this.closeLightbox();
        });

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.style.display === 'block') {
                this.closeLightbox();
            }
        });
    }

    openLightbox(src, alt, category) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCategory = document.getElementById('lightbox-category');

        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxTitle.textContent = alt;
        lightboxCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    new MinimalistGallery();
});