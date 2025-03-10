// Enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle with animation
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease-in-out';
        }, 300);
    });

    // Notification badge effect
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseover', () => {
            badge.style.transform = 'scale(1.2)';
        });
        badge.addEventListener('mouseout', () => {
            badge.style.transform = 'scale(1)';
        });
    });

    // Profile image hover effect
    const profileImg = document.querySelector('.profile-img');
    profileImg.addEventListener('mouseover', () => {
        profileImg.style.transform = 'scale(1.1) rotate(5deg)';
    });
    profileImg.addEventListener('mouseout', () => {
        profileImg.style.transform = 'scale(1) rotate(0deg)';
    });

    // Skill level animation
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        level.addEventListener('mouseover', () => {
            level.style.transform = 'scale(1.1)';
            level.style.transition = 'all 0.3s ease';
        });
        level.addEventListener('mouseout', () => {
            level.style.transform = 'scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 