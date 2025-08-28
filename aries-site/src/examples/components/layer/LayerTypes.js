import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Box,
  Button,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { Example } from '../../../layouts';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['flex', 'flex'],
  large: ['flex', 'flex', 'flex'],
  xlarge: ['flex', 'flex', 'flex'],
};

export const LayerTypes = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Grid columns={columns[breakpoint]} gap='xlarge' pad={{ top: 'medium' }}>
      <Type title="Center" href="/components/layer/center-layer">
        <Paragraph margin="none">
          Use for concise, task-flow oriented or informational content that
          should appear front and center to the user.
        </Paragraph>
        <Paragraph>Use cases include: confirmations.</Paragraph>
      </Type>
      <Type title="Side drawer" href="/components/layer/side-drawer-layer">
        <Paragraph margin="none">
          Use for manipulating data on a page or presenting additional
          information without navigating the user away from their current
          context.
        </Paragraph>
        <Paragraph>
          Use cases include: filtering, editing objects, configuration flows.
        </Paragraph>
      </Type>
      <Type title="Fullscreen" href="/components/layer/fullscreen-layer">
        <Paragraph margin="none">
          Use when the layer content is dimensionally large or when it is an
          involved task flow.
        </Paragraph>
        <Paragraph>
          Use cases include: creating/editing an object with a lot of
          attributes, progressive forms revealing inputs based on preceding
          values, and wizards.
        </Paragraph>
      </Type>
    </Grid>
  );
};

const Type = ({ children, href, preview, title }) => (
  <Box>
    <Box gap='3xsmall'>
      <Heading level={3} margin="none">
        {title}
      </Heading>
      {children}
      <Link href={href} passHref legacyBehavior>
        <Button
          a11yTitle={`Read ${title.toLowerCase()} guidance.`}
          alignSelf="start"
          margin={{ vertical: 'xsmall' }}
          label="Read guidance"
          icon={<LinkNext aria-hidden="true" />}
          reverse
          secondary
        />
      </Link>
    </Box>
    {preview && (
      <Example plain scale={0.5}>
        {preview}
      </Example>
    )}
  </Box>
);

Type.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  preview: PropTypes.element,
  title: PropTypes.string,
  href: PropTypes.string,
};
