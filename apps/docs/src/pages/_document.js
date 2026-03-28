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
        <Head>
          <script
            id="hpe-global-header"
            type="text/javascript"
            async=""
            src="https://storage.googleapis.com/hpe-global-header-assets/hpe-global-header.js"
          />
        </Head>
        <body>
          <div id="header" className="header" />
          <Main />
          <div id="footer" className="footer" />
          <script src="https://h50007.www5.hpe.com/hfws-static/js/framework/jquery/v-3-6-0/jquery.js" />
          <script src="https://h50007.www5.hpe.com/hfws/us/en/hpe/latest.r/root?contentType=js&switchToCHF=true&hide_country_selector=true&hide_search=true&hide_cart=true&hide_sign_in=true&header_logo=hpe&slim_footer=true" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
