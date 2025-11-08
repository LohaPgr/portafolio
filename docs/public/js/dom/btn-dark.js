export default function darkTheme(btn, classDark) {
    const $themeBtn = document.querySelector(btn);
    const $selectors = document.querySelectorAll('[data-theme]');
    const $icon = $themeBtn.querySelector('i');

    const themes = {
        light: {
            icon: 'bi-moon-stars-fill',
            label: 'Cambiar a modo oscuro'
        },
        dark: {
            icon: 'bi-brightness-high-fill',
            label: 'Cambiar a modo claro'
        }
    };

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        
        // Actualizar icono y atributos
        $icon.className = themes[theme].icon;
        $themeBtn.setAttribute('aria-label', themes[theme].label);
        
        // Aplicar clase a elementos
        $selectors.forEach(el => {
            el.setAttribute('data-theme', theme);
            el.classList.toggle(classDark, isDark);
        });
        
        // Guardar preferencia
        localStorage.setItem('theme', theme);
        
        // Actualizar meta theme-color
        this.updateMetaThemeColor(isDark);
    };

    this.updateMetaThemeColor = (isDark) => {
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = isDark ? '#1a1a1a' : '#ffffff';
    };

    // Event listeners
    document.addEventListener('click', (e) => {
        if (e.target.closest(btn)) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        }
    });

    // Inicializar tema
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const preferredTheme = savedTheme !== 'light' && savedTheme !== 'dark' 
            ? (systemPrefersDark ? 'dark' : 'light')
            : savedTheme;
        
        applyTheme(preferredTheme);
    });
}