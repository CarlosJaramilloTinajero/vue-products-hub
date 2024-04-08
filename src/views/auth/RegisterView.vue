<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { registerAPI } from '../../services/auth';
import { deepClone } from '../../helpers';
import router from '../../router';
import { BASE_URL_IMG } from '../../constants';

export default defineComponent({
    name: 'RegisterView',
    data() {
        return {
            userFom: {
                name: '',
                password: '',
                email: '',
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
            registerAPI({
                data: deepClone(this.userFom),
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
                <img :src="`${baseUrlImage}/icon.svg`" alt="">
            </router-link>
        </picture>
    </section>

    <section class="container-auth">
        <p class="title">Registrarse</p>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <div class="input-group-p">
                    <input type="text" v-model="userFom.name" required placeholder="Nombre"
                        class="form-control input-border input-border-primary">
                    <label class="placeholder-i">Nombre</label>
                </div>
            </div>
            <div class="mb-3">
                <div class="input-group-p">
                    <input type="email" v-model="userFom.email" required placeholder="Email"
                        class="form-control input-border input-border-primary">
                    <label class="placeholder-i">Email</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="input-group-p">
                    <input type="password" v-model="userFom.password" required placeholder="password"
                        class="form-control input-border input-border-primary">
                    <label class="placeholder-i">Contraseña</label>
                </div>
            </div>
            <button type="submit" class="mt-2 btn btn-sm btn-primary w-100">Registrarse</button>
        </form>
        <p class="info-text">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </section>

</template>

<style scoped></style>