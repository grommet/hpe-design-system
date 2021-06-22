import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Anchor, Box, Heading, Paragraph } from 'grommet';

import { SubsectionHeader } from '../../layouts';
import { SubsectionText } from '.';

export const internalLink = RegExp('^/.*|^#.*');

export const components = {
  blockquote: props => (
    <Box width="large">
      <Paragraph
        margin={{ top: 'large', bottom: 'none', left: 'large' }}
        size="xxlarge"
        {...props}
      />
    </Box>
  ),
  p: SubsectionText,
  a: props =>
    internalLink.test(props.href) ? (
      <Link href={props.href} passHref>
        <Anchor {...props} />
      </Link>
    ) : (
      <Anchor rel="noopener" target="_blank" {...props} />
    ),
  ol: props => (
    <SubsectionText
      as="ol"
      style={{
        // don't let text wrap beneath bullet
        listStylePosition: 'outside',
        paddingLeft: '21px', // Left align bullet with p text
      }}
      {...props}
    />
  ),
  ul: props => (
    <SubsectionText
      as="ul"
      style={{
        // don't let text wrap beneath bullet
        listStylePosition: 'outside',
        paddingLeft: '21px', // Left align bullet with p text
      }}
      {...props}
    />
  ),
  h1: props => <Heading margin={{ vertical: 'small' }} level={1} {...props} />,
  h2: props => <SubsectionHeader level={2} {...props} />,
  h3: props => <SubsectionHeader level={3} {...props} />,
  h4: props => <SubsectionHeader level={4} {...props} />,
  hr: () => (
    <Box
      as="hr"
      border={{
        style: 'none',
        side: 'bottom',
      }}
      fill="horizontal"
    />
  ),
};

components.a.propTypes = {
  href: PropTypes.string.isRequired,
};
