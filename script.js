document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.hover-effect');

    links.forEach(link => {
        link.style.position = 'relative';

        const underline = document.createElement('span');
        underline.style.position = 'absolute';
        underline.style.width = '100%';
        underline.style.height = '2px';
        underline.style.bottom = '-2px'; // Adjust this value to align the underline correctly
        underline.style.left = '0';
        underline.style.backgroundColor = '#e2d6ff';
        underline.style.transform = 'scaleX(0)';
        underline.style.transformOrigin = 'bottom left';
        underline.style.transition = 'transform 0.3s ease, background-color 0.3s ease';

        link.appendChild(underline);

        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.05)';
            underline.style.transform = 'scaleX(1)';
            underline.style.backgroundColor = '#1e90ff';
        });

        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
            underline.style.transform = 'scaleX(0)';
            underline.style.backgroundColor = '#e2d6ff';
        });
    });
});
