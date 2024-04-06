<script setup>
import { ref, onMounted } from 'vue';
import { getProductsByAPI } from '../../../services/APIService';
import { initSlides, unloadSlides } from '../../../helpers/splideHelper';
import ProductSlide from './ProductSlide.vue';
import ProductSlideAnimation from './ProductSlideAnimation.vue'

const props = defineProps({
    categorySlug: {
        type: String,
        default: ''
    },
    brands: {
        type: Array,
        default: []
    }
});

const products = ref(null);

onMounted(() => {
    // initSlides();
    getProductsByAPI({
        filters: { categorySlug: props.categorySlug, withOutFilters: true, brands: props.brands },
        page: 1,
        perPage: 9,
        funcSuccess: data => {
            // unloadSlides();
            products.value = data.data.products.data;
            let idT = setTimeout(() => {
                initSlides();
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 160
                });
                window.clearTimeout(idT);
            }, 500);
        }
    });
});

</script>

<template>
    <section v-if="products" class="splide" data-splide='
    {
        "type":"loop",
        "autoplay": true,
        "perPage": 4,
        "breakpoints": {
            "1250": {"perPage": 3},
            "900": {"perPage": 3},
            "750": {"perPage": 2},
            "530": {"perPage": 2},
            "400": {"perPage": 1}
        }
    }'>
        <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev">
                <!-- <span class="material-symbols-outlined">
                    arrow_back_ios
                </span> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
            </button>
            <button class="splide__arrow splide__arrow--next">
                <!-- <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
            </button>
        </div>

        <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"></ul>


        <div class="splide__track">
            <ul class="splide__list">
                <li v-if="products" class="splide__slide" v-for="(product, index) in products" :key="product.id">
                    <ProductSlide :product="product" />
                </li>

                <li v-else class="splide__slide" v-for="index in 8" :key="index">
                    <ProductSlideAnimation />
                </li>
            </ul>
        </div>
        <!-- Add the progress bar element -->
        <div class="my-slider-progress">
            <div id="my-slider-progress-bar" class="my-slider-progress-bar"></div>
        </div>
    </section>
</template>

<style scoped>
.splide .splide__arrows .splide__arrow--next:hover svg,
.splide .splide__arrows .splide__arrow--prev:hover svg {
    animation: svgArrow 1s;
}

.splide .splide__arrows .splide__arrow--prev {
    top: 93%;
    left: 100%;
    position: absolute;
    transform: rotate(180deg);
    translate: -104px -50%;
}

.splide .splide__arrows .splide__arrow--next {
    top: 93%;
    right: 0;
    position: absolute;
}

.splide .splide__arrows .splide__arrow--prev svg,
.splide .splide__arrows .splide__arrow--next svg {
    fill: rgba(0, 0, 0, 0.6);
    width: 14px;
    height: 14px;
}

.splide .splide__arrows .splide__arrow--prev,
.splide .splide__arrows .splide__arrow--next {
    opacity: 1;
    transition: opacity .4s ease-in-out;
    border-radius: 10%;
    height: 48px;
    width: 48px;
    background-color: rgba(0, 0, 0, 0.05);
    overflow: hidden;
}
</style>