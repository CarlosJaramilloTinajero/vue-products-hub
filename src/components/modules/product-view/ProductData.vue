<script setup>
defineProps({
    productView: {
        type: Object,
        default: {}
    }
});
</script>

<template>
    <!-- Animacion cargar -->
    <div v-if="!productView || !productView.id">
        <div v-for="index in 7" :class="`text-loading mb-4 ${index == 1 ? 'mt-5' : ''}`" :key="index">
            <div class="loanding-animation"></div>
        </div>
    </div>

    <!-- Data -->
    <div v-else>
        <p class="product-name">{{ productView.name }}</p>
        <p class="sku">{{ productView.sku }}</p>

        <p class="product-price">${{ productView.price }}</p>

        <section class="stars-reviews-container">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>

            <span>(2 opiniones de clientes)</span>
        </section>

        <hr>

        <section class="product-avilables">
            <p class="product-avilable"><i class="fas fa-check"></i><span>Con stock</span></p>
            <p class="product-avilable"><i class="fas fa-check"></i><span>Entrega gratuita disponible</span></p>
            <p class="product-avilable">
                <i class="fas fa-check"></i><span>30% de descuento usando el código:MOTIVE30</span>
            </p>
        </section>

        <p class="product-short-description">
            In ornare lorem ut est dapibus, ut tincidunt nisi pretium. Integer ante est, hendrerit in rutrum
            quis, elementum eget magna. Pellentesque sagittis dictum libero, eu dignissim tellus.
        </p>
    </div>
</template>

<style scoped></style>