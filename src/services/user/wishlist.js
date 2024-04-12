import { makeApiRequest } from "../auxliliar";

export function addToWishlistAPI({ data, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        method: 'post',
        url: '/wishlist/add',
        authorization: true,
        publicURL: false,
        token: false,
        requestData: data,
        showNotify,
        funcError,
        funcSuccess,
        msgError: 'Error al agregar el producto',
        msgSuccess: 'Producto agregado correctamente'
    })
};

export function getUserWishlistAPI({ showNotify = false, funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        method: 'post',
        url: '/wishlist/user',
        authorization: true,
        token: false,
        publicURL: false,
        funcError,
        funcSuccess,
        showNotify,
        msgError: 'Error al obtener los productos'
    })
}

export function removeProductWishlistAPI({ id, showNotify = false, funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        method: 'delete',
        url: '/wishlist/remove/' + id,
        authorization: true,
        token: false,
        publicURL: false,
        funcError,
        funcSuccess,
        showNotify,
        msgSuccess: 'Producto eliminado',
        msgError: 'Error al eliminar el producto'
    })
}

