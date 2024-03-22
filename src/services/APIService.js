import conecction from "../conecction";
import { notify } from "../notify";

const classConecction = new conecction('$2y$10$qxrB6JHv6MWnI.Z3pDWD8OpI1dwxyAVpEXwilqSsPrACCkcSNVZLS');

export const getProductsByAPI = async ({ page = 1, perPage = 10, filters = {}, funcSuccess = () => { }, funcError = () => { } }) => {
    try {
        const { data } = await classConecction.loadData({ method: 'post', url: 'products?page=' + page + '&perPage=' + perPage, data: filters, token: true });
        if (data && data.status) {
            funcSuccess(data);
        } else {
            notify('El servidor no responde', 'error');
            funcError(data);
        }
    } catch (error) {
        // console.log(error);
        notify('El servidor no responde', 'error');
        funcError();
    }
}

export const getCategoriesByAPI = async ({ funcSuccess = () => { }, funcError = () => { } } = {}) => {
    try {
        const { data } = await classConecction.loadData({ url: 'categories', method: 'get', token: true });
        if (data && data.status) {
            funcSuccess(data);
        } else {
            notify('El servidor no responde', 'error');
            funcError(data);
        }
    } catch (error) {
        funcError();
        notify('El servidor no responde', 'error');
    }
}

export const getDepartamentsByAPI = async ({ funcSuccess = () => { }, funcError = () => { } } = {}) => {
    try {
        const { data } = await classConecction.loadData({ url: 'departaments', method: 'get', token: true });
        if (data && data.status) {
            funcSuccess(data);
        } else {
            notify('El servidor no responde', 'error');
            funcError(data);
        }
    } catch (error) {
        funcError();
        notify('El servidor no responde', 'error');
    }
}