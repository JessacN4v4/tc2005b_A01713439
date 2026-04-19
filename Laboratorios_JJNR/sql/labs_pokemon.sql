-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2026 a las 22:24:20
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardar_equipo` (IN `p_usuario_id` INT, IN `p0` INT, IN `p1` INT, IN `p2` INT, IN `p3` INT, IN `p4` INT, IN `p5` INT)   BEGIN
      DECLARE EXIT HANDLER FOR SQLEXCEPTION
      BEGIN
          ROLLBACK;
          RESIGNAL;
      END;

      START TRANSACTION;

      DELETE FROM equipo WHERE usuario_id = p_usuario_id;

      IF p0 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p0, 0); END IF;
      IF p1 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p1, 1); END IF;
      IF p2 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p2, 2); END IF;
      IF p3 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p3, 3); END IF;
      IF p4 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p4, 4); END IF;
      IF p5 IS NOT NULL THEN INSERT INTO equipo (usuario_id, pokemon_id, slot) VALUES (p_usuario_id, p5, 5); END IF;

      COMMIT;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_equipo` (IN `p_usuario_id` INT)   BEGIN                                                                                                                                        
      SELECT e.slot, p.id_pokemon, p.nombre, p.imagen
      FROM equipo e                                                                                                                            
      INNER JOIN pokemon p ON p.id_pokemon = e.pokemon_id   
      WHERE e.usuario_id = p_usuario_id
      ORDER BY e.slot ASC;
  END$$

DELIMITER ;

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
  `imagen` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pokemon`
--

INSERT INTO `pokemon` (`id_pokemon`, `nombre`, `imagen`) VALUES
(9, 'Garchomp', '/images/pokemon/1776472352179-802009.png'),
(10, 'Gible', '/images/pokemon/1776472375651-859251.png'),
(11, 'Mamoswine', '/images/pokemon/1776472415390-653946.png'),
(12, 'Sneasler', '/images/pokemon/1776472431823-571425.png'),
(13, 'venusaur', '/images/pokemon/1776477146945-77515.png'),
(14, 'sableye', '/images/pokemon/1776477204643-918142.png'),
(15, 'hydreigon', '/images/pokemon/1776477228992-418561.png');

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
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de la tabla `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id_pokemon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
