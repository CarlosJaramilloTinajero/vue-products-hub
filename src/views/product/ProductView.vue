<script>
import { defineComponent, watch, onMounted, ref, computed } from 'vue';
import router from '../../router';
import { getProductBySlugAPI } from '../../services/products';
import SlideProductsByCategory from '../../components/layout/Product/SlideProducts/SlideProductsByCategory.vue';
import ProductCarrousel from '../../components/modules/product-view/ProductCarrousel.vue';
import ProductData from '../../components/modules/product-view/ProductData.vue';
import AddToCartWishlist from '../../components/modules/product-view/AddToCartWishlist.vue';
import { initSlides, unloadSlides } from '../../helpers/splideHelper';

export default defineComponent({
    name: 'ProductView',
    setup() {
        const slugProduct = ref(null);
        const productView = ref(null);

        const paramsURL = computed(() => {
            return router.currentRoute.value.params;
        });

        const onRender = () => {
            window.scroll(0, 0);
            getProductBySlug();
        }

        const initiProductView = () => {
            productView.value = null;
        };

        const getProductBySlug = () => {
            // if (!slug) return;

            getProductBySlugAPI({
                slug: slugProduct.value,
                funcSuccess: data => {
                    productView.value = data.data;
                    // console.log(data);
                }
            });
        };

        const validateUrlParams = () => {
            if (paramsURL.value.slug) {
                slugProduct.value = paramsURL.value.slug;
                return true;
            }
            // init404();
            return false;
        }

        const handleWatchChange = ({ slug }) => {
            if (!slug) return;
            initiProductView();
            slugProduct.value = slug;
            onRender();
        }

        onMounted(() => {
            unloadSlides();
            initSlides();
            if (validateUrlParams()) getProductBySlug();
        });

        watch(() => router.currentRoute.value.params, (newValue, oldValue) => {
            handleWatchChange(newValue);
        });
        return { productView };
    },
    components: { SlideProductsByCategory, ProductCarrousel, ProductData, AddToCartWishlist }
})
</script>

<template>
    <section class="product-view-container">
        <div class="row row-cols-1 row-cols-lg-2">
            <div class="col col-img-product mb-4 mb-lg-0">
                <ProductCarrousel :product-view="productView" />
            </div>
            <div class="col col-data-product">
                <ProductData :product-view="productView" />
                <AddToCartWishlist :product-view="productView" />
            </div>
        </div>
    </section>

    <section class="related-products" v-if="productView && productView.brand">
        <SlideProductsByCategory category-slug="random-products" :brands="[productView?.brand?.name]"
            title="Productos relacionados" />
    </section>
</template>

<style scoped></style>