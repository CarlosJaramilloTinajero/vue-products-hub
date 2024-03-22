<script setup>
import { ref } from 'vue';

const emit = defineEmits(['gotoPage']);

const props = defineProps({
  pages: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  pagesLinkMax: {
    type: Number,
    default: 4
  },
});

const gotoPageEmit = page => emit('gotoPage', page);

const pagesLinkMax = ref(4);

</script>

<template>

  <!-- Paginacion -->
  <div class="pagination" v-if="pages > 1">
    <button v-if="page > pagesLinkMax" class="page-link" :class="{ 'link-selected': page === 1 }"
      @click="gotoPageEmit(1)">{{ 1
      }}</button>
    <button v-if="page > pagesLinkMax" class="page-link" :class="{ 'link-selected': page === 2 }"
      @click="gotoPageEmit(2)">{{ 2
      }}</button>
    <button v-if="page > pagesLinkMax" class="page-link" :class="{ 'link-selected': page === 3 }"
      @click="gotoPageEmit(3)">{{ 3
      }}</button>

    <div v-for=" index  in  pagesLinkMax " :key="index">
      <button v-if="index + (page - pagesLinkMax) > 0" class="page-link" :class="{
    'link-selected': page === (index + (page - pagesLinkMax))
  }
    " @click="gotoPageEmit((index + (page - pagesLinkMax)))">
        {{ (index + (page - pagesLinkMax)) }} </button>
    </div>

    <div v-for=" index  in  pagesLinkMax " :key="index">
      <button v-if="index + page < pages + 1" class="page-link" :class="{ 'link-selected': page === (index + page) }"
        @click="gotoPageEmit(index + page)">{{ index + page
        }}</button>
    </div>

    <button v-if="page < pages - pagesLinkMax" class="page-link" :class="{ 'link-selected': page === (pages - 2) }"
      @click="gotoPageEmit((pages - 2))">{{
    (pages - 2) }}</button>
    <button v-if="page < pages - pagesLinkMax" class="page-link" :class="{ 'link-selected': page === (pages - 1) }"
      @click="gotoPageEmit((pages - 1))">{{
    (pages - 1) }}</button>
    <button v-if="page < pages - pagesLinkMax" class="page-link" :class="{ 'link-selected': page === (pages) }"
      @click="gotoPageEmit((pages))">{{
    (pages) }}</button>
  </div>

</template>

<style scoped>
.pagination {
  justify-content: start;
  width: 100%;
  display: flex;
  gap: 0px;
  flex-wrap: wrap;
}

@media screen and (min-width:700px) {
  .pagination .page-link {
    margin: 2px;
    padding: 6px 15px;
    text-align: center;
    border-radius: 2px;
    color: black;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.78);
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    transition: background-color .3s ease-in-out, color .3s ease-in-out;
  }
}

@media screen and (max-width:768px) {
  .pagination {
    width: 90%;
    margin: 0 auto;
  }
}

@media screen and (max-width:700px) {

  .pagination .page-link {
    margin: 2px;
    padding: 6px 6px;
    text-align: center;
    border-radius: 2px;
    color: black;
    background-color: rgba(255, 255, 255, 0.78);
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    transition: background-color .3s ease-in-out, color .3s ease-in-out;
    font-size: 13px;
  }
}

.pagination .page-link.link-selected,
.pagination .page-link:hover {
  background-color: transparent;
  color: black;
  border: 1px rgba(0, 0, 0, 0.78) solid;
}
</style>