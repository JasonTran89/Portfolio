const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show-element', entry.isIntersecting);
    });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('hidden-element');
    scrollObserver.observe(el);
});
// Title scroll animation
document.querySelectorAll('[data-animate-title]').forEach(el => {
    el.classList.add('hidden-element');
    scrollObserver.observe(el);
});
