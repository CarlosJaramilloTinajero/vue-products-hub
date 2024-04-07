import axios from "axios";
import { notify } from "../notify";
import { APP_DEBUG } from "../constants";

class conecction {
    constructor(token) {
        this.token = token;
        this.axiosCon = axios.create({
            baseURL: APP_DEBUG ? 'http://127.0.0.1:8000/api/' : 'https://api.carlosjaramillo.beauty/api/'
            // baseURL: 'https://api.carlosjaramillo.beauty/api/'
        });
    }

    async loadData({ publicURL = true, method = '', url = '', data = {}, token = false, errorResponse = false }) {

        // if (token && (!this.token || this.token !== localStorage.getItem('token'))) {
        //     this.token = localStorage.getItem('token');
        // }

        const header = token ? {
            token: this.token
        } : {};

        try {
            return await this.axiosCon({
                method: method,
                url: (publicURL ? 'public/' : '') + url,
                data: data,
                headers: header
            });
        } catch (error) {

            if (errorResponse && error.response.status === 500) {
                notify('¡Error en el servidor!', 'error')
                return;
            }

            if (error?.response?.status === 400) {
                if (error.response.data.mgs) notify(error.response?.data?.mgs, 'error');
            }

            // error.response.status == 401 ||
            // if (errorResponse && error.response && (error.response.status == 400)) {
            //     notify(error.response.data, 'error');
            // }

        }
    }

    setToken(token) {
        this.token = token;
    }
};

export default conecction;