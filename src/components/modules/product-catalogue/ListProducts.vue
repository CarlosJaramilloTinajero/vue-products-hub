<script setup>

import { randomBoolean, randomNumber } from '../../../helpers';
import AddProductWishListSvg from '../../layout/Product/AddProductWishListSvg.vue';
// import router from '../../../router';

const props = defineProps({
    products: {
        type: Object,
        default: {}
    }
});

// const handleClikShowProduct = slug => router.push('')

</script>

<template>
    <!-- Lista de productos -->
    <section class="productsVersions row on-render-products-catalogue">
        <div v-for="( item, index ) in products " :key="index" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            style="padding: 0 4px;">
            <section class="productV2Div" style="margin-left: auto; margin-right: auto;">

                <div class="paddingB"></div>

                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    <div class="images">
                        <router-link :to="`/product/${item.slug}`">
                            <picture class="img1">
                                <img class="image" :src="item.img_path" alt="">
                            </picture>
                            <picture class="img2">
                                <img class="image" :src="item.img_path" alt="">
                            </picture>
                        </router-link>

                        <div class="shadowCart"></div>

                        <div class="product-hover-action">
                            <div class="cart-action">
                                <div class="view">
                                    <router-link :to="`/product/${item.slug}`">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path
                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </router-link>
                                </div>

                                <div class="cart">
                                    <a><span>Agregar al carrito</span></a>
                                    <!-- <router-link to="#"><span>Agregar al carrito</span></router-link> -->
                                </div>

                                <div class="wishlist">
                                    <AddProductWishListSvg :product="item" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="descriptions">
                        <div class="title">
                            <p class="name mb-0 d-block">{{ item.name.substr(0, 47) }}<span
                                    v-if="item.name.length >= 40">...</span></p>
                        </div>

                        <div class="productPrice">
                            <span class="price"> ${{ item.price }}</span>
                            <span class="priceDescount"> ${{ item.price }}</span>
                        </div>
                        <div class="productReferences">
                            <p class="sku">{{ item.sku }}</p>
                        </div>
                    </div>

                    <div v-if="randomBoolean()" class="descount">
                        <span>{{ randomNumber(18) + 2 }}% Off</span>
                    </div>
                </div>
            </section>
        </div>
    </section>

    <!-- Animacion carga -->
    <section class="productsVersions row on-render-products-catalogue-loanding">
        <div v-for="  index in 20 " :key="index" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            style="padding: 0 4px;">

            <section class="productV2Div" style="margin-left: auto; margin-right: auto;">

                <div class="paddingB"></div>

                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    <div class="images">
                        <div class="loanding-animation"></div>
                    </div>

                    <div class="descriptions">
                        <div class="text-loading">
                            <div class="loanding-animation"></div>
                        </div>
                        <div class="text-loading">
                            <div class="loanding-animation"></div>
                        </div>
                        <div class="text-loading">
                            <div class="loanding-animation"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped></style>