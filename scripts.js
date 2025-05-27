// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

// Mobile menu functionality
mobileMenuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offset = 20; // Adjust if needed
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Active section highlighting
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            updateActiveLink(currentId);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Update active link in navigation
function updateActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
        }
    });
}

// Theme toggle functionality
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme based on user preference
function initializeTheme() {
    if (localStorage.getItem('theme')) {
        document.body.classList.toggle('light-mode', localStorage.getItem('theme') === 'light');
    } else {
        document.body.classList.toggle('light-mode', !prefersDarkScheme.matches);
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = !document.body.classList.contains('light-mode');
    themeToggle.querySelector('img').style.filter = isDark ? 'invert(1)' : 'invert(0)';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    updateThemeIcon();
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('light-mode', !e.matches);
        updateThemeIcon();
    }
});

// Initialize theme on page load
initializeTheme();

// Add fade-in animation to sections
const fadeInElements = document.querySelectorAll('.feature-card, .prereq-card, .download-card');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const fadeInCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
};

const fadeInObserver = new IntersectionObserver(fadeInCallback, fadeInOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});
