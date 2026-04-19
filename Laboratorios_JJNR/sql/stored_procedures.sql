-- Stored Procedures — labs_pokemon
-- Para ejecutar en phpMyAdmin: pegar cada bloque por separado y establecer como delimitador ($$)


DELIMITER $$

-- SP1: Guarda el equipo completo de un usuario de forma atómica.
-- Recibe el usuario_id y los 6 pokemon_id (NULL si el slot está vacío).
-- Usa transacción: si falla cualquier INSERT se hace ROLLBACK total.

DROP PROCEDURE IF EXISTS sp_guardar_equipo$$

CREATE PROCEDURE sp_guardar_equipo(
    IN p_usuario_id INT,
    IN p0 INT, IN p1 INT, IN p2 INT,
    IN p3 INT, IN p4 INT, IN p5 INT
)
BEGIN
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

DELIMITER ;
