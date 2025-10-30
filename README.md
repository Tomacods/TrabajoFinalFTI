Trabajo Final FTI - "El Melómano" (2025)

Este proyecto es una implementación web del juego de mesa "El Melómano", como trabajo final para la materia "Fundamentos Teóricos de la Informática".

La lógica del juego está controlada por un Autómata de Pila (AP) diseñado en JFLAP e implementado en una arquitectura web real.

🤖 El Autómata y la Arquitectura

El proyecto sigue un modelo Cliente-Servidor (Frontend/Backend):

Frontend (Cliente): index.html (Lobby) y juego.php (la página del juego).

Motor (JavaScript): La clase Game en juego.js contiene la lógica del Autómata de Pila (AP). Este autómata maneja los estados del juego (menú, canción, preguntas, puntuación) y usa una Pila (array) para contar las 5 tareas (PPPPC) de cada tarjeta.

Backend (Servidor): Un servidor WAMPP o XAMPP (Apache) ejecuta PHP.

API (PHP): El archivo obtener_tarjeta.php recibe llamadas AJAX (fetch) desde el JavaScript.

Base de Datos (PHP): La clase melomano.class.php se conecta a MySQL para buscar las tarjetas y desafíos.

🚀 Cómo Ejecutar el Proyecto

Para que el proyecto funcione, debes correrlo en un servidor local.

1. Instalar WAMPP (o XAMPP)

Instala y ejecuta WAMPP (o XAMPP).

Inicia los servicios Apache y MySQL. Asegúrate de que el ícono de WAMPP se ponga VERDE.

2. Copiar Archivos

Copia la carpeta completa del proyecto (melomano) dentro de la carpeta www de WAMPP.

Ruta de ejemplo: C:\wamp64\www\melomano\

3. Importar Base de Datos

Abre phpMyAdmin en tu navegador (usualmente http://localhost/phpmyadmin/).

Crea la Base de Datos:

Nombre: melomano_db

Cotejamiento: utf8mb4_unicode_ci

Importar:

Haz clic en la base de datos melomano_db, ve a la pestaña "Importar" y selecciona el archivo .sql del proyecto.

Haz clic en "Continuar".

4. Configurar Conexión PHP

Abre el archivo C:\wamp64\www\melomano\melomano.class.php.

Revisa la línea new mysqli(...). La configuración por defecto de WAMPP (usuario root, sin contraseña) es:

$con = new mysqli("localhost", "root", "", "melomano_db");



5. ¡Jugar!

Abre tu navegador y ve a la dirección de tu proyecto:

http://localhost/melomano/
