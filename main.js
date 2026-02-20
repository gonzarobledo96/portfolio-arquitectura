document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    
    // Crear botones de navegación dinámicamente
    lightbox.insertAdjacentHTML('beforeend', `
        <button id="prev-btn" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
        <button id="next-btn" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
    `);

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let fotosActuales = [];
    let indiceActual = 0;

    // Al hacer clic en una portada de proyecto
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const nombreGaleria = item.getAttribute('data-galeria');
            
            // Buscamos todas las imágenes que tengan ese mismo nombre de galería
            const imagenesEncontradas = document.querySelectorAll(`[data-galeria="${nombreGaleria}"] img`);
            fotosActuales = Array.from(imagenesEncontradas).map(img => img.src);
            
            indiceActual = 0;
            actualizarLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function actualizarLightbox() {
        lightboxImg.src = fotosActuales[indiceActual];
        // Ocultar flechas si solo hay una foto
        prevBtn.style.display = nextBtn.style.display = fotosActuales.length > 1 ? 'block' : 'none';
    }

    const nextFoto = (e) => { e.stopPropagation(); indiceActual = (indiceActual + 1) % fotosActuales.length; actualizarLightbox(); };
    const prevFoto = (e) => { e.stopPropagation(); indiceActual = (indiceActual - 1 + fotosActuales.length) % fotosActuales.length; actualizarLightbox(); };

    nextBtn.addEventListener('click', nextFoto);
    prevBtn.addEventListener('click', prevFoto);
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar si hace clic en el fondo negro
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeBtn.click();
    });
});