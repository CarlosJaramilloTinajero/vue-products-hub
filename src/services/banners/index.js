import { makeApiRequest } from "../auxliliar";

export function getAllBannersAPI({ funcSuccess = () => { }, funcError = () => { } }) {
    makeApiRequest({
        url: 'banners',
        method: 'get',
        funcError,
        funcSuccess,
        publicURL: true,
        token: true,
        authorization: false
    });
}