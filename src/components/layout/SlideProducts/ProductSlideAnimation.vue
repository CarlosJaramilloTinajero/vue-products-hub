<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductSlideAnimation'
})
</script>

<template>
    <section class="productsSlide">

        <div class="paddingB"></div>

        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            <div class="images">
                <!-- <router-link :to="`/product/${product.slug}`"> -->
                <div class="img1">
                    <!-- <img class="image" :src="product.img_path" alt=""> -->
                    <div class="loanding-animation"></div>
                </div>
                <!-- </router-link> -->
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
</template>

<style scoped></style>