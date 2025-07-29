document.addEventListener('DOMContentLoaded', function() {
  const themeSwitcher = document.querySelector('.theme-switcher');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Áp dụng theme khi tải trang
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Bật/tắt theme khi click
  themeSwitcher.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
function updateThemeIcon(theme) {
  const icon = themeSwitcher.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'; // Đảo ngược icon
}
});