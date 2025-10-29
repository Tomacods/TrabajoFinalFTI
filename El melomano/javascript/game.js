// --- 1. BASE DE DATOS DEL JUEGO ---
// esto lo tendriamos que cambiar despues para poder, no se agregar una base de datos don php 
const gameData = [
    {
        id: 1,
        cancion: {
            prompt: "We're no strangers to love, you know the rules and...",
            answer: "so do i"
        },
        preguntas: [
            { q: "¿Quién canta 'Never Gonna Give You Up'?", o: ["Michael Jackson", "Rick Astley", "George Michael"], a: 1 },
            { q: "¿En qué año se lanzó esta canción?", o: ["1987", "1991", "1983"], a: 0 },
            { q: "¿Cómo se llama el álbum?", o: ["Whenever You Need Somebody", "Love Songs", "The Best of Me"], a: 0 },
            { q: "¿De qué país es Rick Astley?", o: ["Estados Unidos", "Canadá", "Reino Unido"], a: 2 }
        ]
    },
    {
        id: 2,
        cancion: {
            prompt: "De música ligera, nada nos libra...",
            answer: "nada mas queda"
        },
        preguntas: [
            { q: "¿Quién canta 'De Música Ligera'?", o: ["Soda Stereo", "Enanitos Verdes", "Maná"], a: 0 },
            { q: "¿En qué álbum aparece?", o: ["Signos", "Doble Vida", "Canción Animal"], a: 2 },
            { q: "¿Cuál es la frase icónica de Cerati en el último concierto?", o: ["¡Gracias... totales!", "¡Buenas noches!", "¡Los amamos!"], a: 0 },
            { q: "¿De qué país es Soda Stereo?", o: ["Chile", "México", "Argentina"], a: 2 }
        ]
    },
    {
        id: 3,
        cancion: {
            prompt: "Is this the real life? Is this just...",
            answer: "fantasy"
        },
        preguntas: [
            { q: "¿Quién canta 'Bohemian Rhapsody'?", o: ["Queen", "Led Zeppelin", "The Who"], a: 0 },
            { q: "¿Quién fue el vocalista principal de Queen?", o: ["Brian May", "Roger Taylor", "Freddie Mercury"], a: 2 },
            { q: "¿El piano de esta canción es fácil de tocar?", o: ["Sí, es para principiantes", "No, es notoriamente difícil", "No tiene piano"], a: 1 },
            { q: "¿Qué frase de ópera repiten?", o: ["Figaro", "Scaramouche", "Galileo"], a: 2 }
        ]
    }
];

// --- 2. LA CLASE PRINCIPAL DEL JUEGO ---
class Game {
    constructor() {
        // --- a. Estado del Juego ---
        this.deck = [...gameData]; // Se inicializa el mazo
        this.currentCard = null; // La tarjeta actual en juego
        this.playerName = localStorage.getItem('playerName') || 'Jugador'; // Obtiene el nombre del localStorage
        this.currentQuestionIndex = 0; // Índice de la pregunta actual dentro de la tarjeta
        this.totalScore = 0; // Puntuación total del jugador
        this.roundScore = 0; // Puntuación obtenida en la tarjeta actual

        // --- b. El Autómata de Pila (PDA) ---
        this.automaton = { currentState: 'INICIO', pila: [] }; // El juego comienza directamente en INICIO

        // --- c. Referencias al DOM ---
        this.pantallas = document.querySelectorAll('.pantalla');
        this.scoreDisplay = document.getElementById('score-display');

        // Pantalla Nombre
        // Estas referencias ya no son necesarias aquí, se manejan en name_input.js
        this.nombreJugadorSpan = document.getElementById('nombre-jugador'); // Todavía necesario para mostrar el nombre
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

    // --- d. Método de Inicialización ---
    init() {
        // El botón de empezar juego se maneja en name_input.js
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

        this.nombreJugadorSpan.textContent = this.playerName; // Muestra el nombre del jugador al cargar
        this.renderGameUI();
    }

    automatonTransition(action) {
        const fromState = this.automaton.currentState; // Para depuración

        switch (this.automaton.currentState) {
            case 'INICIO':
                if (action === 'AgarrarTarjeta') {
                    // JFLAP: 1 -> 2 (AgarrarTarjeta; λ; PPPPC)
                    this.automaton.pila.push('P', 'P', 'P', 'P', 'C');
                    this.automaton.currentState = 'CANCION_PENDIENTE';
                } else if (action === 'FinDelJuego') {
                    // JFLAP: 1 -> 5 (FinDelJuego; λ; λ)
                    this.automaton.currentState = 'CONFIRMAR_FIN';
                }
                break;

            case 'CANCION_PENDIENTE':
                if (action === 'CompletaCancion') {
                    // JFLAP: 2 -> 3 (CompletaCancion; C; λ)
                    if (this.automaton.pila.length > 0 && this.automaton.pila[this.automaton.pila.length - 1] === 'C') {
                        this.automaton.pila.pop(); // Saca 'C'
                        this.automaton.currentState = 'RESPONDIENDO';
                    }
                }
                break;

            case 'RESPONDIENDO':
                if (action === 'RespondePregunta') {
                    // JFLAP: 3 -> 3 (RespondePregunta; P; λ)
                    if (this.automaton.pila.length > 0 && this.automaton.pila[this.automaton.pila.length - 1] === 'P') {
                        this.automaton.pila.pop(); // Saca 'P'
                        
                        // JFLAP: 3 -> 4 (λ; λ; λ) 
                        if (this.automaton.pila.length === 0) {
                            this.automaton.currentState = 'PUNTUACION';
                        }
                    }
                }
                break;

            case 'PUNTUACION':
                if (action === 'obtenerPuntuacion') {
                    // JFLAP: 4 -> 1 (obtenerPuntuacion; λ; λ)
                    this.automaton.currentState = 'INICIO';
                }
                break;
            
            case 'FIN':
                if (action === 'Reiniciar') {
                    this.automaton.currentState = 'INICIO';
                }
                break;
            
            case 'CONFIRMAR_FIN':
                if (action === 'CancelarFin') {
                    this.automaton.currentState = 'INICIO';
                }
                break;
        }
        
        console.log(`Transición: ${fromState} --${action}--> ${this.automaton.currentState} | Pila: [${this.automaton.pila}]`);
        this.renderGameUI();
    }

    renderGameUI() {
        this.scoreDisplay.textContent = this.totalScore;
        
    
        this.divCancion.style.display = 'none';
        this.divPregunta.style.display = 'none';

        // Mostramos la pantalla principal correcta
        this.pantallas.forEach(p => {
            p.classList.remove('activa');
        });

        switch (this.automaton.currentState) {
            case 'INICIO':
                if (this.deck.length === 0) {
                    this.deck = [...gameData];
                }
                document.getElementById('pantalla-inicio').classList.add('activa');
                break;

            case 'CANCION_PENDIENTE':
                document.getElementById('pantalla-juego').classList.add('activa');
                this.divCancion.style.display = 'block';
                
                this.lyricPrompt.textContent = this.currentCard.cancion.prompt + " ...";
                this.lyricInput.value = '';
                break;

            case 'RESPONDIENDO':
                document.getElementById('pantalla-juego').classList.add('activa');
                this.divPregunta.style.display = 'block';
                
                const q = this.currentCard.preguntas[this.currentQuestionIndex];
                this.questionTitle.textContent = `Desafío ${this.currentQuestionIndex + 2}: Pregunta ${this.currentQuestionIndex + 1}/4`;
                this.questionText.textContent = q.q;
                
                this.optionsContainer.innerHTML = '';
                q.o.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.dataset.index = index;
                    this.optionsContainer.appendChild(button);
                });
                break;

            case 'PUNTUACION':
                document.getElementById('pantalla-puntuacion').classList.add('activa');
                this.roundScoreDisplay.textContent = `Sumaste ${this.roundScore} puntos en esta ronda.`;
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

    handleAgarrarTarjeta() {
        this.currentCard = this.deck.pop();
        this.currentQuestionIndex = 0;
        this.roundScore = 0;
        
        this.automatonTransition('AgarrarTarjeta');
    }
    
    handleEnviarCancion() {
        const answer = this.lyricInput.value.trim().toLowerCase();
        const correct = this.currentCard.cancion.answer.toLowerCase();
        
        if (answer === correct) {
            this.showFeedback('¡Correcto! +10 Puntos', true);
            this.totalScore += 10;
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
        const selectedIndex = parseInt(event.target.dataset.index);
        const correctIndex = this.currentCard.preguntas[this.currentQuestionIndex].a;
        
        if (selectedIndex === correctIndex) {
            this.showFeedback('¡Correcto! +10 Puntos', true);
            this.totalScore += 10;
            this.roundScore += 10;
        } else {
            this.showFeedback('¡Incorrecto!', false);
        }
        
        this.currentQuestionIndex++;
        
        setTimeout(() => {
            this.feedbackMessage.style.display = 'none';
            this.automatonTransition('RespondePregunta');
        }, 1000);
    }

    handleReiniciar() {
        this.totalScore = 0;
        this.roundScore = 0;
        this.deck = [...gameData];
        this.automaton.pila = [];
        this.automatonTransition('Reiniciar');
    }

    handleCambiarJugador() {
        localStorage.removeItem('playerName');
        window.location.href = '../index.html';
    }

    // --- 6. MÉTODOS AYUDANTES (HELPERS) ---
    
    showFeedback(message, isCorrect) {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = 'caja-mensaje'; // Resetea clases
        this.feedbackMessage.classList.add(isCorrect ? 'mensaje-correcto' : 'mensaje-incorrecto');
        this.feedbackMessage.style.display = 'block';
    }
}

// --- 7. INICIO DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const elMelomano = new Game();
    elMelomano.init();
});