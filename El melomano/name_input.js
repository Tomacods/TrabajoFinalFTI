document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre-input');
    const btnEmpezarJuego = document.getElementById('btn-empezar-juego');

    // Intentar precargar el nombre si ya existe en localStorage
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
        nombreInput.value = storedName;
    }

    btnEmpezarJuego.addEventListener('click', () => {
        const playerName = nombreInput.value.trim();
        if (playerName) {
            localStorage.setItem('playerName', playerName);
        } else {
            localStorage.removeItem('playerName'); // Limpiar si el nombre está vacío
        }
        window.location.href = 'game.html'; // Redirigir a la página del juego
    });
});