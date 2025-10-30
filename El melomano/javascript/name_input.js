document.addEventListener('DOMContentLoaded', () => {
const nombreInput = document.getElementById('nombre-input');
const btnEmpezarJuego = document.getElementById('btn-empezar-juego');

const storedName = localStorage.getItem('playerName');
if (storedName) {
nombreInput.value = storedName;
}

btnEmpezarJuego.addEventListener('click', () => {
const playerName = nombreInput.value.trim();
if (playerName) {
localStorage.setItem('playerName', playerName);
} else {
localStorage.removeItem('playerName');
}

window.location.href = 'juego.php'; 
});
});