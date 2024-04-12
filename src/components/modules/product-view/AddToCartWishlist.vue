<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import ProductWishList from '../../layout/Product/ProductWishList.vue';
import { addToWishlistAPI, getUserWishlistAPI } from '../../../services/user/wishlist';
import router from '../../../router';

const cant = ref(1);

const props = defineProps({
    productView: {
        type: Object,
        default: {}
    }
});

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

const store = useStore();

const isLogin = computed(() => {
    return store.state.userModule.isLogin;
});

const isSelected = ref(false);

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

<style scoped>
.cart-wishlist {
    display: flex;
    width: 95%;
    margin: 15px auto;
}

.cart-wishlist .count-container {
    display: flex;
    width: max-content;
    height: max-content;
    margin: auto 0;
    margin-right: 35px;
}

.cart-wishlist .count-container .chn-qty.less {
    margin-right: 10px;
}

.cart-wishlist .count-container .chn-qty.more {
    margin-left: 10px;
}

.cart-wishlist .count-container .chn-qty {
    margin-top: 3px;
    width: 32px !important;
    display: block;
    float: left;
    padding: 5px;
    line-height: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    height: 32px !important;
    font-family: 'Nunito', sans-serif !important;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    position: relative;
    border: 2px transparent solid;
    cursor: pointer;
    transition: border .3s ease-in-out;
}

.cart-wishlist .count-container .chn-qty:hover {
    border: 2px rgba(0, 34, 255, 0.983) solid;
}

.cart-wishlist .count-container .cant {
    background-color: transparent !important;
    border: unset !important;
    width: 40px;
    height: 40px;
    text-align: center;
    font-family: 'Nunito', sans-serif !important;
    font-weight: 600;
    font-size: 20px;
}

.cart-wishlist .add-to-cart {
    margin-right: 30px;
    border: unset !important;
    background-color: #3577f0;
    width: 50% !important;
    padding: 17px 40px;
    border-radius: 4px;
    font-size: 16px;
    color: white;
    /* text-shadow: 0 0 10px rgba(255, 255, 255, .3); */
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: scale .2s ease-in-out;
}

.cart-wishlist .add-to-cart p {
    margin-bottom: 0;
    transition: scale .2s ease-in-out;
}

.cart-wishlist .add-to-cart:hover p {
    scale: .94;
}

.cart-wishlist .add-to-cart:hover {
    scale: 1.06;
}

.cart-wishlist .add-to-wishlist {
    position: relative;
    background-color: transparent;
    border: 2px rgba(0, 0, 0, 0.2) solid !important;
    padding: 0 15px;
    border-radius: 5px;
    width: max-content;
    height: 53px;
    margin: auto 0;
    z-index: 1;
}

.cart-wishlist .add-to-wishlist::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #3577f0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    opacity: 0;
    transition: opacity .3s ease-in-out, width .3s ease-in-out, height .3s ease-in-out;
    border-radius: 5px;
}

.cart-wishlist .add-to-wishlist:hover::before {
    opacity: 1;
    width: 124%;
    height: 124%;
}

.cart-wishlist .add-to-wishlist i,
.cart-wishlist .add-to-wishlist a svg {
    position: relative;
    z-index: 3;
    color: rgba(0, 0, 0, 0.6);
    fill: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    width: 20px;
    height: 20px;
    transition: color .3s ease-in-out;
}

.cart-wishlist .add-to-wishlist:hover i,
.cart-wishlist .add-to-wishlist:hover a svg {
    color: white;
    fill: white;
}

@media screen and (max-width: 440px) {
    .cart-wishlist .add-to-cart {
        padding: 15px 24px !important;
        font-size: 12px !important;
    }
}

@media screen and (max-width: 700px) {
    .cart-wishlist {
        width: 100%;
    }

    .cart-wishlist .count-container {
        margin-right: 10px;
    }

    .cart-wishlist .count-container .chn-qty.less {
        margin-right: 4px;
    }

    .cart-wishlist .count-container .chn-qty.more {
        margin-left: 4px;
    }

    .cart-wishlist .count-container .chn-qty {
        width: 27px !important;
        height: 27px !important;
        padding: 3px;
        font-size: 17px;
    }

    .cart-wishlist .count-container .cant {
        width: 35px;
        height: 35px;
        font-size: 16px;
    }

    .cart-wishlist .add-to-cart {
        margin-right: 10px;
        width: 50% !important;
        padding: 15px 33px;
        font-size: 14px;
    }

    .cart-wishlist .add-to-wishlist {
        padding: 0 12px;
        border-radius: 5px;
        height: 49px;
        z-index: 1;
    }

    .cart-wishlist .add-to-wishlist i,
    .cart-wishlist .add-to-wishlist a svg {
        font-size: 18px;
        width: 18px;
        height: 18px;
    }


}
</style>