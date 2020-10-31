import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Cookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { getKeycloakConfig } from './utils';
import App from './App';

hydrate(
  <SSRKeycloakProvider
    keycloakConfig={getKeycloakConfig()}
    persistor={new Cookies()}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SSRKeycloakProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
