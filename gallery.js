const ctx = document.querySelector('.row'); 
let currentHTML = ctx.innerHTML;

const imageArray = [
    'img-16-CPC-Padel-Club.jpg', 
    'img-23-Padelstage-november-2023.png', 
    'img-4-Casa-Perola-inside.jpeg', 
    'img-18-CPC-Padel-Club.jpg', 
    'img-19-Nazare.jpg', 
    'img-14-CPC-padel-cub.jpg', 
    'img-20-Nazare-beach.jpg', 
    'img-25-sunset-nazare.jpg', 
    'img-8-Casa-Perola-house-pool.jpg', 
    'img-15-CPC-Padel-Club.jpg', 
    'img-3-Casa-Perola-house.png', 
    'img-21-Nazare-boats.jpg', 
    'img-22-Padelstage-November2023.png', 
    'img-12-Casa-Perola-Pool.png', 
    'img-24-Padelstage-maart-2024.jpg', 
    'img-9-Casa-Perola-Dining-outside.jpg', 
    'img-1-Padelstage-maart.jpg',
    'img-26-Casa-Perola-Room.png'
];

function init() {
    ////console.log("Initialization started...");
    selectAllImages();
}

function selectAllImages() {
    const allImages = document.querySelectorAll(".gallery-image");

    allImages.forEach((image) => {
        image.addEventListener('click', (e) => {
            e.preventDefault();

            const imageUrl = e.currentTarget.src; 

            //console.log("Image URL:", imageUrl);

            const imageId = e.currentTarget.id;
            let imageArrayNumber;

            for(let i = 0; i <= imageArray.length; i++){
                if( i == imageId){
                    // //console.log(imageId, "id:", i);
                    imageArrayNumber = i;
                    renderImage(i);
                }
            }          
        });
    });
}


function renderImage(i){
    const existingGallery = document.querySelector('.fullscreen-gallery-wrapper');
    if (existingGallery) existingGallery.remove();
    const htmlString = `
        <div class="fullscreen-gallery-wrapper">
            <div class="fullscreen-gallery">
                <div class="fullscreen-image">
                    <div class="close">
                        <p>x</p>
                    </div>
                    
                    <img class="gallery-image fullscreen-img" src="assets/images/Gallery/${imageArray[i]}" alt="Casa Perola room">
                    
                </div>
            </div>
        </div>
    `;

    ctx.innerHTML += htmlString;
    renderOptions(i);

    const fullscreenImg = document.querySelector('.fullscreen-img');
    fullscreenImg.onload = () => {
        resizeImage(fullscreenImg);
        // //console.log(fullscreenImg);
    };

    closeButtons();
}

function resizeImage(imgElement) {
    let maxWidth = window.innerHeight;
    let maxHeight = window.innerWidth;

    if(window.innerWidth > 1024){
        maxWidth = window.innerWidth * 0.4;
        maxHeight = window.innerHeight * 0.6;
    }else {
        maxWidth = window.innerWidth * 0.95;
        maxHeight = window.innerHeight * 0.6;
    }
    //console.log(window.innerHeight, window.innerWidth, maxHeight, maxWidth)
    if (window.innerWidth > 1024) {
        //console.log("Window wider than 1024px, resizing image...", imgElement.width);
        if (imgElement.width > 2) {
            imgElement.style.width = `${maxWidth}px`;
        }
        if (imgElement.height > maxHeight) {
            imgElement.style.height = `${maxHeight}px`;
            imgElement.style.width= "";
            // imgElement.style.margin= "0 35px";
        }
    } else if (window.innerWidth < 1024) {
        //console.log("Window width below 1024px, applying different resizing...", maxWidth, maxHeight, imgElement.width, imgElement.height);
        if (imgElement.width > 2) {
            imgElement.style.width = `${maxWidth}px`;
        }
        if (imgElement.height > maxHeight) {
            //console.log(imgElement.height)
            imgElement.style.height = `${maxHeight}px`;
            // imgElement.style.margin= "0 35px";
        }
    }
}

function closeButtons() {
    const closeBtn = document.querySelector('.close p');

    const closeGallery = () => {
        ctx.innerHTML = currentHTML; 
        selectAllImages(); 
    };

    if (closeBtn) closeBtn.addEventListener('click', closeGallery);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGallery();
        }
    });
}

function renderOptions(i) {
    const fullscreenImageContainer = document.querySelector('.fullscreen-image');

    const htmlString = `
        <div class="image-options">
            <div class="previous">
                <p><</p>
            </div>
            <div class="next">
                <p>></p>
            </div>
        </div>
    `;
    fullscreenImageContainer.innerHTML += htmlString;

    const nextImageBtn = document.querySelector('.next');
    const previousImageBtn = document.querySelector('.previous');

    nextImageBtn.addEventListener('click', () => {
        const nextIndex = (i + 1) % imageArray.length;
        renderImage(nextIndex);
    });

    previousImageBtn.addEventListener('click', () => {
        const prevIndex = (i - 1 + imageArray.length) % imageArray.length;
        renderImage(prevIndex);
    });
}



init();
