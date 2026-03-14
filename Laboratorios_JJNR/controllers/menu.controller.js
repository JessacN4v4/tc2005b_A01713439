const FONDOS = {
    bg1: "bg-gray-900",            
    bg2: "bg-slate-200",               
    img1: "url('/img/bg_151_pkm.jpg')",
    img2: "url('/img/bg_pkb_y.jpg')"
};

//Middleware para proteger rutas
exports.protegerRuta = (request, response, next) => {
    if (!request.session.usuario) {
        return response.redirect('/login');
    }
    next();
};

//GET /menu
exports.getMenu = (request, response, next) => {

    //leer cookie
    const cookieHeader = request.get('Cookie') || "";
    let fondo = "bg-gray-900"; // fondo por defecto

    const cookie = cookieHeader
        .split(';')
        .find(c => c.trim().startsWith("fondoMenu="));

    if (cookie) {
        const valor = cookie.split('=')[1];
        if (FONDOS[valor]) fondo = FONDOS[valor];
    }

    response.render('menu', {
        fondo,
        usuario: request.session.usuario
    });
};

//POST /menu/fondo
exports.postCambiarFondo = (request, response, next) => {
    const { fondo } = request.body;

    if (!FONDOS[fondo]) {
        return response.status(400).send("Fondo inválido");
    }

    //uardar cookie por 30 dias
    response.setHeader(
        'Set-Cookie',
        `fondoMenu=${fondo}; Max-Age=${60 * 60 * 24 * 30}; HttpOnly`
    );

    response.redirect('/menu');
};