import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// This custom set-up is necessary to inject the server side
// rendered styles into the <head>
// More info here: https://github.com/zeit/next.js/tree/master/examples/with-styled-components

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="hpe_slim_header" className="hpe_slim_header" />
          <Main />
          <div id="hpe_slim_footer" className="hpe_slim_footer" />
          <script src="https://h50007.www5.hpe.com/hfws-static/js/framework/jquery/v-3-5-1/jquery.js" />
          <script src="https://h50007.www5.hpe.com/hfws/us/en/hpe/slim/root?contentType=js&color_scheme=dark" />
          <style>
            {`#hpeslh_site-header .hpeslh_container.hpeslh_wide {
              border: none;
            }`}
          </style>
          <NextScript />
        </body>
      </Html>
    );
  }
}
