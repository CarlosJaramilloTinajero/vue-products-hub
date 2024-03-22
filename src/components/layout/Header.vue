<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getDepartamentsByAPI } from '../../services/APIService';
import { useStore } from 'vuex';
import { notify } from '../../notify';
import MenuLeftMovil from './MenuLeftMovil.vue'
import router from '../../router';

const store = useStore();

const moveContainerApp = computed(() => {
    return store.state.moveContainerApp;
});

const categoriesTree = computed(() => {
    return store.state.categoriesTree;
});

const isLogin = computed(() => {
    return store.state.userModule.isLogin;
});

const dataUser = computed(() => {
    return store.state.userModule.dataUser;
});

const search = ref('');
const departaments = ref([]);
const showMenuMovil = ref(false);

const hoverDropMenu = () => {
    let dropBackgorund = document.getElementById('drop-backgorund');
    if (dropBackgorund != null) {
        dropBackgorund.style.opacity = "1";
        dropBackgorund.style.display = "block";
    }
}

const noHoverDropMenu = () => {
    let dropBackgorund = document.getElementById('drop-backgorund');
    if (dropBackgorund != null) {
        dropBackgorund.style.opacity = "0";
        dropBackgorund.style.display = "none";
    }
}

const submitsSarch = () => {
    if (!search.value) { notify('Busqueda invalida', 'error'); return; }
    router.push(`/products/${search.value}`)
}

const showMenuLeft = () => {
    store.dispatch('moveContainerAppAction', !showMenuMovil.value);
    showMenuMovil.value = !showMenuMovil.value;
}

const setShowMenuMovil = bool => {
    showMenuMovil.value = bool;
    store.dispatch('moveContainerAppAction', bool);
}

watch(() => moveContainerApp.value, (newValue, oldValue) => {
    if (!newValue) setShowMenuMovil(false);
})

onMounted(() => {
    getDepartamentsByAPI({
        funcSuccess: data => {
            departaments.value = data.data;
        }
    });
});

</script>

<template>
    <header>
        <MenuLeftMovil :show-menu-movil="showMenuMovil" :set-show-menu-movil="setShowMenuMovil" />
        <nav class="navbarV1 loading">

            <!-- Movil -->
            <section class="navbar-movil d-lg-none"
                :style="{ 'left': showMenuMovil || moveContainerApp ? '280px' : '0' }">
                <div class="left-menu-togger">
                    <svg @click="showMenuLeft" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>

                <div class="logo-image">
                    <!-- <img src="" alt=""> -->
                    <router-link to="/">
                        <p>PRODUCTS HUB</p>
                    </router-link>
                </div>

                <div class="options-end">
                    <div class="option">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <div class="toggle-option search">
                            <div class="div-search movil" style="width: 95%;">
                                <form @submit.prevent="submitsSarch">
                                    <input type="text" v-model="search" placeholder="Buscar...">
                                    <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path
                                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-cart" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </div>
                </div>
            </section>

            <!-- Computadora -->
            <section class="navbar-PC d-none d-lg-block">
                <div class="section1">
                    <div class="logo">
                        <!-- <a href="/"> -->
                        <router-link to="/">
                            <!-- <img src="images/logo.png" alt=""> -->
                            <p>PRODUCTS HUB</p>
                        </router-link>
                        <!-- </a> -->
                    </div>
                    <div class="div-search">
                        <form @submit.prevent="submitsSarch">
                            <input type="text" v-model="search" placeholder="Buscar...">
                            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                        </form>
                    </div>
                    <div class="payments">
                        <ul>
                            <!-- {{-- <li>
                                <img src="{{ asset('images/tipoPago/paypal.png') }}" alt="">
                            </li>
                            <li>
                                <img src="{{ asset('images/tipoPago/visa.png') }}" alt="">
                            </li>
                            <li>
                                <img src="{{ asset('images/tipoPago/master.png') }}" alt="">
                            </li> --}} -->
                            <li>
                                <img src="../../../public/assets/img/payments/american.webp" alt="">
                            </li>
                            <li>
                                <img src="../../../public/assets/img/payments/spei.webp" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="section2">

                    <!-- {{-- Arbol2 --}} -->
                    <div class="drop-content nav-arbol" @mouseover="hoverDropMenu" @mouseout="noHoverDropMenu">
                        <button class="drop-menu-button"><span>Categorias
                            </span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg></button>
                        <!-- {{-- No usar divs dentro de drop-body usa section, porque el div tiene estilos para el hipervinculo que se usa con el metodo 'location.href' de javascript --}} -->
                        <div class="drop-body">
                            <section class="toogle-body"></section>
                            <div class="button-div" v-for="(departament, index) in departaments" :key="departament.id">
                                <span>{{ departament.name }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                                <section class="menu-rigth">
                                    <router-link :to="`/category/${departament.slug}`" class="title-rigth">
                                        {{ departament.name }}
                                    </router-link>
                                    <hr>

                                    <section class="row">
                                        <section class="col col-4"
                                            v-for="(category, indexS) in departament.categories.slice(0, 5)"
                                            :key="category.id">
                                            <section class="title-child">
                                                <router-link :to="`/category/${category.slug}`">
                                                    {{ category.name }}
                                                </router-link>
                                            </section>
                                            <section class="childs-menu-rigth"
                                                v-for="(subcategory, index3) in category.subcategories.slice(0, 5)"
                                                :key="subcategory.id">
                                                <router-link :to="`/category/${subcategory.slug}`">
                                                    {{ subcategory.name.slice(0, 28) }}<span
                                                        v-if="subcategory.name.length >= 28">...</span>
                                                </router-link>
                                            </section>
                                            <section class="childs-menu-rigth">
                                                <router-link :to="`/category/${category.slug}`">Ver
                                                    mas...</router-link>
                                            </section>
                                        </section>

                                        <section class="col col-12">
                                            <router-link class="more-parent" :to="`/category/${departament.slug}`">Ver
                                                mas
                                                categorias...</router-link>
                                        </section>
                                    </section>
                                </section>
                            </div>
                            <!-- <div onclick="location.href=''">Ver mas...</div> -->
                        </div>
                    </div>

                    <!-- Ruta -->
                    <div class="category_jerarqui" v-if="categoriesTree && categoriesTree.length > 0">
                        <div class="category_je" v-for="(categoryType, index) in categoriesTree" :key="index">
                            <router-link :to="`/category/${categoryType.slug}`">{{ categoryType.name }}</router-link>
                            <div class="childs-by-name"
                                v-if="categoryType.children && categoryType.children.length > 0">
                                <section class="toogle-body"></section>
                                <router-link v-for="(children, index2) in categoryType.children.slice(0, 5)"
                                    :key="index2" :to="`/category/${children.slug}`">
                                    <div>
                                        {{ children.name }}
                                    </div>
                                </router-link>
                                <router-link :to="`/category/${categoryType.slug}`">
                                    <div>Ver mas...</div>
                                </router-link>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </div>

                    <section class="user">
                        <!-- @guest -->
                        <router-link v-if="!isLogin" class="link" to="/">Crea tu cuneta</router-link>
                        <router-link v-if="!isLogin" class="link" to="/">Ingresa</router-link>
                        <!-- @endguest -->

                        <!-- @auth -->
                        <div v-if="isLogin" class="drop-content user-drop" @mouseover="hoverDropMenu" @mouseout="noHoverDropMenu">
                            <button class="drop-menu-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-person svgUser" viewBox="0 0 16 16">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg><span>{{ dataUser.name || 'User' }}</span>
                                <!-- Nombre sacar del store con un modulo del usuario (user) -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                </svg></button>
                            <div class="drop-body">
                                <section class="toogle-body"></section>
                                <section class="user-name">
                                    <section class="name-welcome">
                                        <p>!Hola {{ 'Nombre' }}
                                            Bienvenido¡
                                        </p>
                                    </section>
                                </section>
                                <hr>
                                <div onclick="location.href=''">Detalles personales</div>
                                <div onclick="location.href=''">Rastrea tu pedido</div>
                                <div onclick="location.href=''">Cambiar contraseña</div>
                                <div onclick="location.href=''">Mis compras</div>
                                <hr>
                                <div onclick="location.href='/logout'">Salir</div>
                            </div>
                        </div>
                        <!-- @endauth -->

                        <router-link v-if="isLogin" class="link" to="/">Mis conpras</router-link>

                        <!-- @auth -->
                        <router-link v-if="isLogin" class="link wishlistLink" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                        </router-link>
                        <!-- @endauth -->

                        <router-link class="link cartLink" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cart2" viewBox="0 0 16 16">
                                <path
                                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg>
                        </router-link>
                    </section>
                </div>
            </section>
        </nav>
        <div class="drop-backgorund" id="drop-backgorund">
            <div class="back-black"></div>
        </div>
    </header>
</template>

<style scoped></style>