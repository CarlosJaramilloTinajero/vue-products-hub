<script setup>
import { onMounted } from 'vue';
import SlideProductsByCategory from '../components//modules/home/SlideProductsByCategory.vue';
import { initSlides, unloadSlides } from '../helpers/splideHelper';
import { BASE_URL_IMG } from '../constants';

onMounted(() => {
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
});

</script>

<template>
    <div style="max-width: 1700px; margin-left: auto; margin-right: auto;">

        <!-- Slide principal computadora -->
        <section class=" splide SlideSplide d-none d-md-block"
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
                    <li class="splide__slide" style="padding-left: 2%; padding-right: 2%;">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-1.webp`"
                            alt="Banner PC">
                    </li>
                    <li class="splide__slide" style="padding-left: 2%; padding-right: 2%;">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-2.webp`"
                            alt="Banner PC">
                    </li>
                    <li class="splide__slide" style="padding-left: 2%; padding-right: 2%;">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-3.webp`"
                            alt="Banner PC">
                    </li>
                    <li class="splide__slide" style="padding-left: 2%; padding-right: 2%;">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-4.webp`"
                            alt="Banner PC">
                    </li>
                </ul>
            </div>
        </section>

        <!-- Slide principal movil -->
        <section class=" splide SlideSplide d-md-none" aria-label="Splide Basic HTML Example">
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
                    <li class="splide__slide">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-3.webp`" alt="">
                    </li>

                    <li class="splide__slide">
                        <img class="imageSlide" :src="`${BASE_URL_IMG}/assets/img/banners/banner-pc-2.webp`" alt="">
                    </li>
                </ul>
            </div>
        </section>

        <!-- Banners inicio computadora -->
        <div class=" bannersInicio d-none d-lg-block">
            <div class="row">
                <div class="col-12 mb-4" data-aos="fade-down">
                    <figure class="banner">
                        <img class="imagenBanner" :src="`${BASE_URL_IMG}/assets/img/banners/banner-top-dow-pc.webp`"
                            alt="Banner principal">
                    </figure>
                </div>
                <div class="col-6" data-aos="fade-right">
                    <figure class="banner">
                        <img class="imagenBanner"
                            :src="`${BASE_URL_IMG}/assets/img/banners/banner-top-down-left-pc.webp`"
                            alt="Banner secundario izquierdo">
                    </figure>
                </div>
                <div class="col-6" data-aos="fade-left">
                    <figure class="banner">
                        <img class="imagenBanner"
                            :src="`${BASE_URL_IMG}/assets/img/banners/banner-top-down-right-pc.webp`"
                            alt="Banner secundario derecho">
                    </figure>
                </div>
            </div>
        </div>

        <!-- Banners inicio movil -->
        <div class=" d-lg-none">
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
                        <li class="splide__slide">
                            <img class="imageSlide"
                                :src="`${BASE_URL_IMG}/assets/img/banners/banner-top-down-movil-1.webp`" alt="">
                        </li>
                        <li class="splide__slide">
                            <img class="imageSlide"
                                :src="`${BASE_URL_IMG}/assets/img/banners/banner-top-down-movil-2.webp`" alt="">
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide productos destacados -->
        <div class=" slideDiv">
            <h4 class="tituloSlide">Productos destacados</h4>
            <hr class="hrInicio">
            <SlideProductsByCategory category-slug="computo" />
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
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageTiposMarcas" :src="`${BASE_URL_IMG}/assets/img/payments/visa-b.webp`"
                                alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageTiposMarcas" :src="`${BASE_URL_IMG}/assets/img/payments/kiosko-b.webp`"
                                alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageTiposMarcas" :src="`${BASE_URL_IMG}/assets/img/payments/bancopel-b.webp`"
                                alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageTiposMarcas" :src="`${BASE_URL_IMG}/assets/img/payments/mastercard-b.webp`"
                                alt="">
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide mejores ofertas -->
        <div class=" slideDiv">
            <h4 class="tituloSlide">Las mejores ofertas</h4>
            <hr class="hrInicio">
            <SlideProductsByCategory category-slug="camara-video-y-proyeccion" />
        </div>

        <!-- Slide computo -->
        <!-- {{ -- < div class=" slideDiv" >
            <h4 class="tituloSlide" > Computo < /h4>
                < hr class="hrInicio" >
                    @livewire('products-category-version', ['category_id' => 1])
                    < /div> --}} -->

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
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageMarcas" :src="`${BASE_URL_IMG}/assets/img/brands/amd-b.webp`" alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageMarcas" :src="`${BASE_URL_IMG}/assets/img/brands/baco-b.webp`" alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageMarcas" :src="`${BASE_URL_IMG}/assets/img/brands/corsair-b.webp`" alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageMarcas" :src="`${BASE_URL_IMG}/assets/img/brands/intel-b.webp`" alt="">
                        </li>
                        <li class="splide__slide slideBorderBotton">
                            <img class="imageMarcas" :src="`${BASE_URL_IMG}/assets/img/brands/zebra-b.webp`" alt="">
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <!-- Slide Electrónica de Consumo -->
        <div class=" slideDiv">
            <h4 class="tituloSlide">Librería y Papelería</h4>
            <hr class="hrInicio">
            <SlideProductsByCategory category-slug="libreria-y-papeleria" />
        </div>

        <!-- Slide Seguridad -->
        <div class=" slideDiv">
            <h4 class="tituloSlide">Almacenamiento</h4>
            <hr class="hrInicio">
            <SlideProductsByCategory category-slug="almacenamiento" />
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
        <section class=" bannersInicio d-none d-lg-block">
            <div class="bannerSection mb-4">
                <div class="banner bannerDown-G" data-aos="fade-right">
                    <img class="imagenBanner bannerHover"
                        :src="`${BASE_URL_IMG}/assets/img/banners/banner-down-1-pc.webp`" alt="">
                </div>
                <div class="banner bannerDown-C" data-aos="fade-left">
                    <img class="imagenBanner bannerHover"
                        :src="`${BASE_URL_IMG}/assets/img/banners/banner-down-2-pc.webp`" alt="">
                </div>
            </div>
            <div class="bannerSection">
                <div class="banner bannerDown-C" data-aos="fade-right">
                    <img class="imagenBanner bannerHover"
                        :src="`${BASE_URL_IMG}/assets/img/banners/banner-down-2-pc.webp`" alt="">
                </div>
                <div class="banner bannerDown-G" data-aos="fade-left">
                    <img class="imagenBanner bannerHover"
                        :src="`${BASE_URL_IMG}/assets/img/banners/banner-down-1-pc.webp`" alt="">
                </div>
            </div>
        </section>

        <!-- Suscripcion computadora-->
        <section class=" suscriptionDiv mb-5 d-none d-lg-block">
            <picture>
                <img :src="`${BASE_URL_IMG}/assets/img/banners/banner-suscripcion-pc.jpg`" alt="">
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