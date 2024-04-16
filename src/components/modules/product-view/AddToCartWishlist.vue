<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { addToWishlistAPI, getUserWishlistAPI } from '../../../services/user/wishlist';
import router from '../../../router';

const props = defineProps({
    productView: {
        type: Object,
        default: {}
    }
});

const store = useStore();
const isLogin = computed(() => {
    return store.state.userModule.isLogin;
});
const isSelected = ref(false);
const cant = ref(1);


const handleClickSumLessCant = type => {
    switch (type) {
        case 'less':
            if (cant.value > 1) cant.value--;
            break;

        case 'more':
            cant.value++;
            break;
    }
}

const handleChangeCant = e => {
    if (!e.target.value) {
        let idT = setTimeout(() => {
            if (!cant.value) cant.value = 1;
            window.clearTimeout(idT);
        }, 500);
        return;
    }
    cant.value = e.target.value.replace(/\D/g, '')
};

const addToWishlist = () => {
    if (isSelected.value) return;
    if (!isLogin.value) { router.push('/login'); return; }
    addToWishlistAPI({
        data: { product_id: props.productView.id }, funcSuccess: () => {
            isSelected.value = true;
        },
        funcError: (data) => {
            if (data && data.mgs && data.mgs === 'Este producto ya esta agregado') isSelected.value = true;
        }
    })
}

const getIsSelected = () => {
    if (!isLogin.value) return;
    getUserWishlistAPI({
        funcSuccess: (data) => {
            if (data.data.some(value => value.product_id == props.productView.id)) { isSelected.value = true; } else { isSelected.value = false; }
        }
    });
};

onBeforeMount(() => {
    getIsSelected();
});

watch(() => props.productView, (newValue, oldValue) => {
    getIsSelected();
});

</script>

<template>
    <section class="cart-wishlist" v-if="productView && productView.id">
        <div class="count-container">
            <span class="chn-qty less" @click="handleClickSumLessCant('less')">-</span>
            <input type="text" v-model="cant" @input="handleChangeCant" class="cant">
            <span class="chn-qty more" @click="handleClickSumLessCant('more')">+</span>
        </div>
        <button class="add-to-cart">
            <p>Agregar al Carrito</p>
        </button>
        <button @click="addToWishlist()" class="add-to-wishlist">
            <i v-show="!isSelected" class="far fa-heart" />
            <i v-show="isSelected" style="color: red !important;" class="fa-solid fa-heart" />
        </button>
    </section>
</template>

<style scoped></style>