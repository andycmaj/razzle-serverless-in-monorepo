import React from 'react';
import { debug } from '../../shared/log';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  DocumentgetInitialProps,
} from '@jaredpalmer/after';

export default class Document extends React.Component {
  static async getInitialProps({ renderPage }: DocumentgetInitialProps) {
    debug('Doc:GetInitialProps');
    const page = await renderPage();
    return { ...page };
  }

  render() {
    const { helmet, styleElement } = this.props as any;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {/* here is where we put our Styled Components styleTags... */}
          {styleElement}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData />
          <AfterScripts />
        </body>
      </html>
    );
  }
}
