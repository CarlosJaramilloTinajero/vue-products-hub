<script>
import { defineComponent } from 'vue';
import { getUserWishlistAPI, removeProductWishlistAPI } from '../../services/user/wishlist';
import WishListProduct from '../../components/modules/wishlist/WishListProduct.vue';
import WishListEmpty from '../../components/modules/wishlist/WishListEmpty.vue';
import WishlistAnimation from '../../components/modules/wishlist/WishlistAnimation.vue';

export default defineComponent({
    name: 'WishListView',
    data() {
        return {
            wishlist: null,
            widhtWindow: document.documentElement.clientWidth
        }
    },
    methods: {
        getUserWishList() {
            getUserWishlistAPI({
                funcSuccess: (data) => {
                    this.wishlist = data.data;
                }
            });
        },
        removeProduct(id) {
            removeProductWishlistAPI({
                id,
                funcSuccess: () => {
                    this.getUserWishList();
                },
                showNotify: true
            })
        },
        changeWords(e) {
            this.widhtWindow = document.documentElement.clientWidth;
        },

        addResizeWords() {
            window.addEventListener('resize', this.changeWords);
        },

        removeResizeWords() {
            window.removeEventListener('resize', this.changeWords)
        }
    },
    beforeMount() {
        this.getUserWishList();
        this.addResizeWords();
    },
    unmounted() {
        this.removeResizeWords();
    },
    computed: {
        lesswords() {
            return this.widhtWindow < 550;
        }
    },
    components: { WishListProduct, WishListEmpty, WishlistAnimation }
});

</script>

<template>
    <section class="page-container">
        <p class="title">Favoritos</p>
        <div class="wishlist-container">
            <WishListProduct v-show="wishlist && wishlist.length > 0" v-for="(item, index) in wishlist" :key="item.id"
                :product="item.product" :lesswords="lesswords" @remove-product="removeProduct(item.id)" />
            <WishListEmpty v-show="wishlist && wishlist.length <= 0" />
            <WishlistAnimation v-show="!wishlist" v-for="index in 4" :key="index" />
        </div>
    </section>
</template>

<style scoped></style>