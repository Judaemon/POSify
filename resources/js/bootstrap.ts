import axios from 'axios';
import { redirect } from 'react-router-dom';

declare global {
  interface Window {
    axios: typeof axios;
  }
}

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// End of axios setup

import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

// End of zustand setup

window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401: // Not logged in
        console.log('Not logged in');
        redirect('/login');

        Promise.reject(error);

        break;
      case 419: // Session expired
        // Bounce the user to the login screen with a redirect back
        // window.location.href = '/login?redirectTo=' + encodeURIComponent(window.location.pathname);
        // window.location.href = '/session-expired';
        // redirect('/');

        break;
      case 503: // Down for maintenance
        // Bounce the user to the login screen with a redirect back
        // window.location.reload();
        break;
      case 500:
        alert('Oops, something went wrong!  The team have been notified.');
        break;
      default:
        // Allow individual requests to handle other errors
        return Promise.reject(error);
    }
  }
);
