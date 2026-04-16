-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-04-2026 a las 15:31:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `labs_pokemon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id_equipo` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `pokemon_id` int(11) NOT NULL,
  `slot` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pokemon`
--

CREATE TABLE `pokemon` (
  `id_pokemon` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` varchar(40) NOT NULL,
  `imagen` varchar(300) NOT NULL,
  `debilidades` varchar(200) NOT NULL,
  `fortalezas` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pokemon`
--

INSERT INTO `pokemon` (`id_pokemon`, `nombre`, `descripcion`, `tipo`, `imagen`, `debilidades`, `fortalezas`) VALUES
(1, 'Umbreon', 'Si se expone al aura de la luna, los anillos de su cuerpo relucen.', 'Siniestro', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/197.png', 'Bicho, Hada, Lucha', 'Fantasma, Psíquico'),
(2, 'Venusaur', 'Puede convertir la luz del sol en energía. Por esa razón, es más poderoso en verano', 'Planta/Veneno', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png', 'Fuego, Hielo, Bicho, Volador,Psíquico', 'Roca, Tierra, Agua, Hada, Planta, Agua'),
(3, 'Sableye', 'Hace su guarida en cuevas oscuras y come gemas.', 'Siniestro/Fantasma', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/302.png', 'Hada', 'Fantasma, Psíquico'),
(4, 'Dratini', 'Muda muchas veces de piel mientras crece.', 'Dragón', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/147.png', 'Dragón, Hada, Hielo', 'Dragón'),
(5, 'Gengar', 'Se oculta en las sombras y absorbe el calor de sus víctimas.', 'Fantasma/Veneno', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png', 'Tierra, Fantasma, Siniestro', 'Hada, Fantasma, Planta, Psíquico'),
(6, 'Lycanroc', 'Ataca con colmillos y garras afiladas.', 'Roca', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/745.png', 'Tierra, Lucha, Planta, Agua, Hierro', 'Fuego, Hielo, Volador, Bicho'),
(7, 'Gible', 'Permanece oculto en cuevas y muerde con fuerza.', 'Dragón/Tierra', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/443.png', 'Hielo, Hada, Dragón', 'Dragón, Roca, Fuego, Eléctrico, Veneno, Hierro'),
(8, 'Yamper', 'Genera electricidad al correr.', 'Eléctrico', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/835.png', 'Tierra', 'Agua, Volador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegios`
--

CREATE TABLE `privilegios` (
  `id_privilegio` int(11) NOT NULL,
  `nombre_privilegio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `privilegios`
--

INSERT INTO `privilegios` (`id_privilegio`, `nombre_privilegio`) VALUES
(5, 'cambiar_fondo'),
(1, 'crear_pokemon'),
(2, 'editar_pokemon'),
(3, 'eliminar_pokemon'),
(4, 'ver_equipo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'admin'),
(2, 'editor'),
(3, 'lector');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `rol_id` int(11) NOT NULL,
  `privilegio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_privilegio`
--

INSERT INTO `rol_privilegio` (`rol_id`, `privilegio_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 5),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuraios`
--

CREATE TABLE `usuraios` (
  `id_user` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuraios`
--

INSERT INTO `usuraios` (`id_user`, `usuario`, `password`, `rol_id`) VALUES
(1, 'admin', '$2b$10$Rp5wINDRGK2D1tyDbHVeI.u3Iv39wEGkJIh3mX6OrxYRWF5CeAnny', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `fk_usuario` (`usuario_id`),
  ADD KEY `fk_pokemon` (`pokemon_id`);

--
-- Indices de la tabla `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`id_pokemon`);

--
-- Indices de la tabla `privilegios`
--
ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id_privilegio`),
  ADD UNIQUE KEY `nombre_privilegio` (`nombre_privilegio`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD PRIMARY KEY (`rol_id`,`privilegio_id`),
  ADD KEY `fk_privilegio` (`privilegio_id`);

--
-- Indices de la tabla `usuraios`
--
ALTER TABLE `usuraios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id_pokemon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `privilegios`
--
ALTER TABLE `privilegios`
  MODIFY `id_privilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuraios`
--
ALTER TABLE `usuraios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `fk_pokemon` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id_pokemon`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuraios` (`id_user`);

--
-- Filtros para la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `fk_privilegio` FOREIGN KEY (`privilegio_id`) REFERENCES `privilegios` (`id_privilegio`),
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
