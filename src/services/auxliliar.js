import conecction from "../conecction";
import { notify, updateNotify } from "../notify";

const classConecction = new conecction('$2y$10$qxrB6JHv6MWnI.Z3pDWD8OpI1dwxyAVpEXwilqSsPrACCkcSNVZLS');

export const fetchData = async ({ publicURL = true, url, method, requestData = {}, token = true, authorization = false }) => {
    try {
        const { data } = await classConecction.loadData({ url, method, data: requestData, token, publicURL, authorization });
        // if (data.mgs) {
        //     notify(data.mgs, 'error');
        // }
        return await data ;
    } catch (error) {
        // console.log(error);
        // if (error?.response?.status === 400) {
        //     notify(error.response?.data?.msg);
        // }
        return null;
    }
}

export const makeApiRequest = async ({ url, method, requestData = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false, msgSuccess = '¡Exito!', msgError = '¡Error!', publicURL = true, token = true, authorization = false }) => {
    let idNotify = null;
    if (showNotify) idNotify = notify('Cargando...', 'loading');

    try {
        const data = await fetchData({ url, method, requestData, publicURL, token, authorization });

        if (data && data.status) {
            if (idNotify) updateNotify(idNotify, msgSuccess, 'success');
            funcSuccess(data);
        } else {
            if (idNotify) updateNotify(idNotify, msgError, 'error');
            funcError(data);
        }
    } catch (error) {
        funcError();
        if (idNotify) updateNotify(idNotify, msgError, 'error');
    }

} 