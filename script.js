const body = document.body;
const toggleButton = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

const applyTheme = (isDark) => {
    body.classList.toggle('dark', isDark);
    if (toggleButton) {
        const icon = toggleButton.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
};

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
    applyTheme(true);
} else {
    applyTheme(false);
}

toggleButton?.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const nextTheme = !isDark;
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme ? 'dark' : 'light');
});

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => observer.observe(element));

// Interactive Skills Filter
const filterButtons = document.querySelectorAll('.skills-filter-btn');
const skillCards = document.querySelectorAll('.skills-grid .skill-category');

filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        skillCards.forEach((card) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'flex';
                card.classList.add('visible');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 20);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.96)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 220);
            }
        });
    });
});

