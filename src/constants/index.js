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

export const URL_API_PROD = 'https://api.carlosjaramillo.beauty/api/';

export const URL_API_DEBUG = 'http://127.0.0.1:8000/api/';

export const URL_API_CONTEXT = APP_DEBUG ? URL_API_DEBUG : URL_API_PROD;