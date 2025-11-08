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
        document.documentElement.setAttribute('data-theme', theme);
        
        // Aplicar clase a elementos específicos si es necesario
        document.body.classList.toggle(classDark, isDark);
        
        // Guardar preferencia
        localStorage.setItem('theme', theme);
        
        // Actualizar meta theme-color
        updateMetaThemeColor(isDark);
    };

    const updateMetaThemeColor = (isDark) => {
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
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let preferredTheme;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            preferredTheme = savedTheme;
        } else {
            preferredTheme = systemPrefersDark ? 'dark' : 'light';
        }
        
        applyTheme(preferredTheme);
    });

    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}