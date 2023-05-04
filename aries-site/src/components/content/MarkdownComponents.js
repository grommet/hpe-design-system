import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'grommet-theme-hpe';

import { TextEmphasis } from 'aries-core';
import { SubsectionHeader } from '../../layouts';
import { SubsectionText } from '.';

export const internalLink = RegExp('^/.*|^#.*');

const StyledStrong = styled(Text)`
  font-weight: 500;
  font-size: inherit;
  line-height: inherit;
`;

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
  code: props => (
    <Box width="large" round="xsmall" overflow="auto">
      <SyntaxHighlighter
        style={prism.light}
        wrapLongLines
        language="javascript"
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
  strong: props => <StyledStrong weight={500} {...props} />,
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
  table: props => (
    <Box
      align="start"
      width={{ max: 'xlarge' }}
      margin={{ bottom: 'medium' }}
      overflow="auto"
    >
      <Box background="background-front" pad="medium" round="small">
        <Table {...props} />
      </Box>
    </Box>
  ),
  tbody: props => <TableBody {...props} />,
  thead: props => <TableHeader {...props} />,
  td: props => (
    <TableCell
      border={{ side: 'bottom', color: 'border-weak' }}
      verticalAlign="top"
      width={{ max: 'medium' }}
      pad={{ vertical: 'small', horizontal: 'small' }}
      {...props}
    />
  ),
  th: props => (
    <TableCell
      scope="col"
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      {...props}
    >
      <TextEmphasis>{props.children}</TextEmphasis>
    </TableCell>
  ),
  tr: props => <TableRow {...props} />,
};

components.a.propTypes = {
  href: PropTypes.string.isRequired,
};

components.th.propTypes = {
  children: PropTypes.node,
};
