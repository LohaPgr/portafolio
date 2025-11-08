import darkTheme from "./dom/btn-dark.js";
import scrollTop from "./dom/btn-scroll.js";

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar componentes
        this.initDarkTheme();
        this.initScrollTop();
        this.initSmoothScroll();
        this.initMobileMenu();
        this.initAnimations();
    }

    initDarkTheme() {
        darkTheme(".theme-toggle", "dark-mode");
    }

    initScrollTop() {
        scrollTop(".scroll-top-btn");
    }

    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
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
            });

            // Cerrar menú al hacer click en un link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
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
        document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el => {
            observer.observe(el);
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});