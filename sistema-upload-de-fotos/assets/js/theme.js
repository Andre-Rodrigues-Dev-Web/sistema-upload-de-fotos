//Evento seleciona a capa
document.getElementById('capa').addEventListener('change', (event) => {
    const progressBar = document.getElementById('progressBar');
    const imagePreview = document.getElementById('imagePreview');

    const [file] = event.target.files;

    if (file) {
        // Simulando carregamento com barra de progresso
        let progressValue = 0;
        progressBar.style.display = "block";
        const interval = setInterval(() => {
            if (progressValue < 100) {
                progressValue += 10;
                progressBar.value = progressValue;
            } else {
                clearInterval(interval);
                // Mostrando a imagem depois de "carregar"
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

            imgContainer.append(img, removeButton);
            imagesContainer.appendChild(imgContainer);
        };

        reader.readAsDataURL(file);
    });
});

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

