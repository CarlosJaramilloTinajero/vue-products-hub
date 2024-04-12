<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCategoriesByAPI } from '../../services/APIService';
import { useStore } from 'vuex';
import router from '../../router';

const store = useStore();

const moveContainerApp = computed(() => {
    return store.state.moveContainerApp;
})

const props = defineProps({
    showMenuMovil: {
        type: Boolean,
        default: false
    },
    setShowMenuMovil: {
        type: Function,
        default: () => { }
    }
});

const categories = ref([]);

const isLogin = computed(() => {
    return store.state.userModule.isLogin;
});

const logout = () => {
    store.dispatch('logoutUser');
    router.push('/');
}

onMounted(() => {
    getCategoriesByAPI({
        funcSuccess: data => {
            categories.value = data.data;
        }
    })
});

const closeMenu = () => {
    props.setShowMenuMovil(false);
    store.dispatch('moveContainerAppAction', false);
}

</script>

<template>
    <section class="left-menu-movil d-lg-none" :style="{ 'left': showMenuMovil && moveContainerApp ? '0' : '-300px' }">
        <div class="links-container" v-if="categories">
            <div class="link" @click="closeMenu" v-for="category in categories.slice(0, 10)" :key="category.id">
                <router-link :to="`/category/${category.slug}`">
                    {{ category.name }}</router-link>
            </div>
            <div class="link" @click="closeMenu">
                <router-link to="/">Ver más...</router-link>
            </div>
        </div>

        <div class="links-container">
            <!-- Auth -->
            <div class="link" v-show="isLogin" @click="closeMenu">
                <router-link to="/">Mi Cuenta</router-link>
            </div>

            <div class="link" v-show="isLogin" @click="closeMenu">
                <router-link to="/wishlist">Favoritos</router-link>
            </div>

            <div class="link" style="cursor: pointer;" v-show="isLogin" @click="closeMenu">
                <a @click="logout()">Salir</a>
            </div>
            <!-- En Auth -->

            <!-- Guest -->
            <div class="link" v-show="!isLogin" @click="closeMenu">
                <router-link to="/login">Iniciar sesion</router-link>
            </div>

            <div class="link" v-show="!isLogin" @click="closeMenu">
                <router-link to="/register">Registro</router-link>
            </div>
            <!-- End Guest -->

            <div class="link" @click="closeMenu">
                <router-link to="/">Carrito</router-link>
            </div>
        </div>
    </section>

</template>

<style scoped></style>