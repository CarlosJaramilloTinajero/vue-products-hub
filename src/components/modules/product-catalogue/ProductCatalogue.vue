<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import router from '../../../router';
import { deepClone } from '../../../helpers';
import { FILTERS_CATALOGUE_CONST } from '../../../constants';
import { setDisplayAnimation } from '../../../helpers/animationHelper';
import { getProductsByAPI } from '../../../services/APIService';
import Pagination from '../../layout/Pagination.vue';
import Filters from './Filters.vue';
import ListProducts from './ListProducts.vue';
import Catalogue404 from '../../status/Catalogue404.vue';
import CatalogueNotFound from './CatalogueNotFound.vue';
import CatalogueEmpty from './CatalogueEmpty.vue';
// import catalogueEmpty from './CatalogueEmpty.vue';

const store = useStore();

const paramsURL = computed(() => {
  return router.currentRoute.value.params;
});

const moveContainerApp = computed(() => {
  return store.state.moveContainerApp;
})

// const usedFilter = ref(false);
const showFiltersMovil = ref(false);
const notFounData = ref(false);
const status404 = ref(false);
const emptyCatalogue = ref(false);
const products = ref(null);
const pages = ref(0);
const page = ref(1);
const perPage = ref(30);
const brands = ref([]);
const categoriesTree = ref([]);
const filtersByApi = ref([]);
const totalProducts = ref(0);
const filters = ref({
  brands: [],
  search: '',
  categorySlug: '',
  orderBy: '',
  price: { from: 'all', to: 'all' },
  for_table: true
});

const initCatalogue = () => {
  products.value = []
  pages.value = 0
  page.value = 1
  perPage.value = 30
  brands.value = []
  filters.value.brands = [];
  filters.value.orderBy = '';
  filters.value.price = { from: 'all', to: 'all' };
  categoriesTree.value = []
  filtersByApi.value = []
  totalProducts.value = 0
  store.commit('setCategoriesTree', []);
  status404.value = false;
  notFounData.value = false;
  emptyCatalogue.value = false;
  usedFilter.value = false;
}

const init404 = () => {
  initCatalogue();
  setDisplayAnimation({ type: 'show' });
  status404.value = true;
}

const usedFilter = () => {
  for (let i = 0; i < Object.entries(FILTERS_CATALOGUE_CONST).length; i++) {
    const element = Object.entries(FILTERS_CATALOGUE_CONST)[i];
    let aux = null;

    if (Object.prototype.toString.call(filters.value[element[0]]) === '[object Object]' || Array.isArray(filters.value[element[0]])) {
      aux = JSON.stringify(filters.value[element[0]]);
      element[1] = JSON.stringify(element[1]);
    } else {
      aux = filters.value[element[0]];
    }

    if (aux !== element[1]) return true;
  }

  return false;
}

const initNotFoundData = () => {
  initCatalogue();
  setDisplayAnimation({ type: 'show' });
  notFounData.value = true;
}

const getProducts = () => {
  getProductsByAPI({
    filters: deepClone(filters.value),
    page: page.value,
    perPage: perPage.value,
    funcSuccess: data => {
      if (!usedFilter() && !filters.value.categorySlug && (!data.data.products.data || Object.entries(data.data.products.data).length <= 0)) {
        initNotFoundData();
        return;
      }
      emptyCatalogue.value = Object.entries(data.data.products.data).length <= 0;
      products.value = data.data.products.data;
      pages.value = data.data.products.last_page;
      brands.value = data.data.brands;
      categoriesTree.value = data.data.categoryTree;
      filtersByApi.value = data.data.filters;
      totalProducts.value = data.data.products.total;
      store.commit('setCategoriesTree', categoriesTree.value);
      setDisplayAnimation({ type: 'show' });
    },
    funcError: () => {
      init404();
    }
  });
};

const gotoPage = pageGo => {
  window.scrollTo(0, 0);
  page.value = pageGo;
  getProducts();
  setDisplayAnimation({ type: 'hidde', block: false });
};

// Metodo para cuando se actualizan los productos ya sea por busqueda rapida o filtro
const onRender = ({ animationFlex = true, animationBlock = false } = {}) => {
  emptyCatalogue.value = false;
  window.scroll(0, 0);
  setDisplayAnimation({ type: 'hidde', block: animationBlock, flex: animationFlex });
  page.value = 1;
  getProducts();
}

const checkedFilter = ({ event, filter, value }) => {
  if (filter === 'brands') {
    if (!event.target.checked) {
      filters.value[filter] = filters.value[filter].filter(elm => elm !== value);
    } else {
      filters.value[filter].push(value);
      // usedFilter.value = true;
    }
  } else {
    if (!event.target.checked) {
      value = '';
    }
    filters.value[filter] = value;
    // usedFilter.value = true;
  }

  onRender();
};

const getProductsByUrl = () => {
  if (paramsURL.value.slug) {
    filters.value.categorySlug = paramsURL.value.slug;
    return true;
  } else if (paramsURL.value.search) {
    filters.value.search = paramsURL.value.search;
    return true;
  }

  init404();
  return false;
};

const handleWatchChange = ({ slug, search }) => {
  if (!slug && !search) return;
  if (slug) filters.value.categorySlug = slug;
  if (search) filters.value.search = search;
  initCatalogue();
  onRender({ animationBlock: true, animationFlex: true });
}

const openFiltersMovil = () => {
  showFiltersMovil.value = true;
  store.dispatch('moveContainerAppAction', true);
}

// watcher para reaccionar a cambios en la ruta
watch(() => { return router.currentRoute.value.params }, (newValue, oldValue) => {
  // Realizamos cambios
  handleWatchChange(newValue);
});

watch(() => moveContainerApp.value, (newValue, oldValue) => {
  if (!newValue) showFiltersMovil.value = false;
})

onMounted(() => {
  window.scroll(0, 0);
  initCatalogue();
  if (getProductsByUrl()) getProducts();
});

</script>

<template>
  <Catalogue404 v-if="status404" />

  <!-- Filtros Movil -->
  <section class="filter-movil-toggle" :style="{ 'left': showFiltersMovil && moveContainerApp ? '0' : '-300px' }">
    <Filters type-filters="movil" :categories-tree="categoriesTree" @checked-filter="checkedFilter" :brands="brands"
      :filters-by-api="filtersByApi" :filters="filters" />
  </section>

  <CatalogueNotFound v-if="notFounData" :search="filters.search" />


  <div v-if="!status404 && !notFounData" class="contenedorSearch">
    <div class="row mt-5">

      <!-- Filters PC -->
      <div class="col col-3 d-none d-md-block" style="max-width: 300px;">
        <Filters :categories-tree="categoriesTree" @checked-filter="checkedFilter" :brands="brands"
          :filters-by-api="filtersByApi" :filters="filters" />
      </div>

      <!-- {{ --Prouctos --}} -->
      <div class="col col-12 col-md-9" style="padding: 0 0 0 0;">

        <div class="filtesr-movil d-md-none">
          <div @click="openFiltersMovil" class="filters-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill"
              viewBox="0 0 16 16">
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
            </svg> <span>Filtos</span>
          </div>
          <div class="filter-by-container w-75" style="max-width: 200px;">
            <select v-model="filters.orderBy" @change="onRender" class="form-select">
              <option value="">Ordenar por</option>
              <option value="new">Lo más nuevo</option>
              <option value="lower-price">Menor precio</option>
              <option value="higher-price">Mayor precio</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        <div v-if="products" class="row d-none d-md-flex">
          <div class="col-6">
            <div class="filter-by-container mt-2 mb-4 w-75" style="max-width: 300px;">
              <select v-model="filters.orderBy" @change="onRender" class="form-select">
                <option value="">Ordenar por</option>
                <option value="new">Lo más nuevo</option>
                <option value="lower-price">Menor precio</option>
                <option value="higher-price">Mayor precio</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex justify-content-end products-cont">
              <p>{{ totalProducts }} Productos</p>
            </div>
          </div>
        </div>
        <!-- Products list -->
        <CatalogueEmpty v-if="emptyCatalogue" />
        <ListProducts :products="products" />

        <!-- Pagination -->
        <Pagination :pages="pages" :page="page" @goto-page="gotoPage" />
      </div>
      <!-- {{ --Fin Prouctos-- }} -->
    </div>
  </div>
</template>

<style scoped></style>