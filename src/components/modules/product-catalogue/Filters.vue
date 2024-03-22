<script setup>

const emit = defineEmits(['checkedFilter']);

const props = defineProps({
    typeFilters: {
        type: String,
        default: 'pc'
    },
    categoriesTree: {
        type: Array,
        default: []
    },
    brands: {
        type: Object,
        default: {}
    },
    filtersByApi: {
        type: Object,
        default: {}
    },
    filters: {
        type: Object,
        default: {
            brands: [],
            search: '',
            categorySlug: '',
            orderBy: '',
            price: { from: 'all', to: 'all' }
        }
    }
});

const checkedFilterEmit = (event, filter, value) => {
    emit('checkedFilter', { event, filter, value });
};
</script>

<template>

    <!-- {{ --Filtros --}} -->
    <!-- Filtros animacion inicio -->
    <section v-for="index in 3" :key="index" class="filter on-render-products-catalogue-loanding-d-block">
        <div class="name-filter">
            <div class="text-loading">
                <div class="loanding-animation"></div>
            </div>
        </div>
        <div class="body-filter">
            <div v-for="index in 5" :key="index" class="form-check mb-2 p-0">
                <div class="text-loading">
                    <div class="loanding-animation"></div>
                </div>
            </div>
        </div>
    </section>
    <!-- Fin filtros animacion inicio -->

    <!-- {{ --Arbol categorias-- }} -->
    <section class="filter on-render-products-catalogue-d-block">
        <div v-if="categoriesTree && Object.entries(categoriesTree).length > 0">
            <div class="name-filter">
                <p>Categorías</p>
            </div>
            <div class="body-filter with-out-overflow-y">
                <div class="parents">
                    <div v-for="(item, index) in categoriesTree" :key="index">
                        <div v-if="index === categoriesTree.length - 1" class="parent">
                            <p>
                                <router-link :to="`/category/${item.slug}`">{{ item.name }}</router-link>
                            </p>
                            <div class="to-back current-page">
                                <div class="circle-tag"></div>
                            </div>
                        </div>
                        <div v-else class="parent">
                            <p>
                                <router-link :to="`/category/${item.slug}`">{{ item.name }}</router-link>
                            </p>
                            <div class="to-back">
                                <img src="../../../../public/assets/img/svg/leftNavArrow.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- {{ --Fin arbol categorias-- }} -->

    <!-- {{ --Marcas --}} -->
    <section class="filter on-render-products-catalogue-d-block">
        <div v-if="brands && Object.entries(brands).length > 0">
            <div class="name-filter">
                <p>Marcas</p>
            </div>
            <div class="body-filter">
                <div v-for="(item, index) in brands" :key="index" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox"
                        @change="checkedFilterEmit($event, 'brands', index)">
                    <label for="flexCheckDefault">
                        {{ index }} ({{ item }})
                    </label>
                </div>
            </div>
        </div>
    </section>
    <!-- {{ --Fin marcas-- }} -->

    <!-- {{ --Precios --}} -->
    <section class="filter on-render-products-catalogue-d-block">
        <div v-if="filtersByApi.price && Object.entries(filtersByApi.price).length > 0">
            <div class="name-filter">
                <p>Precios</p>
            </div>
            <div class="body-filter with-out-overflow-y">
                <div v-for="( item, index ) in  filtersByApi.price " :key="index" class="form-check">
                    <input :checked="item.to === filters.price.to && item.from === filters.price.from"
                        class="form-check-input" type="radio" :name="`radio-price-${index}-${typeFilters}`"
                        :id="`radio-price-${index}-${typeFilters}`"
                        @change="checkedFilterEmit($event, 'price', { from: item.from, to: item.to })">
                    <label class="form-check-label" :for="`radio-price-${index}-${typeFilters}`">
                        {{ item.title }}
                    </label>
                </div>
            </div>
        </div>
    </section>
    <!-- {{ --Fin Precios-- }} -->
    <!-- {{ --Fin filtros-- }} -->

</template>

<style scoped></style>