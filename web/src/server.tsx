import React from 'react';
import express from 'express';
import cookieParser from 'cookie-parser';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import Document from './Document';
import { buildApiServer } from './api';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ExpressCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { getKeycloakConfig } from './utils';

let assets: any;
let chunks: any;
const syncLoadAssets = () => {
  chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST!);
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export const renderApp = async (
  req: express.Request,
  res: express.Response
) => {
  // 2. Create an instance of ExpressCookies passing the current request
  const cookiePersistor = ExpressCookies(req);

  // define custom renderer
  const customRenderer = (element: React.ReactElement<unknown>) => {
    const sheet = new ServerStyleSheet();
    try {
      const html = renderToString(
        sheet.collectStyles(
          <SSRKeycloakProvider
            keycloakConfig={getKeycloakConfig()}
            persistor={cookiePersistor}
          >
            {element}
          </SSRKeycloakProvider>
        )
      );

      return {
        html,
        //otherProps will be passed as props to the rendered Document
        styleElement: sheet.getStyleElement(),
      };
    } catch (e) {
      console.log('error in customRenderer', e);
      throw e;
    }
  };

  const html = await render({
    req,
    res,
    routes,
    assets,
    chunks,
    // @ts-ignore
    document: Document,
    customRenderer,
  });

  return html;
};

export const buildLambdaServer = () =>
  express()
    .disable('x-powered-by')
    .use(express.static('build/public'))
    .use(cookieParser()) // 1. Add cookieParser Express middleware
    .use('/api', buildApiServer())
    .get('/*', async (req: express.Request, res: express.Response) => {
      try {
        const html = await renderApp(req, res);
        res.send(html);
      } catch (error) {
        console.error(error);
        res.json({ message: error.message, stack: error.stack });
      }
    });

export const buildLocalServer = (port: number) =>
  express()
    .disable('x-powered-by')
    .use(express.static('public'))
    .use(cookieParser()) // 1. Add cookieParser Express middleware
    .use('/api', buildApiServer())
    .get('/*', async (req: express.Request, res: express.Response) => {
      const html = await renderApp(req, res);

      res.send(html);
    })
    .listen(port, () => {
      console.log(`🚀 Started on port ${port}`);
    });
