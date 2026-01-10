function showSection(id) {
    document.querySelectorAll('.section-item')
        .forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.subnav')
        .forEach(s => s.style.display = 'none');

    document.getElementById(id).style.display = 'block';
    document.querySelector(`.section-item[onclick*="${id}"]`)
        .classList.add('active');

    if (id === 'codigo' && lastRepo) {
        const btn = document.querySelector(
            `#codigo button[onclick*="${lastRepo}"]`
        );
        if (btn) showCode(lastRepo, {
            currentTarget: btn
        });
    }
}


const summaries = {
    "academico/Montaje_PLD.pdf": {
        title: "Montaje de Sistema PLD",
        text: "Montaje experimental Pulsed Laser Deposition para la síntesis de películas delgadas ferromagnéticas. Se realizó la alineación y caracterización de láser infrarrojo, junto con la puesta en funcionamiento de una cámara de vacío. Se llevó a cabo una deposición preliminar de YIG sobre sustratos sólidos con respuesta magnética, verificada mediante mediciones MOKE."
    },
    "academico/Análisis_Vibracional_y_Rotacional_del_Hidrógeno_Diatómico.pdf": {
        title: "Análisis Vibracional y Rotacional del Hidrógeno Diatómico",
        text: "Modelo de enlace para la molécula de hidrógeno mediante simulaciones de Density Functional Theory basados en mecánica cuántica. Se describen los estados de vibración y rotación, mostrando buena concordancia con la literatura y destacando su utilidad como marco introductorio para sistemas moleculares simples."
    },
    "academico/Chasis_CubeSat.pdf": {
        title: "Diseño de Chasis para CubeSat 3U",
        text: "Diseño estructural de un chasis CubeSat 3U mediante optimización topológica y fabricado mediante manufactura aditiva Selective Laser Melting. Compatible con estándares internacionales de lanzamiento, sistemas deployer y condiciones de operación en ambiente orbital."
    },
    "academico/Simulacion_Chasis_CubeSat.pdf": {
        title: "Simulación Mecánica Chasis CubeSat",
        text: "Análisis estructural de un chasis CubeSat 3U considerando aceleraciones lineales, expansión térmica y respuesta vibracional, incluyendo vibraciones inducidas por el lanzamiento y excitaciones aleatorias representativas del entorno dinámico del cohete. Los resultados validan la integridad mecánica bajo condiciones operacionales realistas."
    },
    "academico/Prediccion_Afinacion_de_Parches_de_Tambor.pdf": {
        title: "Afinación de Parche de Tambor",
        text: "Desarrollo de un modelo de red neuronal que relaciona la tensión de los pernos de afinación con el perfil acústico de un tambor. Se estudia un floor tom con un parche superior uniformemente tenso, estableciendo la base para un sistema de afinación de batería."
    }
};

function showPDF(btn, filename) {
    document.getElementById('viewer').src = filename;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const s = summaries[filename];
    if (s) {
        document.getElementById('doc-title').textContent = s.title;
        document.getElementById('doc-text').textContent = s.text;
    }

    location.hash = encodeURIComponent(filename);
}

const repos = {
    Repo1: {
        title: 'Spotify Sorter',
        text: 'Herramienta para organizar playlists de Spotify.',
        repo: 'iangrosssan/Sorter-Spotify'
    },
    Repo2: {
        title: 'Herramientas de Mecánico',
        text: 'Utilidades de cálculo y automatización mecánica.',
        repo: 'iangrosssan/Herramientas_de_Mecanico'
    },
    Repo3: {
        title: 'Controlador Montaje PLD',
        text: 'Código de control para sistemas PLD.',
        repo: 'iangrosssan/Controlador_Montaje_PLD'
    }
};

function showCode(repoId, event) {
    document.querySelectorAll('#codigo .nav-item')
        .forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const r = repos[repoId];
    if (!r) return;

    document.getElementById('doc-title').textContent = r.title;
    document.getElementById('doc-text').textContent = r.text;

    const viewer = document.getElementById('viewer');

    /* fuerza recarga incluso si ya hay una instancia */
    viewer.src = 'about:blank';

    setTimeout(() => {
        viewer.src = `repo-viewer.html#${encodeURIComponent(r.repo)}`;
    }, 0);

    location.hash = repoId;
}
/* hash restore on reload */
(function() {
    const h = decodeURIComponent((location.hash || '').slice(1));
    if (!h) return;

    if (summaries[h]) {
        const btn = document.querySelector(`button[onclick*="${h}"]`);
        if (btn) showPDF(btn, h);
        return;
    }

    if (repos[h]) {
        showSection('codigo');
        const btn = document.querySelector(`#codigo button[onclick*="${h}"]`);
        if (btn) showCode(h, {
            currentTarget: btn
        });
    }
})();

window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('last-update');
    if (!el) return;

    const d = new Date(document.lastModified);
    el.textContent =
        `Última actualización: ${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
});
