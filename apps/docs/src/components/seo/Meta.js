import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

export const Meta = ({
  title,
  description,
  canonicalUrl,
  render,
  socialImageUrl,
}) => {
  const siteName = 'HPE Design System';
  const defaultImage = '/static/images/aries-introduction.jp2';
  const previewImage = socialImageUrl || defaultImage;
  const twitterHandle = null;
  const businessUnit = 'CORP';
  const segment = 'corporate';
  const lifecycle = 'support';
  const pageContent = 'products';
  const csp = `default-src 'self' 'unsafe-eval';
  style-src 'self' *.hpe.com/hfws-static/5/css/ 'unsafe-inline';
  connect-src 'self' *.githubusercontent.com/grommet/hpe-design-system/ https://api.github.com/repos/grommet/hpe-design-system/pulls https://api.github.com/repos/grommet/hpe-design-system/commits https://www.google-analytics.com https://www.github.com/grommet/ https://eyes.applitools.com *.hpe.com/hpe/api/ https://api.spacexdata.com/ https://raw.githubusercontent.com/w3c/wcag/refs/heads/main/guidelines/wcag.json https://api.questionpro.com/a/api/v2/cx/surveys/13060889/responses;
  media-src 'self' https://d3hq6blov2iije.cloudfront.net/media/;
  img-src 'self' data: https://www.google-analytics.com https://images.unsplash.com/ http://s.gravatar.com/avatar/ *.hpe.com/hfws-static/5/ https://d3hq6blov2iije.cloudfront.net/images/textures/ https://d3hq6blov2iije.cloudfront.net/images/gradients/ https://d3hq6blov2iije.cloudfront.net/images/hpe-greenlake/;
  script-src 'self' *.hpe.com https://www.google-analytics.com/analytics.js https://www.googletagmanager.com/gtag/js https://netlify-cdp-loader.netlify.app/netlify.js ${
    // in dev mode, we allow unsafe-eval to work with react hot reloader
    process.env.NODE_ENV !== 'production' ? "'unsafe-eval'" : ''
  };
  font-src *.hpe.com hpefonts.s3.amazonaws.com https://d3hq6blov2iije.cloudfront.net/fonts/;
  object-src 'none';`;

  /*
   * IMPORTANT: `<meta>` tags need to be contained as **direct** children of
   * the Nextjs `<Head>` component, or wrapped into a maximum one level of
   * `<React.Fragment>`, otherwise the meta tags will not be correctly picked
   * up on clientside navigation. For reference: https://nextjs.org/docs#populating-head
   */

  /*
   * `key` prop on `<meta>` tags avoids duplicate tags in `<head>` ensuring the
   * tag is only rendered once. For reference: https://nextjs.org/docs#populating-head
   */

  return (
    <Head>
      <title>
        {title && title !== 'Home'
          ? `${render || title} — HPE Design System`
          : 'HPE Design System'}
      </title>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
      <meta key="description" name="description" content={description} />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/favicon.ico" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {/* Open Graph */}
      <meta
        key="og:title"
        name="og:title"
        property="og:title"
        content={title}
      />
      <meta
        key="og:description"
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      {previewImage && (
        <meta key="og:image" property="og:image" content={previewImage} />
      )}
      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      {twitterHandle && (
        <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
      )}
      {/* Tempted to combine these conditionals? Be careful. If nested, they
       * won't be correctly picked up by clientside rendering. See comment above
       * about max levels of <React.Fragment /> in <Head />
       */}
      {twitterHandle && (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={twitterHandle}
        />
      )}
      {previewImage && (
        <meta key="twitter:image" name="twitter:image" content={previewImage} />
      )}
      {/* HPE Marketing Analytics */}
      <meta key="bu" name="bu" content={businessUnit} />
      <meta key="segment" name="segment" content={segment} />
      <meta key="lifecycle" name="lifecycle" content={lifecycle} />
      <meta key="page_content" name="page_content" content={pageContent} />
      <meta httpEquiv="Content-Security-Policy" content={csp} />
    </Head>
  );
};

Meta.propTypes = {
  canonicalUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  render: PropTypes.string,
  socialImageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};
