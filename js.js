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

const weddingDate = new Date("2025-09-06T12:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("wedding-timer").innerHTML = "<h2>💒 ¡Hoy es el gran día!</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);