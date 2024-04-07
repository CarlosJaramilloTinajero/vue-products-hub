<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { registerAPI } from '../../services/auth';
import { deepClone } from '../../helpers';
import { APP_DEBUG } from '../../constants';
import router from '../../router';

export default defineComponent({
    name: 'RegisterView',
    data() {
        return {
            userFom: {
                name: '',
                password: '',
                email: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'setIsLoginAction'
        ]),
        handleSubmit() {
            this.validateForm();
            registerAPI({
                data: deepClone(this.userFom),
                showNotify: true,
                funcSuccess: (response) => {
                    if (APP_DEBUG) response = response.data;
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
            if (!this.userFom.email) notify('El email es requerido');
        },
        resetForm() {
            this.userFom = {
                name: '',
                password: '',
                email: ''
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
                <img src="/icon.svg" alt="">
            </router-link>
        </picture>
    </section>

    <section class="container-auth">
        <p class="title">Registrarse</p>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <div class="input-group">
                    <input type="text" v-model="userFom.name" required placeholder="Nombre" class="form-control">
                    <label class="placeholder-i">Nombre</label>
                </div>
            </div>
            <div class="mb-3">
                <div class="input-group">
                    <input type="email" v-model="userFom.email" required placeholder="Email" class="form-control">
                    <label class="placeholder-i">Email</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="input-group">
                    <input type="password" v-model="userFom.password" required placeholder="password"
                        class="form-control">
                    <label class="placeholder-i">Contraseña</label>
                </div>
            </div>
            <button type="submit" class="mt-2 btn btn-sm btn-primary w-100">Registrarse</button>
        </form>
        <p class="info-text">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </section>

</template>

<style scoped></style>