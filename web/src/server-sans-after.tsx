import React from 'react';
import express from 'express';
import cookieParser from 'cookie-parser';
import { buildApiServer } from './api';
import { renderToString } from 'react-dom/server';
import { ExpressCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { getKeycloakConfig } from './utils';
import { StaticRouter } from 'react-router-dom';
import App from './App';

let assets: any;
let chunks: any;
const syncLoadAssets = () => {
  chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST!);
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export const renderApp = (req: express.Request, res: express.Response) => {
  // 2. Create an instance of ExpressCookies passing the current request
  const cookiePersistor = ExpressCookies(req);
  const context: any = {};

  try {
    const reactHtml = renderToString(
        <SSRKeycloakProvider
          keycloakConfig={getKeycloakConfig()}
          persistor={cookiePersistor}
        >
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </SSRKeycloakProvider>
    );

    const htmlDocument = `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            chunks.client.css
              ? chunks.client.css
                  .map((css: string) => `<link rel="stylesheet" href="${css}">`)
                  .join('')
              : ''
          }
      </head>
      <body>
          <div id="root">${reactHtml}</div>
          ${
            chunks.client.js
              ? chunks.client.js
                  .filter((js: string) => /\.js$/.test(js))
                  .map(
                    (js: string) =>
                      `<script src="${js}" defer crossorigin></script>`
                  )
                  .join('')
              : ''
          }
      </body>
    </html>`;

    return {
      html: htmlDocument,
      context,
    };
  } catch (e) {
    console.log('error in customRenderer', e);
    throw e;
  }
};

export const buildLambdaServer = () =>
  express()
    .disable('x-powered-by')
    .use(express.static('build/public'))
    .use(cookieParser()) // 1. Add cookieParser Express middleware
    .use('/api', buildApiServer())
    .get('/*', (req: express.Request, res: express.Response) => {
      try {
        const { html, context } = renderApp(req, res);

        if (context.url) {
          // Somewhere a `<Redirect>` was rendered
          return res.redirect(301, context.url);
        }

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
    .get('/*', (req: express.Request, res: express.Response) => {
      const { html, context } = renderApp(req, res);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      res.send(html);
    })
    .listen(port, () => {
      console.log(`🚀 Started on port ${port}`);
    });
