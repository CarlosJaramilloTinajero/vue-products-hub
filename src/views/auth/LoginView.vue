<script>
import { defineComponent } from 'vue';
import { notify } from '../../notify';
import { loginAPI } from '../../services/auth';
import { deepClone } from '../../helpers';
import router from '../../router';
import { mapActions } from 'vuex';
import { BASE_URL_IMG } from '../../constants';

export default defineComponent({
    name: 'LoginView',
    data() {
        return {
            userFom: {
                name: '',
                password: '',
            },
            baseUrlImage: BASE_URL_IMG
        }
    },
    methods: {
        ...mapActions([
            'setIsLoginAction'
        ]),
        handleSubmit() {
            this.validateForm();
            loginAPI({
                credentials: deepClone(this.userFom),
                showNotify: true,
                funcSuccess: (response) => {
                    if (response.data) response = response.data;
                    localStorage.setItem('token', response.token_type + ' ' + response.access_token);
                    localStorage.setItem('user_name', response.user_name);
                    router.push('/');
                    this.setIsLoginAction();
                }
            })
        },
        validateForm() {
            if (!this.userFom.name) notify('El nombre es requerido');
            if (!this.userFom.password) notify('La contraseña es requerida');
        },
        resetForm() {
            this.userFom = {
                name: '',
                password: ''
            };
        }
    },
    components: {}
})

</script>

<template>

    <section class="header-auth">
        <picture class="logo">
            <router-link to="/">
                <img :src="`${baseUrlImage}/icon.svg`" alt="">
            </router-link>
        </picture>
    </section>

    <section class="container-auth">
        <p class="title">Inicia sesión</p>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <div class="input-group-p">
                    <input v-model="userFom.name" placeholder="Nombre" type="text" required
                        class="form-control input-border input-border-primary">
                    <label class="placeholder-i">Nombre</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="input-group-p">
                    <input v-model="userFom.password" required placeholder="password" type="password"
                        class="form-control input-border input-border-primary">
                    <label class="placeholder-i">Contraseña</label>
                </div>
            </div>
            <button type="submit" class="mt-2 btn btn-sm btn-primary w-100">Iniciar sesion</button>
        </form>
        <p class="info-text">¿No tienes cuenta? <router-link to="/register">Crear cuenta</router-link></p>
    </section>

</template>

<style scoped></style>