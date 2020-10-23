import React from 'react';

import { asyncComponent, AsyncRouteProps } from '@jaredpalmer/after';

const routes: AsyncRouteProps[] = [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/protected',
    exact: true,
    component: asyncComponent({
      loader: () => import('./protected'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];

export default routes;
