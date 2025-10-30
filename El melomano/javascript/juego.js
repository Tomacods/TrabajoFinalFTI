
class Game {
constructor() {
this.currentCard = null; 
this.playerName = '';
this.currentQuestionIndex = 0; // índice 0-3 de las preguntas
this.totalScore = 0;
this.roundScore = 0;

// ---autómata de Pila ---
this.automaton = {
currentState: 'INICIO', 
pila: [],
};

this.pantallas = document.querySelectorAll('.pantalla');
this.scoreDisplay = document.getElementById('score-display');
this.nombreJugadorSpan = document.getElementById('nombre-jugador'); 

// Pantalla Inicio
this.btnAgarrarTarjeta = document.getElementById('btn-agarrar-tarjeta');
this.btnFinDelJuego = document.getElementById('btn-fin-del-juego');

// Pantalla Juego
this.divCancion = document.getElementById('desafio-cancion');
this.lyricPrompt = document.getElementById('lyric-prompt');
this.lyricInput = document.getElementById('lyric-input');
this.btnEnviarCancion = document.getElementById('btn-enviar-cancion');

this.divPregunta = document.getElementById('desafio-pregunta');
this.questionTitle = document.getElementById('question-title');
this.questionText = document.getElementById('question-text');
this.optionsContainer = document.getElementById('options-container');
this.feedbackMessage = document.getElementById('feedback-message');

// Pantalla Puntuación
this.roundScoreDisplay = document.getElementById('round-score-display');
this.btnSiguienteTarjeta = document.getElementById('btn-siguiente-tarjeta');

// Pantalla Fin
this.finalScoreDisplay = document.getElementById('final-score-display');
this.btnReiniciar = document.getElementById('btn-reiniciar');

// Pantalla Confirmar Fin
this.btnCambiarJugador = document.getElementById('btn-cambiar-jugador');
this.btnCancelarFin = document.getElementById('btn-cancelar-fin');
}


init() {
this.loadPlayer(); 

// conectar botones
this.btnAgarrarTarjeta.addEventListener('click', () => this.handleAgarrarTarjeta());
this.btnFinDelJuego.addEventListener('click', () => this.automatonTransition('FinDelJuego'));
this.btnEnviarCancion.addEventListener('click', () => this.handleEnviarCancion());
this.btnSiguienteTarjeta.addEventListener('click', () => this.automatonTransition('obtenerPuntuacion'));
this.btnReiniciar.addEventListener('click', () => this.handleReiniciar());
this.btnCambiarJugador.addEventListener('click', () => this.handleCambiarJugador());
this.btnCancelarFin.addEventListener('click', () => this.automatonTransition('CancelarFin'));

this.optionsContainer.addEventListener('click', (event) => {
if (event.target.tagName === 'BUTTON') {
this.handleAnswerQuestion(event);
}
});

this.renderGameUI(); 
}
//--------------------LÓGICA DEL AUTOMATA DE PILA-----------------------------
automatonTransition(action) {
const fromState = this.automaton.currentState;
switch (this.automaton.currentState) {
case 'INICIO': // Estado 1
if (action === 'AgarrarTarjeta') {
// JFLAP: 1 -> 2 (AgarrarTarjeta; λ; PPPPC)
this.automaton.pila = ['P', 'P', 'P', 'P', 'C'];
this.automaton.currentState = 'CANCION_PENDIENTE'; // Estado 2
} else if (action === 'FinDelJuego') {
this.automaton.currentState = 'CONFIRMAR_FIN';
}
break;

case 'CANCION_PENDIENTE': // Estado 2
if (action === 'CompletaCancion') {
// JFLAP: 2 -> 3 (CompletaCancion; C; λ)
const cIndex = this.automaton.pila.lastIndexOf('C'); // Busca 'C'
if (cIndex > -1) {
this.automaton.pila.splice(cIndex, 1); // Saca 'C'
this.automaton.currentState = 'RESPONDIENDO'; // Estado 3
} else {
console.error("Error del autómata: Se esperaba 'C' en la pila.");
}
}
break;

case 'RESPONDIENDO': // Estado 3
if (action === 'RespondePregunta') {
// JFLAP: 3 -> 3 (RespondePregunta; P; λ)
const pIndex = this.automaton.pila.lastIndexOf('P'); // Busca 'P'
if (pIndex > -1) {
this.automaton.pila.splice(pIndex, 1); // Saca 'P'
// JFLAP: 3 -> 4 (λ; λ; λ) 
if (this.automaton.pila.length === 0) { // ¡Pila vacía!
this.automaton.currentState = 'PUNTUACION'; // Estado 4
}
} else {
console.error("Error del autómata: Se esperaba 'P' en la pila.");
}
}
break;

case 'PUNTUACION': // Estado 4
if (action === 'obtenerPuntuacion') {
// JFLAP: 4 -> 1 (obtenerPuntuacion; λ; λ)
this.automaton.currentState = 'INICIO'; // Estado 1
}
break;

case 'FIN': // Estado 5
if (action === 'Reiniciar') {
this.totalScore = 0;
this.automaton.currentState = 'INICIO';
}
break;

case 'CONFIRMAR_FIN':
if (action === 'CancelarFin') {
this.automaton.currentState = 'INICIO';
}
break;
}
console.log(`Transición: ${fromState} --${action}--> ${this.automaton.currentState} | Pila: [${this.automaton.pila.join(', ')}]`);
this.renderGameUI();
}
//--------------------------------------------------------------------------------------

renderGameUI() {
this.scoreDisplay.textContent = this.totalScore;
this.divCancion.style.display = 'none';
this.divPregunta.style.display = 'none';
this.pantallas.forEach(p => p.classList.remove('activa'));

switch (this.automaton.currentState) {
case 'INICIO':
document.getElementById('pantalla-inicio').classList.add('activa');
this.btnAgarrarTarjeta.disabled = false;
break;

case 'CANCION_PENDIENTE':
document.getElementById('pantalla-juego').classList.add('activa');
this.divCancion.style.display = 'block';

// la cancion es la etaoa 0
this.lyricPrompt.textContent = this.currentCard.etapas[0].pregunta + " ...";
this.lyricInput.value = '';
break;

case 'RESPONDIENDO':
document.getElementById('pantalla-juego').classList.add('activa');
this.divPregunta.style.display = 'block';

// Lógica de índice correcta
const pRestantes = this.automaton.pila.filter(p => p === 'P').length; // 4, 3, 2, 1
this.currentQuestionIndex = 4 - pRestantes; // Índice 0, 1, 2, o 3

// El índice de la etapa en la BD es el índice de pregunta + 1
const q = this.currentCard.etapas[this.currentQuestionIndex + 1];

this.questionTitle.textContent = `Desafío ${this.currentQuestionIndex + 2}: Pregunta ${this.currentQuestionIndex + 1}/4`;
this.questionText.textContent = q.pregunta;

this.optionsContainer.innerHTML = '';
const opciones = JSON.parse(q.opciones); 
opciones.forEach((option, index) => {
const button = document.createElement('button');
button.className = 'boton';
button.textContent = option;
button.dataset.index = index;
this.optionsContainer.appendChild(button);
});
break;

case 'PUNTUACION':
document.getElementById('pantalla-puntuacion').classList.add('activa');
let premio = "Sin Disco";
if (this.roundScore === 50) premio = "Platino";
else if (this.roundScore === 40) premio = "Oro";
else if (this.roundScore >= 30) premio = "Plata";
this.roundScoreDisplay.textContent = `¡Ganaste ${premio}! Sumaste ${this.roundScore} puntos.`;
this.totalScore += this.roundScore;
break;
case 'FIN':
document.getElementById('pantalla-fin').classList.add('activa');
this.finalScoreDisplay.textContent = `Tu puntuación final es de ${this.totalScore} puntos. ¡Gracias por jugar!`;
break;
case 'CONFIRMAR_FIN':
document.getElementById('pantalla-confirmar-fin').classList.add('activa');
break;
}
}


async handleAgarrarTarjeta() {
console.log("AJAX: Pidiendo nueva tarjeta a obtener_tarjeta.php...");
this.btnAgarrarTarjeta.disabled = true;

try {
const response = await fetch('obtener_tarjeta.php');
const tarjetaDesdeDB = await response.json();

if (tarjetaDesdeDB.error) {
throw new Error(tarjetaDesdeDB.error);
}

console.log("AJAX: Tarjeta recibida", tarjetaDesdeDB);
this.currentCard = tarjetaDesdeDB; 
this.currentQuestionIndex = 0; 
this.roundScore = 0;

this.automatonTransition('AgarrarTarjeta');

} catch (err) {
alert('No se pudo cargar una nueva tarjeta: ' + err.message);
this.btnAgarrarTarjeta.disabled = false; 
}
}

handleEnviarCancion() {
const answer = this.lyricInput.value.trim().toLowerCase();
const correct = this.currentCard.etapas[0].respuesta.trim().toLowerCase();

if (answer === correct) {
this.showFeedback('¡Correcto! +10 Puntos', true);
this.roundScore += 10;
} else {
this.showFeedback('¡Incorrecto!', false);
}

setTimeout(() => {
this.feedbackMessage.style.display = 'none';
this.automatonTransition('CompletaCancion');
}, 1000);
}

handleAnswerQuestion(event) {
const q = this.currentCard.etapas[this.currentQuestionIndex + 1]; 
const selectedIndex = parseInt(event.target.dataset.index); //los parseint son pq sino tomaba rtas correctas como incorrectas
const correctIndex = parseInt(q.respuesta_correcta);

if (selectedIndex === correctIndex) {
this.showFeedback('¡Correcto! +10 Puntos', true);
this.roundScore += 10;
} else {
this.showFeedback('¡Incorrecto!', false);
}

setTimeout(() => {
this.feedbackMessage.style.display = 'none';
this.automatonTransition('RespondePregunta');
}, 1000);
}

handleReiniciar() {
this.totalScore = 0;
this.roundScore = 0;
this.automaton.pila = [];
this.automatonTransition('Reiniciar');
}

handleCambiarJugador() {
localStorage.removeItem('playerName');
window.location.href = 'index.html'; 
}

// helpers---
loadPlayer() {
const storedName = localStorage.getItem('playerName');
if (storedName) {
this.playerName = storedName;
this.nombreJugadorSpan.textContent = this.playerName;
} else {
alert("No se encontró tu nombre. Redirigiendo al inicio.");
window.location.href = 'index.html';
}
}

showFeedback(message, isCorrect) {
this.feedbackMessage.textContent = message;
this.feedbackMessage.className = 'caja-mensaje';
this.feedbackMessage.classList.add(isCorrect ? 'mensaje-correcto' : 'mensaje-incorrecto');
this.feedbackMessage.style.display = 'block';
} 
}

document.addEventListener('DOMContentLoaded', () => {
const elMelomano = new Game();
elMelomano.init();
});