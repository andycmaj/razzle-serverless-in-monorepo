import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './routes';
import { Cookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { getKeycloakConfig } from './utils';

ensureReady(routes).then((data: any) =>
  hydrate(
    <SSRKeycloakProvider
      keycloakConfig={getKeycloakConfig()}
      persistor={new Cookies()}
    >
      <BrowserRouter>
        <After data={data} routes={routes} transitionBehavior="blocking" />
      </BrowserRouter>
    </SSRKeycloakProvider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
