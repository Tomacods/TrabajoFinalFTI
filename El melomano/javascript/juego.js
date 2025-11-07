class Game {
    constructor() {
        this.currentCard = null;
        this.playerName = '';
        this.currentQuestionIndex = 0;
        this.totalScore = 0;
        this.roundScore = 0;

        // contador d discos
        this.recordCounts = {
            Platino: 0,
            Oro: 0,
            Plata: 0,
            SinDisco: 0
        };

        // --- El Autómata de Pila (PDA) ---
        this.automaton = {
            currentState: 'INICIO',
            pila: [],
        };

        // --- Referencias al DOM ---
        this.pantallas = document.querySelectorAll('.pantalla');
        this.scoreDisplay = document.getElementById('score-display');
        this.nombreJugadorSpan = document.getElementById('nombre-jugador'); 
        this.btnAgarrarTarjeta = document.getElementById('btn-agarrar-tarjeta');
        this.btnFinDelJuego = document.getElementById('btn-fin-del-juego');
        this.divCancion = document.getElementById('desafio-cancion');
        this.lyricPrompt = document.getElementById('lyric-prompt');
        this.lyricInput = document.getElementById('lyric-input');
        this.btnEnviarCancion = document.getElementById('btn-enviar-cancion');
        this.divPregunta = document.getElementById('desafio-pregunta');
        this.questionTitle = document.getElementById('question-title');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.feedbackMessage = document.getElementById('feedback-message');
        this.roundScoreDisplay = document.getElementById('round-score-display');
        this.btnSiguienteTarjeta = document.getElementById('btn-siguiente-tarjeta');
        this.finalScoreDisplay = document.getElementById('final-score-display');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.btnCambiarJugador = document.getElementById('btn-cambiar-jugador');
        this.btnCancelarFin = document.getElementById('btn-cancelar-fin');
    }

    
    init() {
        this.loadPlayer(); 
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
//---------------------------------------------------LOGICA DE AUTOMATA------------------------------------------------------------------
    automatonTransition(action) {
        const fromState = this.automaton.currentState;
        switch (this.automaton.currentState) {
            case 'INICIO': // Estado 1
                if (action === 'AgarrarTarjeta') {
                    this.automaton.pila = ['P', 'P', 'P', 'P', 'C'];
                    this.automaton.currentState = 'CANCION_PENDIENTE'; // Estado 2
                } else if (action === 'FinDelJuego') {
                    this.automaton.currentState = 'CONFIRMAR_FIN';
                }
                break;

            case 'CANCION_PENDIENTE': // Estado 2
                if (action === 'CompletaCancion') {
                    const cIndex = this.automaton.pila.lastIndexOf('C'); 
                    if (cIndex > -1) {
                        this.automaton.pila.splice(cIndex, 1); 
                        this.automaton.currentState = 'RESPONDIENDO'; // Estado 3
                    } else {
                        console.error("Error del autómata: Se esperaba 'C' en la pila.");
                    }
                }
                break;

            case 'RESPONDIENDO': // Estado 3
                if (action === 'RespondePregunta') {
                    const pIndex = this.automaton.pila.lastIndexOf('P');
                    if (pIndex > -1) {
                        this.automaton.pila.splice(pIndex, 1); 
                        if (this.automaton.pila.length === 0) { 
                            this.automaton.currentState = 'PUNTUACION'; // Estado 4
                        }
                    } else {
                        console.error("Error del autómata: Se esperaba 'P' en la pila.");
                    }
                }
                break;

            case 'PUNTUACION': // Estado 4
                if (action === 'obtenerPuntuacion') {
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
//-----------------------------------------------------------------------------------------------------------------------------------

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
                this.lyricPrompt.textContent = this.currentCard.etapas[0].pregunta + " ...";
                this.lyricInput.value = '';
                break;
            case 'RESPONDIENDO':
                document.getElementById('pantalla-juego').classList.add('activa');
                this.divPregunta.style.display = 'block';

                const pRestantes = this.automaton.pila.filter(p => p === 'P').length;
                this.currentQuestionIndex = 4 - pRestantes; 
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
                let premio = "Sin Disco :(";
                if (this.roundScore === 50) {
                    premio = "Disco Platino";
                    this.recordCounts.Platino++; 
                } else if (this.roundScore === 40) {
                    premio = "Disco Oro";
                    this.recordCounts.Oro++; 
                } else if (this.roundScore >= 30) {
                    premio = "Disco Plata";
                    this.recordCounts.Plata++; 
                } else {
                    this.recordCounts.SinDisco++; 
                }
                this.roundScoreDisplay.textContent = `Resultados: ¡ ${premio}! Sumaste ${this.roundScore} puntos.`;
                this.totalScore += this.roundScore;
                break;

            case 'FIN':
                document.getElementById('pantalla-fin').classList.add('activa');
                this.finalScoreDisplay.textContent = `Tu puntuación final es de ${this.totalScore} puntos. ¡Gracias por jugar!`;
                break;

            case 'CONFIRMAR_FIN':
                document.getElementById('pantalla-confirmar-fin').classList.add('activa');

                
                document.getElementById('final-summary-score').textContent = this.totalScore;
                document.getElementById('final-summary-platino').textContent = this.recordCounts.Platino;
                document.getElementById('final-summary-oro').textContent = this.recordCounts.Oro;
                document.getElementById('final-summary-plata').textContent = this.recordCounts.Plata;
                break;
        }
    }



    async handleAgarrarTarjeta() {
        console.log("AJAX: Pidiendo nueva tarjeta a obtener_tarjeta.php...");
        this.btnAgarrarTarjeta.disabled = true;

        try {
            const response = await fetch('obtener_tarjeta.php?accion=nueva_tarjeta');
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
        const selectedIndex = parseInt(event.target.dataset.index);
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

        this.recordCounts = { Platino: 0, Oro: 0, Plata: 0, SinDisco: 0 };

        this.automatonTransition('Reiniciar');
    }

    handleCambiarJugador() {
        localStorage.removeItem('playerName');
        window.location.href = 'index.html';
    }

    loadPlayer() {
        const storedName = localStorage.getItem('playerName');
        if (storedName) {
            this.playerName = storedName;
            

            if (this.nombreJugadorSpan) {
                this.nombreJugadorSpan.textContent = this.playerName;
            }
            
            const nombreEnMenu = document.getElementById('nombre-jugador-menu');
            if (nombreEnMenu) {
                nombreEnMenu.textContent = this.playerName;
            }
            
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