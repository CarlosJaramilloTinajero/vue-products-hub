import { makeApiRequest } from "../auxliliar"

export const getProductBySlugAPI = async ({ slug, funcSuccess = () => { }, funcError = () => { } }) => {
    makeApiRequest({
        method: 'get',
        url: 'product/slug/' + slug,
        funcSuccess,
        funcError,
        showNotify: false
    });
}