<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import SlideProductsByCategory from '../components/layout/Product/SlideProducts/SlideProductsByCategory.vue';
import { initSlides, unloadSlides } from '../helpers/splideHelper';
import { BASE_URL_IMG } from '../constants';
import bestBrands from '../utils/json/home/best-brands.json';
import payments from '../utils/json/home/payments.json'
import { getAllBannersAPI } from '../services/banners';

const banenrs = ref({});

const getBanners = () => {
    getAllBannersAPI({
        funcSuccess: (respose) => {
            const data = respose.data || respose;

            // Separamos los banners
            banenrs.value['pc'] = data.filter(value => value.device == 'pc');
            banenrs.value['movil'] = data.filter(value => value.device == 'movil');
            banenrs.value.pc = Object.groupBy(banenrs.value.pc, ({ section }) => section);
            banenrs.value.movil = Object.groupBy(banenrs.value.movil, ({ section }) => section);

            console.log(banenrs.value);

            let idT = setTimeout(() => {
                uploadSlides();
                window.clearTimeout(idT);
            }, 500);
        },
        funcError: () => {

        }
    });
};

const uploadSlides = () => {
    unloadSlides();
    initSlides();
    window.scroll(0, 0);

    setTimeout(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 160
        });
    }, 2000);
};

onBeforeMount(() => {
    getBanners();
});

onMounted(() => {
});

</script>

<template>
    <div style="max-width: 1700px; margin-left: auto; margin-right: auto;">

        <!-- Slide principal computadora -->
        <section class=" splide SlideSplide d-none d-md-block"
            v-if="banenrs.pc && banenrs.pc['PC TOP Slide'] && banenrs.pc['PC TOP Slide'].length > 0"
            data-splide='{"type":"loop","perPage":1,"padding": "12rem"}' aria-label="Splide Basic HTML Example">
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev" style="opacity: 0;">
                    Prev
                </button>
                <button class="splide__arrow splide__arrow--next" style="opacity: 0;">
                    Next
                </button>
            </div>
            <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"></ul>
            <div class="splide__track">
                <ul class="splide__list">

                    <li v-for="(item, index) in banenrs.pc['PC TOP Slide']" :key="item.id" class="splide__slide"
                        style="padding-left: 2%; padding-right: 2%;">
                        <img class="imageSlide" :src="item.image.path" alt="Banner PC">
                    </li>
                </ul>
            </div>
        </section>

        <!-- Slide principal movil -->
        <section class=" splide SlideSplide d-md-none" aria-label="Splide Basic HTML Example"
            v-if="banenrs.movil && banenrs.movil['Movil TOP Slide'] && banenrs.movil['Movil TOP Slide'].length > 0">
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev" style="opacity: 0;">
                    Prev
                </button>
                <button class="splide__arrow splide__arrow--next" style="opacity: 0;">
                    Next
                </button>
            </div>
            <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"></ul>
            <div class="splide__track">
                <ul class="splide__list">

                    <li class="splide__slide" v-for="(item, index) in banenrs.movil['Movil TOP Slide']"
                        v-bind:key="item.id">
                        <img class="imageSlide" :src="item.image.path" alt="">
                    </li>
                </ul>
            </div>
        </section>

        <!-- Banners inicio computadora -->
        <div class=" bannersInicio d-none d-lg-block" v-if="banenrs.pc">
            <div class="row">
                <div class="col-12 mb-4" data-aos="fade-down" v-if="banenrs.pc['Banner TOP Down']">
                    <figure class="banner">
                        <img class="imagenBanner" :src="banenrs.pc['Banner TOP Down'][0].image.path"
                            alt="Banner principal">
                    </figure>
                </div>
                <div class="col-6" data-aos="fade-right" v-if="banenrs.pc['Banner Top Down Left']">
                    <figure class="banner">
                        <img class="imagenBanner" :src="banenrs.pc['Banner Top Down Left'][0].image.path"
                            alt="Banner secundario izquierdo">
                    </figure>
                </div>
                <div class="col-6" data-aos="fade-left" v-if="banenrs.pc['Banner Top Down Right']">
                    <figure class="banner">
                        <img class="imagenBanner" :src="banenrs.pc['Banner Top Down Right'][0].image.path"
                            alt="Banner secundario derecho">
                    </figure>
                </div>
            </div>
        </div>

        <!-- Banners inicio movil -->
        <div class=" d-lg-none"
            v-if="banenrs.movil && banenrs.movil['Banner TOP Down Movil'] && banenrs.movil['Banner TOP Down Movil'].length > 0">
            <section class="splide bannersInicio" aria-label="Splide Basic HTML Example">
                <div class="splide__arrows">
                    <button class="splide__arrow splide__arrow--prev" style="opacity: 0;">
                        Prev
                    </button>
                    <button class="splide__arrow splide__arrow--next" style="opacity: 0;">
                        Next
                    </button>
                </div>

                <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"> </ul>

                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide" v-for="(item, index) in banenrs.movil['Banner TOP Down Movil']"
                            :key="item.id">
                            <img class="imageSlide" :src="item.image.path" alt="">
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide productos destacados -->
        <div class=" slideDiv">
            <SlideProductsByCategory category-slug="random-products" title="Productos destacados" />
        </div>

        <!-- Slide formas pago -->
        <div class=" slideDiv slideOPC">
            <h4 class="tituloSlide">Formas de pago</h4>
            <hr class="hrInicio">
            <section class=" splide splideTiposMarcas"
                data-splide='{"type":"loop","autoplay": true,"perPage": 9,"breakpoints": {"1200": {"perPage": 8},"1100": {"perPage": 7},"1000": {"perPage": 6},"850": {"perPage": 5},"650": {"perPage": 4},"500": {"perPage": 3},"380": {"perPage": 2}}}'>
                <div class="splide__arrows">
                    <button class="splide__arrow splide__arrow--prev" style="opacity: 0;">
                        Prev
                    </button>
                    <button class="splide__arrow splide__arrow--next" style="opacity: 0;">
                        Next
                    </button>
                </div>

                <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"></ul>

                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide slideBorderBotton" v-for="(item, index) in payments" :key="index">
                            <img class="imageTiposMarcas" :src="BASE_URL_IMG + item.img" :alt="item.payment">
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide mejores ofertas -->
        <div class=" slideDiv">
            <SlideProductsByCategory category-slug="random-products" title="Las mejores ofertas" />
        </div>

        <!-- Slide computo -->
        <div class=" slideDiv">
            <SlideProductsByCategory category-slug="computo" title="Computo" />
        </div>

        <!-- Slide marcas -->
        <div class=" slideDiv slideOPC">
            <h4 class="tituloSlide">Las mejores marcas</h4>
            <hr class="hrInicio">
            <section class=" splide splideTiposMarcas"
                data-splide='{"type":"loop","autoplay": true,"perPage": 9,"breakpoints": {"1200": {"perPage": 8},"1100": {"perPage": 7},"1000": {"perPage": 6},"850": {"perPage": 5},"650": {"perPage": 4},"500": {"perPage": 3},"380": {"perPage": 2}}}'>
                <div class="splide__arrows">
                    <button class="splide__arrow splide__arrow--prev" style="opacity: 0;">
                        Prev
                    </button>
                    <button class="splide__arrow splide__arrow--next" style="opacity: 0;">
                        Next
                    </button>
                </div>

                <ul class="splide__pagination splide__pagination--ltr" style="opacity: 0;"></ul>

                <div class="splide__track">
                    <ul class="splide__list">
                        <li class="splide__slide slideBorderBotton" v-for="(item, index) in bestBrands" :key="index">
                            <!-- <router-link :to="`/brand/${item.link}`"> -->
                            <img class="imageMarcas" :src="`${BASE_URL_IMG + item.img}`" :alt="item.brand">
                            <!-- </router-link> -->
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide Electrónica de Consumo -->
        <div class=" slideDiv">
            <SlideProductsByCategory category-slug="libreria-y-papeleria" title="Librería y Papelería" />
        </div>

        <!-- Slide Seguridad -->
        <div class=" slideDiv">
            <SlideProductsByCategory category-slug="almacenamiento" title="Almacenamiento" />
        </div>

        <!-- Sobre nosotros computadora -->
        <div class=" nosotrosDiv slideDiv d-none d-md-block">
            <section class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
                <div class="col">
                    <div class="sectionNosotro">
                        <div class="datosNosotros">
                            <picture><img :src="`${BASE_URL_IMG}/assets/img/icons/cart-icon.png`" alt="">
                            </picture>
                            <div class="texto">
                                <p> <strong>Compra</strong><br>
                                    100% segura</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="sectionNosotro">
                        <div class="datosNosotros">
                            <picture><img :src="`${BASE_URL_IMG}/assets/img/icons/send-icon.png`" alt="">
                            </picture>
                            <div class="texto">
                                <p><strong>Envios</strong><br>
                                    A todo México</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="sectionNosotro">
                        <div class="datosNosotros">
                            <picture><img :src="`${BASE_URL_IMG}/assets/img/icons/brands-icon.png`" alt="">
                            </picture>
                            <div class="texto">
                                <p><strong>Marcas</strong><br>
                                    Las mejores</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="sectionNosotro">
                        <div class="datosNosotros">
                            <picture><img :src="`${BASE_URL_IMG}/assets/img/icons/promo-icon.png`" alt="">
                            </picture>
                            <div class="texto">
                                <p> <strong>Promociones</strong><br>
                                    Exclusivas</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="sectionNosotro">
                        <div class="datosNosotros">
                            <picture><img :src="`${BASE_URL_IMG}/assets/img/icons/payments-icon.png`" alt="">
                            </picture>
                            <div class="texto">
                                <p><strong>Forma de pago</strong><br>
                                    Elije la mejor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Banner abajo computadora -->
        <section class=" bannersInicio d-none d-lg-block"
            v-if="banenrs.pc && banenrs.pc['Banner Down'] && banenrs.pc['Banner Down'].length > 0">
            <div class="bannerSection mb-4">

                <div class="banner bannerDown-G" data-aos="fade-right" v-if="banenrs.pc['Banner Down'][0]">
                    <img class="imagenBanner bannerHover" :src="banenrs.pc['Banner Down'][0].image.path" alt="">
                </div>
                <div class="banner bannerDown-C" data-aos="fade-left" v-if="banenrs.pc['Banner Down'][1]">
                    <img class="imagenBanner bannerHover" :src="banenrs.pc['Banner Down'][1].image.path" alt="">
                </div>
            </div>
            <div class="bannerSection">
                <div class="banner bannerDown-C" data-aos="fade-right" v-if="banenrs.pc['Banner Down'][1]">
                    <img class="imagenBanner bannerHover" :src="banenrs.pc['Banner Down'][1].image.path" alt="">
                </div>
                <div class="banner bannerDown-G" data-aos="fade-left" v-if="banenrs.pc['Banner Down'][0]">
                    <img class="imagenBanner bannerHover" :src="banenrs.pc['Banner Down'][0].image.path" alt="">
                </div>
            </div>
        </section>

        <!-- Suscripcion computadora-->
        <section class=" suscriptionDiv mb-5 d-none d-lg-block"
            v-if="banenrs.pc && banenrs.pc['Banner suscription down'][0]">
            <picture>
                <img :src="banenrs.pc['Banner suscription down'][0].image.path" alt="">
            </picture>
            <div class="divForm">
                <form @submit.prevent="() => { }">
                    <p class="tituloFom mb-5"><strong>¡Recibe promociones exclusivas y descuentos!</strong></p>
                    <div class="mb-3 d-flex">
                        <input type="email" name="email" placeholder="Correo electronico">
                        <button type="submit" class="btn btn-primary btnSuscription"><span>Suscribirme</span></button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<style scoped></style>