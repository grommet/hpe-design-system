import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

export const Head = ({ title }) => (
  <HeadNext>
    <link rel="icon" href="/static/favicon.ico" />
    <title>{title ? `${title} — Aries` : 'Aries | HPE Design System'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </HeadNext>
);

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: undefined,
};
