import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Anchor,
  Box,
  Button,
  Heading,
  Paragraph,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { Copy } from '@hpe-design/icons-grommet';
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

const defaultCopyTip = 'Copy code to clipboard';

const CopyCodeButton = ({ code }) => {
  const [copyTip, setCopyTip] = React.useState(defaultCopyTip);

  const onCopy = () => {
    const duration = 2000;
    navigator.clipboard.writeText(code.toString());
    setCopyTip('Copied!');
    const timer = setTimeout(() => {
      setCopyTip(defaultCopyTip);
    }, duration);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      a11yTitle={copyTip}
      tip={copyTip}
      icon={<Copy />}
      onClick={onCopy}
    />
  );
};

CopyCodeButton.propTypes = {
  code: PropTypes.string.isRequired,
};

export const components = {
  blockquote: props => (
    <Box width="xlarge">
      <Paragraph
        margin={{ top: 'xlarge', bottom: 'none', left: 'xlarge' }}
        size="xxlarge"
        {...props}
      />
    </Box>
  ),
  pre: ({ children, ...rest }) => (
    <Box
      width="xlarge"
      round="xsmall"
      overflow="auto"
      margin={{ bottom: 'medium' }}
    >
      <Stack anchor="top-right">
        <SyntaxHighlighter
          style={prism.light}
          wrapLongLines
          language="javascript"
          {...rest}
        >
          {children?.props?.children}
        </SyntaxHighlighter>
        <CopyCodeButton code={children?.props?.children} />
      </Stack>
    </Box>
  ),
  p: SubsectionText,
  a: props =>
    internalLink.test(props.href) ? (
      <Link href={props.href} passHref legacyBehavior>
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
  h1: props => <Heading margin={{ vertical: 'xsmall' }} level={1} {...props} />,
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
      width={{ max: 'xxlarge' }}
      margin={{ bottom: 'medium' }}
      overflow="auto"
    >
      <Box background="background-front" pad="medium" round="medium">
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
      pad={{ vertical: 'xsmall', horizontal: 'xsmall' }}
      {...props}
    />
  ),
  th: props => (
    <TableCell
      scope="col"
      pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
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
