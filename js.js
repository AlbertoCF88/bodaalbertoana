let scrolledOnce = false;

window.addEventListener('scroll', () => {
    if (!scrolledOnce) {
        const elemento = document.getElementById('main');
        if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });
        }
        scrolledOnce = true;
    }
});
