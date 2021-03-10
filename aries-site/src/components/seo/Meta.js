import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

export const Meta = ({ title, description, canonicalUrl, socialImageUrl }) => {
  const siteName = 'HPE Design System';
  const defaultImage = '/static/images/aries-introduction.jp2';
  const previewImage = socialImageUrl || defaultImage;
  const twitterHandle = null;
  const businessUnit = 'CORP';
  const segment = 'corporate';
  const lifecycle = 'support';
  const pageContent = 'products';

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
          ? `${title} — HPE Design System`
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
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval'; 
        style-src 'self' *.hpe.com/hfws-static/slim/css/ 'unsafe-inline';
        connect-src 'self' *.githubusercontent.com/grommet/hpe-design-system/ *.google-analytics.com;
        media-src 'self' https://d3hq6blov2iije.cloudfront.net/media/HPE+Design+System-v3.mp4;
        img-src 'self' *.google-analytics.com;
        script-src-elem 'self' *.hpe.com https://www.google-analytics.com/analytics.js;
        font-src *.hpe.com hpefonts.s3.amazonaws.com *.cloudfront.net/fonts/;
        object-src none;"></meta>
      {/* <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://h50007.www5.hpe.com/hfws-static/js/framework/jquery/v-3-5-1/jquery.js https://h50007.www5.hpe.com/hfws/us/en/hpe/slim/root?contentType=js&color_scheme=dark 'unsafe-inline'; "></meta> */}
    </Head>
  );
};

Meta.propTypes = {
  canonicalUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  socialImageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
};
