export default function scrollTop(btn) {
    const $scrollBtn = document.querySelector(btn);
    
    if (!$scrollBtn) return;

    const scrollThreshold = 300;
    let scrollTimeout;

    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                $scrollBtn.classList.remove('hidden');
                $scrollBtn.classList.add('visible');
            } else {
                $scrollBtn.classList.remove('visible');
                $scrollBtn.classList.add('hidden');
            }
        }, 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    $scrollBtn.addEventListener('click', scrollToTop);

    // Inicializar estado
    handleScroll();
}