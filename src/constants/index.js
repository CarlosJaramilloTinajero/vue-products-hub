export const APP_DEBUG = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL_IMG = APP_DEBUG ? '' : '/products-hub/';

export const FILTERS_CATALOGUE_CONST = {
    brands: [],
    // search: '',
    // categorySlug: '',
    orderBy: '',
    price: { from: 'all', to: 'all' },
    // for_table: true
  };