export const initSlides = ({ funcAddedSPlide = () => { } } = {}) => {
    let elms = document.getElementsByClassName('splide');

    for (let i = 0; i < elms.length; i++) {
        if (elms[i].classList.contains('loaded')) continue;
        elms[i].classList.add('loaded');
        let splide = new Splide(elms[i], {
            type: 'loop',
            autoplay: true,
            perMove: 1
        });
        let bar = splide.root.querySelector('.my-slider-progress-bar');

        // Updates the bar width whenever the carousel moves:
        // los stilos de el progress-bar estan en los estilos de inicioV1.css
        if (bar) {
            splide.on('mounted move', function () {
                let end = splide.Components.Controller.getEnd() + 1;
                let rate = Math.min((splide.index + 1) / end, 1);
                bar.style.width = String(100 * rate) + '%';
            });
        }
        splide.mount();
        funcAddedSPlide(splide);
    }
};

export const unloadSlides = () => {
    let elms = document.getElementsByClassName('splide');

    for (let i = 0; i < elms.length; i++) {
        if (elms[i].classList.contains('loaded')) elms[i].classList.remove('loaded');
    }
} 