const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('[data-reveal]');
const progressBar = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const form = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');

const revealOnScroll = () => {
    revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 90) {
            item.classList.add('visible');
        }
    });
};

const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    backToTop.classList.toggle('visible', scrollTop > 460);
    navbar.classList.toggle('is-scrolled', scrollTop > 12);
};

const setActiveNavLink = () => {
    const sections = document.querySelectorAll('main section[id]');
    let currentId = '';

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

const initMenu = () => {
    if (!hamburger || !navMenu) return;

    const setMenuOpen = (isOpen) => {
        hamburger.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    hamburger.addEventListener('click', () => {
        setMenuOpen(!navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            setMenuOpen(false);
        });
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuOpen(false);
    });
};

const initForm = () => {
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea');

    fields.forEach((field) => {
        field.addEventListener('input', () => {
            field.classList.toggle('has-value', field.value.trim().length > 0);
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = form.querySelector('.form-status');
        const invalidField = Array.from(fields).find((field) => !field.checkValidity());

        if (invalidField) {
            status.textContent = 'Please enter a name, a valid email address, and a message.';
            invalidField.focus();
            return;
        }

        status.textContent = 'This form is not connected yet. No message was sent.';
    });
};

window.addEventListener('scroll', () => {
    revealOnScroll();
    updateScrollProgress();
    setActiveNavLink();
});

initMenu();
revealOnScroll();
updateScrollProgress();
setActiveNavLink();
initForm();

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
