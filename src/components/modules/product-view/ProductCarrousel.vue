<script setup>
import { onMounted, watch } from 'vue';
import { randomBoolean, randomNumber } from '../../../helpers';

const props = defineProps({
    productView: {
        type: Object,
        default: {
            img_path: ''
        }
    }
});

const initCarrusel = () => {
    let main = new Splide('#main-carousel', {
        type: 'fade',
        rewind: true,
        pagination: false,
        arrows: false,
        perPage: 1
    });

    let thumbnails = new Splide('#thumbnail-carousel', {
        // perPage: 6,
        fixedWidth: 100,
        fixedHeight: 60,
        gap: 10,
        rewind: true,
        pagination: false,
        isNavigation: true,
        // breakpoints: {
        //     600: {
        //         fixedWidth: 60,
        //         fixedHeight: 44,
        //     },
        // },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
};

watch(() => props.productView, (newValue) => {
    if (newValue && newValue.id) {
        const idT = setTimeout(() => {
            initCarrusel();
            window.clearTimeout(idT);
        }, 700)
    }
})

onMounted(() => {
    // initCarrusel();
});
</script>

<template>
    <!-- Animacion carga -->
    <picture class="img-container mb-5" v-if="!productView || !productView.id">
        <div class="loanding-animation"></div>
    </picture>

    <!-- Images -->
    <!-- <picture v-else class="img-container">
        <img :src="productView.img_path" alt="">
        <section v-if="randomBoolean(.6)" class="discount-product"><span>{{ randomNumber(18) + 2 }}% OFF</span>
        </section>
    </picture> -->

    <section v-else class="carrusel">
        <section id="main-carousel" class="splide main-carousel" aria-label="Beautiful Images">
            <section v-if="randomBoolean(.6)" class="discount-product"><span>{{ randomNumber(18) + 2 }}% OFF</span>
            </section>
            <div class="splide__track">
                <ul class="splide__list">
                    <!-- <li class="splide__slide" v-for=" index in 10" :key="index">
                        <img src="https://splidejs.com/images/slides/general/05.jpg" alt="">
                    </li> -->
                    <li v-for=" index in 5" :key="index" class="splide__slide">
                        <img :src="productView.img_path" alt="">
                    </li>
                </ul>
            </div>
        </section>

        <section id="thumbnail-carousel" class="splide thumbnail-carousel"
            aria-label="The carousel with thumbnails. Selecting a thumbnail will change the Beautiful Gallery carousel.">
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev">
                    <i class="fa-solid fa-angle-left"></i> </button>
                <button class="splide__arrow splide__arrow--next">
                    <i class="fa-solid fa-angle-right"></i> </button>
            </div>
            <div class="splide__track">
                <ul class="splide__list">
                    <!-- <li class="splide__slide" v-for=" index in 10" :key="index">
                        <img src="https://splidejs.com/images/slides/general/05.jpg" alt="">
                    </li> -->
                    <li v-for=" index in 5" :key="index" class="splide__slide">
                        <img :src="productView.img_path" alt="">
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>

<style scoped>
@media screen and (max-width: 650px) {
    .thumbnail-carousel {
        width: 80% !important;
        height: 50px !important;
    }

    .thumbnail-carousel .splide__slide {
        height: max-content !important;
        width: 80px !important;
    }

    .thumbnail-carousel .splide__slide {
        margin-right: 0px !important;
    }

    .thumbnail-carousel .splide__slide img {
        width: 70px !important;
        height: 50px !important;
        object-fit: contain;
    }

    .thumbnail-carousel .splide__arrow i {
        font-size: 35px !important;
    }
}

.carrusel {
    border-radius: 3px;
    margin: 0 auto;
    margin-bottom: 5px;
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.07);
    max-width: 88vw !important;
    max-width: 600px !important;
    /* width: 93%; */
}

.thumbnail-carousel {
    cursor: pointer;
    position: relative;
    width: 90%;
    max-width: 500px;
    height: auto !important;
    display: block !important;
    margin: 0 auto;
    margin-bottom: 0px !important;
    background-color: white;
    padding: 5px 0;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
    /* overflow: hidden; */
}

.thumbnail-carousel .splide__arrow {
    background: transparent !important;
    color: rgba(0, 0, 0, 0.9) !important;
    border: unset !important;
    transition: opacity .3s ease-in-out;
}

.thumbnail-carousel .splide__arrow:focus {
    border: unset !important;
}

.thumbnail-carousel .splide__arrow i {
    font-size: 40px;
}

.thumbnail-carousel .splide__arrows .splide__arrow--prev {
    left: -30px !important;
}

.thumbnail-carousel .splide__arrows .splide__arrow--next {
    right: -30px !important;
}

.thumbnail-carousel .splide__slide {
    border: unset !important;
    /* background-color: red; */
    opacity: 0.6;
    margin-right: 3px !important;
    transition: opacity .2s ease-in-out;
}

.thumbnail-carousel .splide__slide.is-active {
    opacity: 1;
    border: unset;
    margin-bottom: 0 !important;
}


.thumbnail-carousel .splide__slide img {
    width: 100px;
    height: 60px;
    object-fit: contain;
}

.main-carousel {
    cursor: pointer;
    position: relative;
    margin-top: 100px;
    width: 90%;
    /* max-width: 90vw !important; */
    /* max-width: 500px; */
    height: 450px !important;
    display: block !important;
    margin: 0 auto;
    margin-bottom: 10px !important;
    background-color: white;
    padding: 0 0 0 0;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
    /* overflow: hidden; */
}

.main-carousel .splide__track {
    width: 100%;
    height: 100%;
}

.main-carousel .splide__track .splide__list {
    width: 100%;
    height: 100%;
}

.main-carousel .splide__track .splide__list .splide__slide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 0;
}

.main-carousel .splide__slide img {
    width: 80% !important;
    height: 80% !important;
    object-fit: contain;
    position: relative;
    z-index: 10;
}

.img-container {
    cursor: pointer;
    position: relative;
    width: 90%;
    max-width: 500px;
    height: 450px !important;
    display: block !important;
    margin: 0 auto;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
}

@media screen and (max-width: 992px) and (min-width: 600px) {

    .img-container,
    .main-carousel {
        height: 550px !important;
    }

    .img-container img,
    .main-carousel .splide__slide img {
        width: 60% !important;
        height: 60% !important;
    }
}


@media screen and (max-width: 600px) and (min-width: 500px) {

    .img-container,
    .main-carousel {
        height: 450px !important;
    }
}

@media screen and (max-width: 500px) {

    .img-container,
    .main-carousel {
        height: 350px !important;
    }
}

/* .img-container:hover img {
    scale: 1.05;
} */

.img-container img {
    /* transition: scale .3s ease-in-out; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    object-fit: contain;
}

.img-container .discount-product,
.main-carousel .discount-product {
    cursor: pointer;
    position: absolute;
    top: 3%;
    right: -2.5%;
    width: max-content;
    background-color: rgba(70, 94, 246, 0.983);
    box-shadow: 0 0 15px rgba(8, 28, 151, 0.502);
    padding: 0 9px;
    padding-bottom: 2px;
    border-radius: 5px;
    z-index: 30;
}


.img-container .discount-product span,
.main-carousel .discount-product span {
    color: rgba(255, 255, 255, 1);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
}
</style>