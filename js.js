let scrolledOnce = false;

window.addEventListener('scroll', () => {
    if (!scrolledOnce) {
        const elemento = document.getElementById('main');
        if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });

            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 1500);
        }
        scrolledOnce = true;
    }
});