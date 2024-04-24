<script>
import { defineComponent, watch, onMounted, ref, computed } from 'vue';
import router from '../../router';
import { getProductBySlugAPI } from '../../services/products';
import SlideProductsByCategory from '../../components/layout/Product/SlideProducts/SlideProductsByCategory.vue';
import ProductCarrousel from '../../components/modules/product-view/ProductCarrousel.vue';
import ProductData from '../../components/modules/product-view/ProductData.vue';
import AddToCartWishlist from '../../components/modules/product-view/AddToCartWishlist.vue';
import { initSlides, unloadSlides } from '../../helpers/splideHelper';
import PageNotFound from '../../components/status/PageNotFound.vue';

export default defineComponent({
    name: 'ProductView',
    setup() {
        const slugProduct = ref(null);
        const productView = ref(null);
        const status404 = ref(false);

        const paramsURL = computed(() => {
            return router.currentRoute.value.params;
        });

        const onRender = () => {
            window.scroll(0, 0);
            getProductBySlug();
        }

        const initiProductView = () => {
            productView.value = null;
            status404.value = false;
        };

        const getProductBySlug = () => {
            // if (!slug) return;

            getProductBySlugAPI({
                slug: slugProduct.value,
                funcSuccess: data => {
                    productView.value = data.data;
                },
                funcError: () => {
                    status404.value = true;
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
        return { productView, status404 };
    },
    components: { SlideProductsByCategory, ProductCarrousel, ProductData, AddToCartWishlist, PageNotFound }
})
</script>

<template>
    <PageNotFound v-show="productView === null && status404" />
    <div v-show="!status404">
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
    </div>
</template>

<style scoped></style>