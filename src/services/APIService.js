import conecction from "../conecction";
import { makeApiRequest } from "./auxliliar";
const classConecction = new conecction('$2y$10$qxrB6JHv6MWnI.Z3pDWD8OpI1dwxyAVpEXwilqSsPrACCkcSNVZLS');

export const getProductsByAPI = async ({ page = 1, perPage = 10, filters = {}, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'post',
        url: 'products?page=' + page + '&perPage=' + perPage,
        requestData: filters,
        funcSuccess,
        funcError,
        showNotify: false
    });
}

export const getCategoriesByAPI = async ({ funcSuccess = () => { }, funcError = () => { } } = {}) => {
    makeApiRequest({
        url: 'categories',
        method: 'get',
        funcSuccess,
        funcError,
        showNotify: false
    });
}

export const getDepartamentsByAPI = async ({ funcSuccess = () => { }, funcError = () => { } } = {}) => {
    makeApiRequest({
        url: 'departaments',
        method: 'get',
        funcError,
        funcSuccess,
        showNotify: false
    });
}

export const initAPP = () => classConecction.loadData({
    data: { msg: 'Entraron al proyecto Products hub Vue 3' },
    method: 'post',
    publicURL: false,
    url: 'send-mail'
})