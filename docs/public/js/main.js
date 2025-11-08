import darkTheme from "./dom/btn-dark.js";
import scrollTop from "./dom/btn-scroll.js";

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initDarkTheme();
        this.initScrollTop();
        this.initSmoothScroll();
        this.initMobileMenu();
        this.initAnimations();
        this.initNavigationBackground();
    }

    initDarkTheme() {
        darkTheme(".theme-toggle", "dark-mode");
    }

    initScrollTop() {
        scrollTop(".scroll-top-btn");
    }

    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const targetId = navLink.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Cambiar icono del menú
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.className = 'bi bi-x';
                } else {
                    icon.className = 'bi bi-list';
                }
            });

            // Cerrar menú al hacer click en un link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.className = 'bi bi-list';
                });
            });

            // Cerrar menú al hacer click fuera de él
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.className = 'bi bi-list';
                }
            });
        }
    }

    initAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animar
        document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content').forEach(el => {
            observer.observe(el);
        });
    }

    initNavigationBackground() {
        const navigation = document.querySelector('.navigation-container');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navigation.style.background = 'var(--bg-color)';
                navigation.style.backdropFilter = 'blur(10px)';
            } else {
                navigation.style.background = 'transparent';
                navigation.style.backdropFilter = 'none';
            }
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});