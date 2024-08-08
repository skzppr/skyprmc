// Smooth scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active link
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('#sidebar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active-link');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active-link');
        }
    });
});

// Toggle theme using the image button
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    updateIcon();
});

function updateIcon() {
    if (document.body.classList.contains('light-mode')) {
        themeToggle.src = 'pngs/mode_switch.png';
    } else {
        themeToggle.src = 'pngs/mode_switch.png';
    }
}

// Show footer when scrolling to the bottom
const footer = document.querySelector('footer');
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.opacity = 1; // Show footer
    } else {
        footer.style.opacity = 0; // Hide footer
    }
});
