let attemptCount = 0;
const maxAttempts = 8;
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

button.addEventListener('click', function(e) {
    e.preventDefault();
    attemptCount++;

    //Actualizar contador
    counter.textContent = `Intentos: ${attemptCount}/${maxAttempts}`;

    if (attemptCount < maxAttempts) {
        //Mover botón
        moveButtonRandomly();

        //Cambiar texto botón
        button.textContent = buttonTexts[attemptCount] || buttonTexts[0];

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
});

function moveButtonRandomly() {

    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    button.style.position = 'absolute';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
}

function showMainSection() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
}


// function handleMovingButton() {
//     attemptCount++;
    
//     if (attemptCount < maxAttempts) {
//         // Mover a posición aleatoria
//         moveButtonRandomly();
//         // Cambiar texto del botón
//         updateButtonText();
//     } else {
//         // Finalmente ir al apartado principal
//         goToMainSection();
//     }
// }

// function moveButtonRandomly() {
//     const button = document.getElementById('moving-button');
//     const x = Math.random() * (window.innerWidth - 200);
//     const y = Math.random() * (window.innerHeight - 100);
    
//     button.style.position = 'absolute';
//     button.style.left = x + 'px';
//     button.style.top = y + 'px';
// }