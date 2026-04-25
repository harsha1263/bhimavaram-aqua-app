// public/script.js

// Mobile Menu Toggle Logic
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

// Best practice: Check if elements exist before adding event listeners
if (btn && menu && icon) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        if (menu.classList.contains('hidden')) {
            // Show Hamburger Icon
            icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); 
        } else {
            // Show 'X' Close Icon
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); 
        }
    });
}