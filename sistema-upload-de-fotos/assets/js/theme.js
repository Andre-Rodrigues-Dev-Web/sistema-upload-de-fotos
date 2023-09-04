//Evento seleciona a capa
document.getElementById('capa').addEventListener('change', (event) => {
    const progressBar = document.getElementById('progressBar');
    const imagePreview = document.getElementById('imagePreview');

    const [file] = event.target.files;

    if (file) {
        let progressValue = 0;
        progressBar.style.display = "block";
        const interval = setInterval(() => {
            if (progressValue < 100) {
                progressValue += 10;
                progressBar.value = progressValue;
            } else {
                clearInterval(interval);
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        }, 100);
    }
});

//Evento que carrega as imagens do album
document.getElementById('fotos').addEventListener('change', event => {
    const imagesContainer = document.getElementById('imagesContainer');
    
    [...event.target.files].forEach(file => {
        const reader = new FileReader();

        reader.onload = e => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-wrapper');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('loaded-image');
            img.draggable = true;

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => imagesContainer.removeChild(imgContainer));

            const filterButton = document.createElement('button');
            filterButton.innerHTML = '<i class="fas fa-paint-brush"></i> Aplicar filtro';
            filterButton.classList.add('filter-button');
            filterButton.addEventListener('click', (e) => {
                e.preventDefault();
                showFilterOptions(img);
            });

            imgContainer.append(img, removeButton, filterButton);
            imagesContainer.appendChild(imgContainer);
        };

        reader.readAsDataURL(file);
    });
});

//Filtros
function showFilterOptions(img) {
    const modal = document.createElement('div');
    modal.classList.add('filter-options');

    const filters = [
        { text: 'Escala de Cinza', style: 'filter: grayscale(100%)' },
        { text: 'Desfoque', style: 'filter: blur(5px)' },
        { text: 'Sépia', style: 'filter: sepia(100%)' },
        { text: 'Brilho', style: 'filter: brightness(150%)' },
        { text: 'Contraste', style: 'filter: contrast(150%)' },
        { text: 'Rotação de Matiz', style: 'filter: hue-rotate(90deg)' },
        { text: 'Inverter', style: 'filter: invert(100%)' },
        { text: 'Saturação', style: 'filter: saturate(200%)' },
        { text: 'Opacidade', style: 'filter: opacity(50%)' },
        { text: 'Sombra', style: 'filter: drop-shadow(5px 5px 5px gray)' },
        { text: 'Rotacionar 45°', style: 'transform: rotate(45deg)' },
        { text: 'Escalar 1.5x', style: 'transform: scale(1.5)' },
        { text: 'Mover 30px à direita', style: 'transform: translateX(30px)' },
        { text: 'Cor Azul', style: 'color: blue' },
        { text: 'Estilo Normal', style: '' }
    ];

    filters.forEach(filter => {
        const btn = document.createElement('button');
        btn.innerText = filter.text;
        btn.addEventListener('click', () => {
            img.style.cssText = filter.style;
            document.body.removeChild(modal);
        });
        modal.appendChild(btn);
    });

    document.body.appendChild(modal);
}
//Drag and drop
let draggedImage;

document.addEventListener("dragstart", function(event) {
    draggedImage = event.target;
    event.target.style.opacity = 0.5;
}, false);

document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

document.addEventListener("dragleave", function(event) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("drop", function(event) {
    event.preventDefault();

    if (event.target.className == "loaded-image") {
        const container = document.getElementById('imagesContainer');
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;

        if (x < rect.width / 2) {
            container.insertBefore(draggedImage, event.target);
        } else {
            container.insertBefore(draggedImage, event.target.nextSibling);
        }
    }

    event.target.style.opacity = "";
}, false);

document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
}, false);

