<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Melómano - Juego</title>
    <link rel="stylesheet" href="estilos/estilo.css">
    <script src="javascript/juego.js" defer></script> 
</head>
<body>
<div class="contenedor-juego">
    
    <header class="encabezado-juego">
        <h1>El Melómano</h1>
        <div class="contenedor-puntuacion">
            <span class="etiqueta-puntuacion">Puntuación Total</span>
            <span id="score-display" class="valor-puntuacion">0</span>
        </div>
    </header>

    <!-- (Estado 1) -->
    <div id="pantalla-inicio" class="pantalla activa">
        <h2>¡Bienvenido, <span id="nombre-jugador">Jugador</span>!</h2>
        <p>¿Listo para probar tu conocimiento musical? Agarra una tarjeta para empezar.</p>
        <button id="btn-agarrar-tarjeta" class="boton boton-primario">
            Agarrar Tarjeta
        </button>
        <button id="btn-fin-del-juego" class="boton boton-secundario">
            Terminar Juego
        </button>
    </div>

    <!-- (Estados 2 y 3) -->
    <div id="pantalla-juego" class="pantalla">
        <div id="desafio-cancion" class="contenedor-desafio">
            <h3>Desafío 1: Completa la Canción</h3>
            <p id="lyric-prompt" class="caja-consigna"></p>
            <input type="text" id="lyric-input" class="entrada-texto" placeholder="Escribe la parte que falta...">
            <button id="btn-enviar-cancion" class="boton boton-primario">
                Enviar Letra
            </button>
        </div>
        <div id="desafio-pregunta" class="contenedor-desafio">
            <h3 id="question-title">Desafío 2: Pregunta</h3>
            <p id="question-text" class="caja-consigna"></p>
            <div id="options-container" class="cuadricula-opciones">
            </div>
        </div>
        <div id="feedback-message" class="caja-mensaje"></div>
    </div>

    <!--  (Estado 4) -->
    <div id="pantalla-puntuacion" class="pantalla">
        <h2>¡Tarjeta Completada!</h2>
        <p id="round-score-display">Sumaste X puntos en esta ronda.</p>
        <button id="btn-siguiente-tarjeta" class="boton boton-primario">
            Siguiente Tarjeta
        </button>
    </div>

    <!--  (Estado 5) -->
    <div id="pantalla-fin" class="pantalla">
        <h2>Juego Terminado</h2>
        <p id="final-score-display">Tu puntuación final es de X puntos. ¡Gracias por jugar!</p>
        <button id="btn-reiniciar" class="boton boton-primario">
            Jugar de Nuevo
        </button>
    </div>

    <div id="pantalla-confirmar-fin" class="pantalla">
        <h2>¿Deseas salir?</h2>
        
        <div class="resumen-final">
            <h4>Tu Resumen Final:</h4>
            <div class="resumen-item">
                <span>Puntaje Total:</span>
                <strong id="final-summary-score">0</strong>
            </div>
            <div class="resumen-item">
                <span>Discos Platino:</span>
                <span id="final-summary-platino">0</span>
            </div>
            <div class="resumen-item">
                <span>Discos Oro:</span>
                <span id="final-summary-oro">0</span>
            </div>
            <div class="resumen-item">
                <span>Discos Plata:</span>
                <span id="final-summary-plata">0</span>
            </div>
        </div>

        <button id="btn-cambiar-jugador" class="boton boton-primario">
            Terminar juego
        </button>
        <button id="btn-cancelar-fin" class="boton boton-secundario">
            Seguir Jugando
        </button>
    </div>
</div>
</body>
</html>