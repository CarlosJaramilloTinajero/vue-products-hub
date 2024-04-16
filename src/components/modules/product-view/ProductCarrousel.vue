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

<style scoped></style>