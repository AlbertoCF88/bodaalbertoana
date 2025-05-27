let scrolledOnce = false;

window.addEventListener('scroll', () => {
    if (scrolledOnce) return;

    const indiceAbierto = document.querySelector('[aria-expanded="true"]');
    if (indiceAbierto) return; 

    const elemento = document.getElementById('main');
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 500);
    }

    scrolledOnce = true;
});