let attemptCount = 0;
const maxAttempts = 9;
const button = document.getElementById('movingButton');
const counter = document.getElementById('contadorIntentos');
const successMessage = document.getElementById('mensajeFelicitacion');


// Mensajes por intento:
const buttonTexts = [
    'Uh casi, pero no',
    'Bueno, casi casi',
    'A lo mejor y el siguiente',
    'Mentiras, el otro sí',
    'Tampoco era este',
    'Quizá, probablemente, umm',
    '¿Ya casi?',
    'Ok, por finnnnn!!!',
];

// button.addEventListener('click', function(e) 
function manejarClick (e) {
    e.preventDefault();
    attemptCount++;

    if (attemptCount < maxAttempts) {
        //Mover botón
        moveButtonRandomly(button);

        //Cambiar texto botón
        button.textContent = buttonTexts[attemptCount -1] || buttonTexts[0];

        //Agregar "animación"
        button.classList.add('moving');
        setTimeout(() => {
            button.classList.remove('moving');
        }, 500);

    }   else {
        //Mensaje éxito
        successMessage.classList.add('show');

        //Sección principal
        setTimeout(() => {
            showMainSection();
        }, 1000);

    }
};

button.addEventListener('click', manejarClick);

window.addEventListener('load', function() {

    button.getBoundingClientRect();

    const centerX = (window.innerWidth - button.offsetWidth) / 2;
    const centerY = (window.innerHeight - button.offsetHeight) / 2;

    button.style.position = 'absolute';
    button.style.left = `${centerX + window.scrollX}px`;
    button.style.top = `${centerY + window.scrollY}px`;
    button.style.transition = 'left 0.3s ease, top 0.3 ease';

});


function moveButtonRandomly(button, options = {}) {
    if (!button) {
        console.warn('Elemento no encontrado');
        return;
    }

    const {
        container = window,   // Limitar movimiento?
        useTransition = true, //Animar movimiento
        transitionDuration = '0.3s'
    } = options;

    const containerRect = container === window
        ? {width: window.innerWidth, height: window.innerHeight}
        : container.getBoundingClientRect();

    const buttonRect = button.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const newX = Math.max(0, Math.min(maxX, Math.random() * maxX));
    const newY = Math.max(0, Math.min(maxY, Math.random() * maxY));

    if (useTransition) {
        button.style.transition = `left ${transitionDuration} ease, top ${transitionDuration} ease`;
    } else {
        button.style.transition = 'none';
    }

    button.style.position = 'absolute';
    if (container === window) {
        button.style.left = `${newX + window.scrollX}px`;
        button.style.top = `${newY + window.scrollY}px`;
    } else {
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }
}

function showMainSection() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
}
