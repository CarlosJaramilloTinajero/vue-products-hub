// Animacion para cuando se haga click en un boton de la paginacion
export const setDisplayAnimation = ({ type, flex = true, block = true }) => {
    if (flex) {
        let productsCatalogue = document.querySelectorAll(
            '.on-render-products-catalogue');
        for (let i = 0; i < productsCatalogue.length; i++) {
            const element = productsCatalogue[i];
            element.style.display = type === 'show' ? 'flex' : "none";
        }

        let productsCatalogueLoanding = document.querySelectorAll(
            '.on-render-products-catalogue-loanding');
        for (let i = 0; i < productsCatalogueLoanding.length; i++) {
            const element = productsCatalogueLoanding[i];
            element.style.display = type === 'show' ? 'none' : "flex";
        }
    }

    if (block) {
        let productsCatalogueBlock = document.querySelectorAll(
            '.on-render-products-catalogue-d-block');

        for (let i = 0; i < productsCatalogueBlock.length; i++) {
            const element = productsCatalogueBlock[i];
            element.style.display = type === 'show' ? 'block' : "none";
        }

        let productsCatalogueLoandingBlock = document.querySelectorAll(
            '.on-render-products-catalogue-loanding-d-block');

        for (let i = 0; i < productsCatalogueLoandingBlock.length; i++) {
            const element = productsCatalogueLoandingBlock[i];
            element.style.display = type === 'show' ? 'none' : "block";
        }
    }
};
// Fin animacion boton paginacion  

export const animationInitApp = () => {
    window.scrollTo(0, 0);
    let id2 = setTimeout(() => {
        let animacion = document.getElementById('animacion');
        animacion.style.opacity = '1';
        window.clearTimeout(id2);
    }, 500);


    let loadings = document.getElementsByClassName('loading');
    let id = setTimeout(() => {
        let animacion = document.getElementById('animacionInicio');
        animacion.style.opacity = 0;
        let id2 = setTimeout(() => {
            animacion.style.display = "none";
            window, clearTimeout(id2);
        }, 1000);
        for (let i = 0; i < loadings.length; i++) {
            loadings[i].style.opacity = "1";
        }
        window.clearInterval(id);
    }, 1300);
};
