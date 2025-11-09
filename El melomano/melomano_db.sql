-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-10-2025 a las 21:53:36
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `melomano_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desafio`
--

DROP TABLE IF EXISTS `desafio`;
CREATE TABLE IF NOT EXISTS `desafio` (
  `id_desafio` int NOT NULL AUTO_INCREMENT,
  `id_tarjeta` int NOT NULL,
  `orden` int NOT NULL,
  `tipo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pregunta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `opciones` text COLLATE utf8mb4_unicode_ci,
  `respuesta_correcta` int DEFAULT NULL,
  PRIMARY KEY (`id_desafio`),
  KEY `id_tarjeta` (`id_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `desafio`
--

INSERT INTO `desafio` (`id_desafio`, `id_tarjeta`, `orden`, `tipo`, `pregunta`, `respuesta`, `opciones`, `respuesta_correcta`) VALUES
(1, 1, 1, 'cancion', 'De música ligera, nada nos libra...', 'nada mas queda', NULL, NULL),
(2, 1, 2, 'pregunta', '¿Quién canta \'De Música Ligera\'?', 'Soda Stereo', '[\"Soda Stereo\", \"Enanitos Verdes\", \"Maná\"]', 0),
(3, 1, 3, 'pregunta', '¿En qué álbum aparece?', 'Canción Animal', '[\"Signos\", \"Doble Vida\", \"Canción Animal\"]', 2),
(4, 1, 4, 'pregunta', '¿Cuál es la frase icónica de Cerati en el último concierto?', '¡Gracias... totales!', '[\"¡Gracias... totales!\", \"¡Buenas noches!\", \"¡Los amamos!\"]', 0),
(5, 1, 5, 'pregunta', '¿De qué país es Soda Stereo?', 'Argentina', '[\"Chile\", \"México\", \"Argentina\"]', 2),
(6, 2, 1, 'cancion', 'Is this the real life? Is this just...', 'fantasy', NULL, NULL),
(7, 2, 2, 'pregunta', '¿Quién canta \'Bohemian Rhapsody\'?', 'Queen', '[\"Queen\", \"Led Zeppelin\", \"The Who\"]', 0),
(8, 2, 3, 'pregunta', '¿Quién fue el vocalista principal de Queen?', 'Freddie Mercury', '[\"Brian May\", \"Roger Taylor\", \"Freddie Mercury\"]', 2),
(9, 2, 4, 'pregunta', '¿El piano de esta canción es fácil de tocar?', 'No, es notoriamente difícil', '[\"Sí, es para principiantes\", \"No, es notoriamente difícil\", \"No tiene piano\"]', 1),
(10, 2, 5, 'pregunta', '¿Qué frase de ópera repiten?', 'Galileo', '[\"Figaro\", \"Scaramouche\", \"Galileo\"]', 2),
(11, 3, 1, 'cancion', 'When you were here before\r\nCouldn\'t look you in the eye You\'re just like an ...', 'angel', NULL, NULL),
(12, 3, 2, 'pregunta', '¿Quién canta \'Creep\'?', 'Radiohead', '[\"The Smiths\", \"Radiohead\", \"Nirvana\"]', 1),
(13, 3, 3, 'pregunta', '¿En qué año se lanzó esta canción?', '1992', '[\"1992\", \"2000\", \"1997\"]', 0),
(14, 3, 4, 'pregunta', '¿Cómo se llama el álbum?', 'Pablo Honey', '[\"OK Computer\", \"Kid A\", \"Pablo Honey\"]', 2),
(15, 3, 5, 'pregunta', '¿De qué país es Thom Yorke?', 'Inglaterra', '[\"Estados Unidos\", \"Canadá\", \"Inglaterra\"]', 2),
(16, 4, 1, 'cancion', 'Yo que crecí con Videla, yo que...', ' nací sin poder', NULL, NULL),
(17, 4, 2, 'pregunta', '¿Cuál de estas bandas NO formó parte Charly García?', 'Sui Generis', '[\"Sui Generis\", \"Serú Girán\", \"Los Gatos\"]', 2),
(18, 4, 3, 'pregunta', '¿En qué ciudad se grabó \"Clics Modernos\"?', 'Nueva York', '[\"Buenos Aires\", \"Madrid\", \"Nueva York\"]', 2),
(19, 4, 4, 'pregunta', 'Charly es conocido por tener \"oído...\"', 'Absoluto', '[\"Biónico\", \"Relativo\", \"Absoluto\"]', 2),
(20, 4, 5, 'pregunta', '¿Cuál es su famoso lema y concepto artístico?', 'Say No More', '[\"Say No More\", \"El Aguante\", \"Random\"]', 0),
(21, 5, 1, 'cancion', 'Muchacha ojos de papel, adónde vas?...', 'quedate hasta el alba', NULL, NULL),
(22, 5, 2, 'pregunta', '¿Cuál de estas bandas NO fue liderada por Spinetta?', 'Sui Generis', '[\"Almendra\", \"Pescado Rabioso\", \"Sui Generis\"]', 2),
(23, 5, 3, 'pregunta', '¿A quién le dedicó \"Muchacha (Ojos de Papel)\"?', 'Su primera novia', '[\"Una fan\", \"Su hermana\", \"Su primera novia\"]', 2),
(24, 5, 4, 'pregunta', '¿Cómo se le conoce popularmente a Spinetta?', 'El Flaco', '[\"El Flaco\", \"El Jefe\", \"El Poeta\"]', 0),
(25, 5, 5, 'pregunta', '¿Qué álbum conceptual de Pescado Rabioso es considerado una obra maestra?', 'Artaud', '[\"Artaud\", \"Kamikaze\", \"Pelusón of Milk\"]', 0),
(26, 6, 1, 'cancion', 'Mejor no ... de ciertas cosas', 'hablar', NULL, NULL),
(27, 6, 2, 'pregunta', '¿Quién fue el icónico cantante y líder de Sumo?', 'Luca Prodan', '[\"Luca Prodan\", \"Indio Solari\", \"Gustavo Cerati\"]', 0),
(28, 6, 3, 'pregunta', '¿De qué país era originario Luca Prodan?', 'Italia (nacido en Roma)', '[\"Inglaterra\", \"Escocia\", \"Italia (nacido en Roma)\"]', 2),
(29, 6, 4, 'pregunta', '¿Qué canción popular está cantada casi toda en inglés?', 'La Rubia Tarada', '[\"La Rubia Tarada\", \"El Ojo Blindado\", \"Heroína\"]', 0),
(30, 6, 5, 'pregunta', '¿Qué dos bandas famosas se formaron tras la disolución de Sumo?', 'Divididos y Las Pelotas', '[\"Divididos y Las Pelotas\", \"Los Piojos y Attaque 77\", \"Babasónicos\"]', 0),
(31, 7, 1, 'cancion', 'Im a weirdo, what the hell am I doing here?...', 'I don\'t belong here', NULL, NULL),
(32, 7, 2, 'pregunta', '¿Qué álbum de 1997 es considerado su obra maestra por muchos críticos?', 'OK Computer', '[\"OK Computer\", \"In Rainbows\", \"Kid A\"]', 0),
(33, 7, 3, 'pregunta', '¿Cuál de estas canciones NO pertenece al álbum \"OK Computer\"?', 'Creep', '[\"Paranoid Android\", \"Karma Police\", \"Creep\"]', 2),
(34, 7, 4, 'pregunta', '¿Qué álbum de 2000 marcó un cambio drástico hacia la música electrónica?', 'Kid A', '[\"The Bends\", \"Kid A\", \"Hail to the Thief\"]', 1),
(35, 7, 5, 'pregunta', '¿Cómo se llama el guitarrista principal, conocido por su uso de efectos?', 'Jonny Greenwood', '[\"Ed O\'Brien\", \"Jonny Greenwood\", \"Colin Greenwood\"]', 1),
(36, 8, 1, 'cancion', 'Yendo de la cama ...', 'al living', NULL, NULL),
(37, 8, 2, 'pregunta', '¿Qué superbanda formó junto a Spinetta, Lebón y Aznar?', 'Serú Girán', '[\"Almendra\", \"La Máquina de Hacer Pájaros\", \"Serú Girán\"]', 2),
(38, 8, 3, 'pregunta', '¿En qué álbum solista aparece la canción \"Nos siguen pegando abajo\"?', 'Clics Modernos', '[\"Clics Modernos\", \"Piano Bar\", \"Yendo de la cama al living\"]', 0),
(39, 8, 4, 'pregunta', '¿Cómo se llamó la banda que formó con Nito Mestre?', 'Sui Generis', '[\"Sui Generis\", \"Porsuigieco\", \"Serú Girán\"]', 0),
(40, 8, 5, 'pregunta', '¿Desde qué piso saltó Charly a una pileta en un hotel de Mendoza?', '9no piso', '[\"5to piso\", \"9no piso\", \"12vo piso\"]', 1),
(41, 9, 1, 'cancion', 'We don\'t need no...', 'education', NULL, NULL),
(42, 9, 2, 'pregunta', '¿Qué álbum icónico tiene un prisma refractando luz en la portada?', 'The Dark Side of the Moon', '[\"The Wall\", \"The Dark Side of the Moon\", \"Wish You Were Here\"]', 1),
(43, 9, 3, 'pregunta', '¿Quién fue el principal compositor y bajista tras la salida de Syd Barrett?', 'Roger Waters', '[\"David Gilmour\", \"Roger Waters\", \"Nick Mason\"]', 1),
(44, 9, 4, 'pregunta', 'La canción \"Another Brick in the Wall\" pertenece al álbum...', 'The Wall', '[\"The Wall\", \"Animals\", \"Meddle\"]', 0),
(45, 9, 5, 'pregunta', '¿Qué álbum es un tributo al fundador Syd Barrett?', 'Wish You Were Here', '[\"The Dark Side of the Moon\", \"Wish You Were Here\", \"The Division Bell\"]', 1),
(46, 10, 1, 'cancion', 'All my friends are heathens, take it...', 'slow', NULL, NULL),
(47, 10, 2, 'pregunta', '¿A qué banda sonora de película pertenece la canción \"Heathens\"?', 'Suicide Squad', '[\"Suicide Squad\", \"Batman v Superman\", \"Guardians of the Galaxy\"]', 0),
(48, 10, 3, 'pregunta', '¿Qué instrumento principal toca Josh Dun?', 'Batería', '[\"Batería\", \"Bajo\", \"Ukelele\"]', 0),
(49, 10, 4, 'pregunta', 'Además de cantar, Tyler Joseph es conocido por tocar el...', 'Ukelele y Piano', '[\"Ukelele y Piano\", \"Guitarra principal\", \"Violín\"]', 0),
(50, 10, 5, 'pregunta', '¿Qué color es el símbolo principal de la era del álbum \"Trench\"?', 'Amarillo', '[\"Amarillo\", \"Rojo\", \"Azul\"]', 0),
(51, 11, 1, 'cancion', 'I\'m acar, a torch,...', ' a death', NULL, NULL),
(52, 11, 2, 'pregunta', '¿A qué álbum pertenece la canción \"Car Radio\"?', 'Vessel', '[\"Blurryface\", \"Vessel\", \"Trench\"]', 1),
(53, 11, 3, 'pregunta', 'En la canción \"Car Radio\", ¿qué le robaron al cantante?', 'La radio del auto', '[\"El auto\", \"El celular\", \"La radio del auto\"]', 2),
(54, 11, 4, 'pregunta', '¿Qué canción del álbum \"Vessel\" repite la frase \"Entertain my faith\"?', 'Holding on to You', '[\"Ode to Sleep\", \"Holding on to You\", \"Trees\"]', 1),
(55, 11, 5, 'pregunta', '¿Quiénes aparecen en la portada del álbum \"Vessel\"?', 'Los abuelos de Tyler y Josh', '[\"Tyler y Josh de niños\", \"Tyler y Josh en la actualidad\", \"Los abuelos de Tyler y Josh\"]', 2),
(56, 12, 1, 'cancion', 'When I was a young boy, my father took me into the city...', 'to see a marching band', NULL, NULL),
(57, 12, 2, 'pregunta', '¿Quién es el vocalista principal de My Chemical Romance?', 'Gerard Way', '[\"Gerard Way\", \"Frank Iero\", \"Mikey Way\"]', 0),
(58, 12, 3, 'pregunta', '¿Qué álbum conceptual de 2006 es su obra más famosa?', 'The Black Parade', '[\"Three Cheers for Sweet Revenge\", \"The Black Parade\", \"Danger Days\"]', 1),
(59, 12, 4, 'pregunta', 'La canción \"Welcome to the Black Parade\" trata sobre un personaje llamado...', 'The Patient (El Paciente)', '[\"Helena\", \"The Patient (El Paciente)\", \"Zero Percent\"]', 1),
(60, 12, 5, 'pregunta', '¿De qué estado de EE.UU. es originaria la banda?', 'Nueva Jersey', '[\"Nueva York\", \"California\", \"Nueva Jersey\"]', 2),
(61, 13, 1, 'cancion', 'Flaca, no me claves tus...', 'puñales', NULL, NULL),
(62, 13, 2, 'pregunta', '¿Qué banda formó en España junto a Ariel Rot?', 'Los Rodríguez', '[\"Los Rodríguez\", \"Tequila\", \"Los Abuelos de la Nada\"]', 0),
(63, 13, 3, 'pregunta', '¿En qué icónica banda argentina tocó antes de ser solista?', 'Los Abuelos de la Nada', '[\"Soda Stereo\", \"Los Abuelos de la Nada\", \"Serú Girán\"]', 1),
(64, 13, 4, 'pregunta', '¿Cómo se llama su famoso álbum quíntuple (5 CDs) de 103 canciones?', 'El Salmón', '[\"Honestidad Brutal\", \"El Salmón\", \"Alta Suciedad\"]', 1),
(65, 13, 5, 'pregunta', '¿En qué álbum aparece la canción \"Flaca\"?', 'Alta Suciedad', '[\"Alta Suciedad\", \"Nadie sale vivo de aquí\", \"Honestidad Brutal\"]', 0),
(66, 14, 1, 'cancion', 'Will you still love me when I\'m no longer...', 'young and beautiful', NULL, NULL),
(67, 14, 2, 'pregunta', '¿A qué banda sonora de película pertenece \"Young and Beautiful\"?', 'The Great Gatsby', '[\"Twilight\", \"The Great Gatsby\", \"The Hunger Games\"]', 1),
(68, 14, 3, 'pregunta', '¿Cuál es su álbum debut (de estudio principal) que la lanzó a la fama?', 'Born to Die', '[\"Born to Die\", \"Ultraviolence\", \"Norman F***ing Rockwell!\"]', 0),
(69, 14, 4, 'pregunta', '¿Cuál es el nombre real de Lana Del Rey?', 'Elizabeth Grant', '[\"Lana Rey\", \"Elizabeth Grant\", \"Marina Diamandis\"]', 1),
(70, 14, 5, 'pregunta', 'La canción \"Summertime Sadness\" se hizo mundialmente famosa por un remix de...', 'Cedric Gervais', '[\"David Guetta\", \"Calvin Harris\", \"Cedric Gervais\"]', 2),
(71, 15, 1, 'cancion', 'It\'s you, it\'s you, it\'s all for...', 'you', NULL, NULL),
(72, 15, 2, 'pregunta', '¿En qué álbum se encuentra la canción \"Video Games\"?', 'Born to Die', '[\"Ultraviolence\", \"Born to Die\", \"Honeymoon\"]', 1),
(73, 15, 3, 'pregunta', '¿Qué apodo se asocia con su estética \"vintage melancólica\"?', 'Sad Girl', '[\"Queen of Pop\", \"Sad Girl\", \"Material Girl\"]', 1),
(74, 15, 4, 'pregunta', '¿Qué estado de EE.UU. es central en su iconografía (playas, Hollywood)?', 'California', '[\"New York\", \"Florida\", \"California\"]', 2),
(75, 15, 5, 'pregunta', '¿Qué álbum de 2019 fue aclamado y nominado a \"Álbum del Año\" en los Grammys?', 'Norman Fucking Rockwell!', '[\"Lust for Life\", \"Chemtrails...\", \"Norman Fucking Rockwell!\"]', 2),
(76, 16, 1, 'cancion', 'I\'m a Barbie girl, in a ...', 'Barbie world', NULL, NULL),
(77, 16, 2, 'pregunta', '¿Qué banda canta la icónica canción \"Barbie Girl\"?', 'Aqua', '[\"Spice Girls\", \"Aqua\", \"Vengaboys\"]', 1),
(78, 16, 3, 'pregunta', '¿De qué país es originaria la banda Aqua?', 'Dinamarca/Noruega', '[\"Suecia\", \"Estados Unidos\", \"Dinamarca/Noruega\"]', 2),
(79, 16, 4, 'pregunta', '¿En qué año fue lanzada \"Barbie Girl\"?', '1997', '[\"1994\", \"1997\", \"2001\"]', 1),
(80, 16, 5, 'pregunta', '¿Cómo se llama el cantante masculino (el \"Ken\") de la banda?', 'René Dif', '[\"Ken\", \"René Dif\", \"Claus Norreen\"]', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

DROP TABLE IF EXISTS `tarjeta`;
CREATE TABLE IF NOT EXISTS `tarjeta` (
  `id_tarjeta` int NOT NULL AUTO_INCREMENT,
  `artista` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`id_tarjeta`, `artista`) VALUES
(1, 'Soda Stereo'),
(2, 'Queen'),
(3, 'Radiohead'),
(4, 'Charly García'),
(5, 'Luis Alberto Spinetta'),
(6, 'Sumo'),
(7, 'Radiohead'),
(8, 'Charly García'),
(9, 'Pink Floyd'),
(10, 'Twenty One Pilots'),
(11, 'Twenty One Pilots'),
(12, 'My Chemical Romance'),
(13, 'Andrés Calamaro'),
(14, 'Lana Del Rey'),
(15, 'Lana Del Rey'),
(16, 'Aqua');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `desafio`
--
ALTER TABLE `desafio`
  ADD CONSTRAINT `desafio_ibfk_1` FOREIGN KEY (`id_tarjeta`) REFERENCES `tarjeta` (`id_tarjeta`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
