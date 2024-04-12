<script>
import { defineComponent } from 'vue';
import { randomBoolean, randomNumber } from '../../../helpers';

export default defineComponent({
    name: 'WishListProduct',
    setup(props, { emit }) {

        const removeProduct = () => {
            emit('removeProduct');
        };

        return { removeProduct, randomBoolean, randomNumber };
    },
    emits: ['removeProduct'],
    props: {
        product: {
            type: Object,
            required: true
        },
        lesswords: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<template>
    <div class="product">
        <section class="img-container">
            <img :src="product.img_path" alt="image product">
        </section>
        <section class="info-product-container">
            <p class="name">{{ !lesswords ? product.name : product.name.slice(0, 40) }}<span
                    v-show="lesswords && product.name.length >= 40">...</span></p>
            <p class="sku">{{ product.sku }}</p>
            <p class="price"><strong>$ {{ product.price }}</strong><span class="discount" v-if="randomBoolean()">{{
                randomNumber(20) }}%
                    OFF</span></p>
            <div class="options-down">
                <button class="option" v-on:click="removeProduct()">Eliminar</button>
            </div>

            <!-- <div class="option-top">
                        
                    </div> -->
        </section>
    </div>
</template>

<style scoped></style>