<script>
import { defineComponent } from 'vue';
import AddProductWishListSvg from '../../Product/AddProductWishListSvg.vue';

export default defineComponent({
    name: 'ProductSlide',
    data() {
        return {
        }
    },
    computed: {
        // ...mapState({
        //     isLogin: state => state.userModule.isLogin
        // })
    },
    components: { AddProductWishListSvg },
    methods: {
    },
    mounted() {

    },
    props: {
        product: {
            type: Object,
            default: {}
        }
    }
})
</script>

<template>
    <section class="productsSlide">

        <div class="paddingB"></div>

        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="images">
                <router-link :to="`/product/${product.slug}`">
                    <div class="img1" data-aos="zoom-in" data-aos-duration="600" data-aos-offset="160">
                        <img class="image" :src="product.img_path" alt="">
                    </div>
                </router-link>

                <div class="shadowCart"></div>

                <div class="product-hover-action">
                    <div class="cart-action">
                        <div class="view">
                            <router-link :to="`/product/${product.slug}`">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </router-link>
                        </div>

                        <div class="cart">
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-cart-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                    <path
                                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </a>
                        </div>

                        <div class="wishlist">
                            <AddProductWishListSvg :product="product" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="descriptions">
                <div class="title">
                    <router-link class="name" :to="`/product/${product.slug}`">
                        {{ product.name.slice(0, 19) }} <span
                            v-if="product.name && product.name.lenght >= 19">...</span>
                    </router-link>
                </div>

                <div class="productPrice">
                    <p class="price"> ${{ product.price }}</p>
                </div>

                <div class="category">
                    <router-link :to="`/category/${product.category.slug}`" class="linkCategory">
                        {{ product.category.name }}
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>