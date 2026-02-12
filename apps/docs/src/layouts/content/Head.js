import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

export const Head = ({ title }) => (
  <HeadNext>
    <title>
      {title && title !== 'Home'
        ? `${title} — HPE Design System`
        : 'HPE Design System'}
    </title>
    <link rel="icon" href="/static/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </HeadNext>
);

Head.propTypes = {
  title: PropTypes.string,
};
