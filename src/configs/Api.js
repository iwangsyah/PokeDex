const URL_VERSION = '/v1';
// const BASE_URL = __DEV__
//   ? 'https://dev.api.astrylee.com'
//   : 'https://api.astrylee.com';

const BASE_URL = 'https://dev.api.astrylee.com';

export default (Api = {
  URL_AUTH: `${BASE_URL}/auth`,
  URL_USER: `${BASE_URL}/users`,
});
