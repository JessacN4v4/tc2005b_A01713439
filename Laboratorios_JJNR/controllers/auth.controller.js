const db = require('../utils/database');
const bcrypt = require('bcryptjs');

//GET /login
exports.getLogin = (request, response, next) => {
    response.render('login', { error: null });
};

//POST /login
exports.postLogin = (request, response, next) => {
    const { usuario, password } = request.body;

    db.execute('SELECT * FROM usuraios WHERE usuario = ?', [usuario])
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.render('login', { error: "Usuario o contraseña incorrectos" });
            }

            const user = rows[0];

            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        return response.render('login', { error: "Usuario o contraseña incorrectos" });
                    }

                    request.session.isLoggedIn = true;   
                    request.session.user = user;         
                    request.session.id_user = user.id_user; 
                    request.session.rol_id = user.rol_id;
                    request.session.usuario = user.usuario;

                    return request.session.save(err => {
                        if (err) {
                            console.error('Error al guardar la sesión:', err);
                        }
                        response.redirect('/menu');
                    });
                });
        })
        .catch(err => {
            console.error(err);
            response.status(500).send("Error interno del servidor");
        });
};

//GET /logout
exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};

//GET /cambiar-password
exports.getCambiarPassword = (request, response, next) => {
    response.render('cambiar_password', { error: null, success: null });
};

//POST /cambiar-password
exports.postCambiarPassword = (request, response, next) => {
    const { passwordActual, passwordNueva, passwordConfirm } = request.body;
    const userId = request.session.id_user;

    if (passwordNueva !== passwordConfirm) {
        return response.render('cambiar_password', {
            error: 'La nueva contraseña y su confirmación no coinciden.',
            success: null
        });
    }

    db.execute('SELECT password FROM usuraios WHERE id_user = ?', [userId])
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.render('cambiar_password', {
                    error: 'Usuario no encontrado.',
                    success: null
                });
            }

            return bcrypt.compare(passwordActual, rows[0].password)
                .then(doMatch => {
                    if (!doMatch) {
                        return response.render('cambiar_password', {
                            error: 'La contraseña actual es incorrecta.',
                            success: null
                        });
                    }

                    return bcrypt.hash(passwordNueva, 10)
                        .then(hash => {
                            return db.execute(
                                'UPDATE usuraios SET password = ? WHERE id_user = ?',
                                [hash, userId]
                            );
                        })
                        .then(() => {
                            response.render('cambiar_password', {
                                error: null,
                                success: '¡Contraseña actualizada correctamente!'
                            });
                        });
                });
        })
        .catch(err => {
            console.error(err);
            response.status(500).send('Error interno del servidor');
        });
};