<script setup>
import { ref, watchEffect, onMounted, computed } from 'vue';
import router from './router';
import Header from './components/layout/Header.vue';
import { useStore } from 'vuex';
import { animationInitApp } from './helpers/animationHelper';
import Footer from './components/layout/Footer.vue';
import { initAPP } from './services/APIService';
import { APP_DEBUG } from './constants';

const store = useStore();

const routeAct = ref(router.currentRoute.value.path);

const handleWatchChange = () => {
  window.scroll(0, 0);
  store.commit('setCategoriesTree', []);
}

const moveContainerApp = computed(() => {
  return store.state.moveContainerApp;
})

const closeMoveAppContainer = () => {
  store.dispatch('moveContainerAppAction', false);
}

watchEffect(() => {
  routeAct.value = router.currentRoute.value.path;
  handleWatchChange();
});

onMounted(() => {
  if (!APP_DEBUG) initAPP();
  animationInitApp();
  store.dispatch('setIsLoginAction');
});
</script>

<template>
  <section class="app">
    <section class="back-move-app-container" @click="closeMoveAppContainer"
      :style="{ 'left': moveContainerApp ? '0' : '-100vw', 'opacity': moveContainerApp ? '1' : '0' }">
    </section>
    <div class="conatiner-app" :style="{ 'margin-left': moveContainerApp ? '280px' : '0' }">
      <Header />
      <div class="container-view loading">
        <router-view></router-view>
      </div>
      <!-- Las clases de animaciones de loading y animacionInicio / animacionCarga estan guardadas en el archivo style.css el cual es global -->
      <div class="animacionInicio" id="animacionInicio">
        <picture id="animacion"></picture>
      </div>

      <Footer />
    </div>
  </section>
</template>

<style scoped></style>