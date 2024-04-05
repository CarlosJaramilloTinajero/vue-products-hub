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

<style scoped>
hr {
    width: 100%;
}

.product-name {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: rgba(0, 0, 0, 0.85);
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 0px;
}

.sku {
    opacity: .7;
    font-size: 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    margin-bottom: 25px;
}

.product-price {
    font-family: 'Nunito', sans-serif;
    font-size: 23px;
    font-weight: 500;
    margin-bottom: 20px;
}

.stars-reviews-container {
    margin-bottom: 25px;
}

.stars-reviews-container .fa-star {
    color: rgb(255, 208, 0);
}

.stars-reviews-container i {
    margin-right: 4px;
    font-size: 14px;
}

.stars-reviews-container i:last-child {
    margin-right: 0;
}

.stars-reviews-container span {
    margin-left: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
}

.product-avilables {
    margin: 20px 0;
}

.product-avilables .product-avilable i {
    color: rgb(0, 102, 255) !important;
    margin-right: 13px;
}

.product-avilables .product-avilable {
    margin-bottom: 0px;
    color: rgb(0, 98, 235);
}

.product-avilables .product-avilable span {
    font-size: 17px;
    font-family: 'Nunito', sans-serif !important;
}

.product-short-description {
    margin-top: 5px;
    margin-bottom: 40px;
    font-family: 'Nunito', sans-serif !important;
    font-size: 17px;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
}

@media screen and (max-width: 700px) {
    .product-name {
        font-size: 20px;

    }

    .sku {
        font-size: 13px;
        margin-bottom: 18px;
    }

    .product-price {
        font-size: 19px;
        margin-bottom: 15px;
    }

    .stars-reviews-container span {
        font-size: 13px;
    }

    .product-avilables .product-avilable span {
        font-size: 15px;
    }

    .product-short-description {
        margin-top: 5px;
        margin-bottom: 35px;
        font-size: 15px;
    }
}
</style>