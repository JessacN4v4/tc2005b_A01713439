//Usuario y contraseña de prueba
const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDO = "a";

//GET /login
exports.getLogin = (request, response, next) => {
    response.render('login');
};

//POST /login
exports.postLogin = (request, response, next) => {
    const { usuario, password } = request.body;

    //validacion 
    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {

        //se guarda la sesion
        request.session.usuario = usuario;

        return response.redirect('/menu');
    }

    //regresar login si falla
    response.render('login',{error:"Usuario y/o contraseña incorrectos"});
};

//GET /logout
exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};