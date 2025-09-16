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

        //Cambia texto:
        const nuevoTexto = buttonTexts[attemptCount - 1] || buttonTexts[0];
        button.textContent = nuevoTexto;

        //Ajustar estilo según longitud:
        if (nuevoTexto.length > 20) {
            // button.style.fontSize = '14px';
            button.style.padding = '8px 16px';
        } else if (nuevoTexto.length > 15) {
            // button.style.fontSize = '15px';
            button.style.padding = '9px 18px';
        } else {
            // button.style.fontSize = '16px';
            button.style.padding = '10px 20px';
        }

        //Calcular nuevo ancho:
        button.getBoundingClientRect();
        //Centrar nuevo ancho:
        const centerX = (window.innerWidth - button.offsetWidth) / 2;
        const centerY = parseFloat(button.style.top) || (window.innerHeight - button.offsetHeight) / 2;

        button.style.left = `${centerX + window.scrollX}px`;
        button.style.top = `${centerY + window.scrollY}px`;
        //Mantiene verticalidad

        //Mover botón
        moveButtonRandomly(button);

        //Cambiar texto botón
        // button.textContent = buttonTexts[attemptCount -1] || buttonTexts[0];

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

    // button.getBoundingClientRect();

    // const centerX = (window.innerWidth - button.offsetWidth) / 2;
    const centerY = (window.innerHeight - button.offsetHeight) / 2;
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.top = `${centerY + window.scrollY}px`;
    button.style.transition = 'left 0.3s ease, top 0.3s ease';
    button.style.transform = 'translateX(-50%)';

});


function moveButtonRandomly(button, options = {}) {
    if (!button) {
        console.warn('Elemento no encontrado');
        return;
    }

    // const {
    //     container = window,   // Limitar movimiento?
    //     useTransition = true, //Animar movimiento
    //     transitionDuration = '0.3s'
    // } = options;

    // const containerRect = container === window
    //     ? {width: window.innerWidth, height: window.innerHeight}
    //     : container.getBoundingClientRect();

    // const buttonRect = button.getBoundingClientRect();

    const { useTransition = true, transitionDuration = '0.3s'} = options;

    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    const newX = Math.max(0, Math.min(maxX, Math.random() * maxX));
    const newY = Math.max(0, Math.min(maxY, Math.random() * maxY));

    if (useTransition) {
        button.style.transition = `left ${transitionDuration} ease, top ${transitionDuration} ease,
        transform ${transitionDuration} ease`;
    } 

    button.style.transform = 'none';
    button.style.left = `${newX + window.scrollX}px`;
    button.style.top = `${newY + window.scrollY}px`;
    
}

function showMainSection() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
}
