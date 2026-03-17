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