const path = require('path');
const PDFDocument = require('pdfkit');

const Pokemon = require('../models/pokemons');
const Equipo = require('../models/equipos');
const { getPokemonVGC } = require('../utils/pokeapi');

// PDF helpers 

const TYPE_COLORS = {
    normal: '#a8a878', fire: '#f08030', water: '#6890f0',
    electric: '#c8a800', grass: '#78c850', ice: '#98d8d8',
    fighting: '#c03028', poison: '#a040a0', ground: '#b89828',
    flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
    rock: '#b8a038', ghost: '#705898', dragon: '#7038f8',
    dark: '#705848', steel: '#9898b8', fairy: '#ee99ac',
    stellar: '#40b5a5'
};

function cap(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function drawBadge(doc, label, x, y) {
    const color = TYPE_COLORS[label] || '#888888';
    doc.roundedRect(x, y, 44, 11, 3).fill(color);
    doc.fillColor('white').fontSize(6.5).font('Helvetica-Bold')
        .text(label, x, y + 2, { width: 44, align: 'center', lineBreak: false });
}

function drawSection(doc, title, titleColor, lines, x, y, colW) {
    doc.fillColor(titleColor).fontSize(6.5).font('Helvetica-Bold')
        .text(title, x, y, { width: colW, lineBreak: false });

    doc.fillColor('#374151').fontSize(7.5).font('Helvetica');
    lines.forEach((line, i) => {
        doc.text(cap(line), x, y + 11 + i * 10, { width: colW, lineBreak: false });
    });
}

function drawCard(doc, p, cx, cy, cw, ch) {
    // Fondo de tarjeta
    doc.roundedRect(cx, cy, cw, ch, 6).fillAndStroke('#f8fafc', '#cbd5e1');

    // Imagen
    const imgX = cx + 10, imgY = cy + 8;
    try {
        const imgPath = path.join(__dirname, '../public', p.imagen);
        doc.image(imgPath, imgX, imgY, { fit: [68, 68] });
    } catch {
        doc.roundedRect(imgX, imgY, 68, 68, 4).fill('#e2e8f0');
    }

    // Nombre
    doc.fillColor('#1e293b').fontSize(9).font('Helvetica-Bold')
        .text(cap(p.nombre), imgX, imgY + 72, { width: 72, align: 'center', lineBreak: false });

    // Tipos
    const totalBadgeW = p.types.length * 44 + (p.types.length - 1) * 3;
    const badgeX0 = imgX + (72 - totalBadgeW) / 2;
    p.types.forEach((t, i) => drawBadge(doc, t, badgeX0 + i * 47, imgY + 85));

    // Línea divisoria
    doc.moveTo(cx + 92, cy + 8).lineTo(cx + 92, cy + ch - 8)
        .strokeColor('#cbd5e1').lineWidth(0.5).stroke();

    // 4 columnas de info
    const colStart = cx + 97;
    const colW = (cw - 97 - 8 - 15) / 4; // 4 cols con 3 gaps de 5pt

    const sections = [
        { title: 'HABILIDADES',  color: '#7c3aed', lines: p.abilities.map(a => a.name + (a.hidden ? ' (oc.)' : '')) },
        { title: 'DEBILIDADES',  color: '#dc2626', lines: p.weaknesses.map(w => `${w.type}  ×${w.mult}`) },
        { title: 'RESISTENCIAS', color: '#16a34a', lines: p.resistances.map(r => `${r.type}  ${r.mult === 0 ? '✕' : '½'}`) },
        { title: 'MOVESET',      color: '#b45309', lines: p.moves }
    ];

    sections.forEach((s, i) => {
        drawSection(doc, s.title, s.color, s.lines, colStart + i * (colW + 5), cy + 8, colW);
    });
}

// Controllers 

exports.getEquipo = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;
        if (!idUser) return response.redirect('/login');

        const [rows] = await Equipo.getEquipo(idUser);

        const equipo = Array(6).fill(null);
        rows.forEach(r => equipo[r.slot] = r.pokemon_id);

        const equipoConDatos = await Promise.all(
            equipo.map(async id => {
                if (!id) return null;
                const [p] = await Pokemon.findById(id);
                return p[0];
            })
        );

        const [pokemons] = await Pokemon.fetchAll();

        response.render('equipo', {
            equipo: equipoConDatos,
            pokemons,
            equipoLleno: rows.length === 6
        });

    } catch (error) {
        console.error('Error en getEquipo:', error);
        response.status(500).send('Error interno del servidor');
    }
};

exports.getDetalle = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;
        const [rows] = await Equipo.getEquipo(idUser);

        const equipo = await Promise.all(
            rows.map(async r => {
                const [p] = await Pokemon.findById(r.pokemon_id);
                const db = p[0];
                const vgc = await getPokemonVGC(db.nombre);
                return { ...db, ...vgc };
            })
        );

        response.render('detalle_equipo', { equipo });

    } catch (error) {
        console.error('Error en getDetalle:', error);
        response.status(500).send('Error interno del servidor');
    }
};

exports.getPDF = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;
        const [rows] = await Equipo.getEquipo(idUser);

        if (!rows.length) return response.status(400).send('No hay equipo guardado.');

        const equipo = await Promise.all(
            rows.map(async r => {
                const [p] = await Pokemon.findById(r.pokemon_id);
                const db = p[0];
                const vgc = await getPokemonVGC(db.nombre);
                return { ...db, ...vgc };
            })
        );

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename="equipo-vgc.pdf"');

        const doc = new PDFDocument({ size: 'A4', margin: 0 });
        doc.pipe(response);

        const MARGIN = 35;
        const CARD_W = 525;
        const CARD_H = 112;
        const CARD_GAP = 6;

        // Encabezado
        doc.fillColor('#6d28d9').fontSize(20).font('Helvetica-Bold')
            .text('Equipo VGC', MARGIN, 30);

        const today = new Date().toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        doc.fillColor('#6b7280').fontSize(9).font('Helvetica')
            .text(today, MARGIN, 55);

        // Tarjetas
        let startY = 70;
        for (const p of equipo) {
            drawCard(doc, p, MARGIN, startY, CARD_W, CARD_H);
            startY += CARD_H + CARD_GAP;
        }

        doc.end();

    } catch (error) {
        console.error('Error generando PDF:', error);
        response.status(500).send('Error al generar el PDF');
    }
};

exports.postLimpiar = async (request, response, next) => {
    try {
        await Equipo.limpiar(request.session.id_user);
        response.redirect('/menu');
    } catch (error) {
        console.error('Error al limpiar equipo:', error);
        response.status(500).send('Error interno del servidor');
    }
};

exports.postActualizar = async (request, response, next) => {
    try {
        const idUser = request.session.id_user;
        const nuevoEquipo = request.body.equipo;
        await Equipo.setEquipo(idUser, nuevoEquipo);
        response.json({ ok: true });
    } catch (error) {
        console.error('Error en postActualizar:', error);
        response.status(500).json({ ok: false });
    }
};
