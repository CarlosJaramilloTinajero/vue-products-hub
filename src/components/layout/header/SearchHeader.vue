<script>
import { defineComponent, ref, computed, watch } from 'vue';
import router from '../../../router';
import { notify } from '../../../notify';
import { getProductsByAPI } from '../../../services/APIService';

export default defineComponent({
    name: 'SearchHeader',
    setup(props, { emit }) {
        const search = ref('');
        const productsOfSearch = ref([]);

        const showDropSearchProducts = computed(() => {
            return productsOfSearch.value.length > 0;
        });

        const submitsSarch = () => {
            if (!search.value) { notify('Busqueda invalida', 'error'); return; }
            router.push(`/products/${search.value}`);
            productsOfSearch.value = [];
            search.value = '';
        }

        const searchProducts = () => {
            if (!search.value) return;
            getProductsByAPI({
                filters: {
                    for_table: true,
                    search: search.value,
                    orderBy: 'a-z',
                    withOutFilters: true
                },
                funcSuccess: (response) => {
                    if (!search.value || search.value.length < 3) {
                        productsOfSearch.value = [];
                        return;
                    }
                    productsOfSearch.value = response.data.products.data;
                },
                page: 1,
                perPage: 10
            })
        }

        const handlechangeInput = e => {
            if (!e.target.value || e.target.value.length < 3) {
                if (productsOfSearch.value.length > 0) productsOfSearch.value = [];
                return;
            }
            searchProducts();
        };

        const clickProductSearch = () => {
            productsOfSearch.value = [];
            search.value = '';
        }

        const handleBlurInput = () => {
            let idT = setTimeout(() => {
                productsOfSearch.value = [];
                window.clearTimeout(idT);
            }, 1000);
        }

        return { search, submitsSarch, productsOfSearch, handlechangeInput, showDropSearchProducts, clickProductSearch, searchProducts, handleBlurInput };
    }
})

</script>

<template>
    <section class="search-container">
        <form @submit.prevent="submitsSarch">
            <input type="text" v-model="search" @focus="searchProducts" @blur="handleBlurInput" placeholder="Buscar..."
                @input="handlechangeInput">
            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg></button>
        </form>

        <div class="drop-search-products" :style="{ display: showDropSearchProducts ? 'block' : 'none' }">
            <router-link @click="clickProductSearch()" style="text-decoration: unset;"
                v-for="product in productsOfSearch" :key="product.id" :to="`/product/${product.slug}`">
                <div class="product-search">
                    <section class="img-container-seacrh">
                        <img :src="product.img_path" :alt="product.sku">
                    </section>
                    <div class="data-product-search">
                        <p class="name-search">{{ product.name.slice(0, 55) }}<span
                                v-if="product.name.length > 55">...</span></p>
                        <p class="sku-search"><strong>sku: </strong>{{ product.sku }}</p>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<style scoped>
.search-container {
    position: relative;
}

.search-container .drop-search-products {
    overflow-y: scroll;
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    padding: 15px;
    display: none;
    background-color: white;
    z-index: 1000;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    max-height: 480px;
}

.drop-search-products .product-search {
    position: relative;
    cursor: pointer;
    display: flex;
    overflow: hidden;
    gap: 20px;
    margin-bottom: 5px;
    border-radius: 3px;
}

.drop-search-products .product-search::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    opacity: .1;
    transition: background-color .2s ease-in-out;
}

.drop-search-products .product-search:hover::before {
    background-color: var(--color-primary-dark);
}

.drop-search-products .product-search .img-container-seacrh {
    width: 50px !important;
    height: 50px !important;
    margin: 10px 0 !important;
    margin-left: 10px !important;
}

.drop-search-products .product-search .img-container-seacrh img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    margin: 0 auto;
}

.drop-search-products .product-search .data-product-search p {
    color: rgba(0, 0, 0, 0.9) !important;
    margin-bottom: 3px !important;
    font-family: 'Nunito', sans-serif !important;
}

.drop-search-products .product-search .data-product-search .name-search {
    font-size: 14px !important;
}

.drop-search-products .product-search .data-product-search .sku-search {
    font-size: 13px !important;
}
</style>