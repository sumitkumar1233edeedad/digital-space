const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginButton = document.querySelector('.button_login');

// Handle form toggling
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Handle login button click
loginButton.addEventListener('click', () => {
    wrapper.style.display = 'flex';
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target) && !loginButton.contains(e.target)) {
        wrapper.style.display = 'none';
    }
});

// Close modal with X button
document.querySelector('.icon-c').addEventListener('click', () => {
    wrapper.style.display = 'none';
});
