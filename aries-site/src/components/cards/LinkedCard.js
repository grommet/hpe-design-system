import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { nameToPath } from '../../utils';
import { ContentCard } from '.';

export const LinkedCard = ({ topic }) => {
  return (
    // Need to pass href because of: https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child
    <Link href={nameToPath(topic.name)} passHref>
      <ContentCard as="a" style={{ textDecoration: 'none' }} topic={topic} />
    </Link>
  );
};

LinkedCard.propTypes = {
  topic: PropTypes.shape({
    name: PropTypes.string,
  }),
};
