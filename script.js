// ==================== Hamburger Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==================== Smooth Scroll Active Nav ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== Scroll Reveal Animation ====================
const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .about-text, .about-image');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ==================== Contact Form Submission ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent Successfully! 🎉';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Reset form
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);

            // Here you would typically send the form data to a server
            console.log('Form Data:', { name, email, subject, message });
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ==================== Scroll to Top Button ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ==================== Cursor Follow Effect ====================
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// ==================== Add hover effect to interactive elements ====================
const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .contact-item, .timeline-content, .social-link');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ==================== Navbar scroll effect ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

// ==================== Lazy Loading for Images ====================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ==================== Counter Animation ====================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

// Trigger counter animation when about section is in view
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    aboutObserver.observe(aboutSection);
}

// ==================== Particle Background Effect (Optional) ====================
const createParticles = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.5;
        pointer-events: none;
    `;
    
    document.body.appendChild(canvas);

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// Uncomment below to enable particle background
// createParticles();

// ==================== Initialization ====================
console.log('Portfolio website loaded successfully! 🚀');
