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
import { FormNextLink } from 'grommet-icons';
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
    <Grid columns={columns[breakpoint]} gap="large" pad={{ top: 'medium' }}>
      <Type
        title="Center"
        description={`Use for concise task-flow oriented or informational 
        content that should appear front and center to the user.`}
        href="/components/layer/center-layer"
      >
        <Paragraph>Use cases include: confirmations. </Paragraph>
      </Type>
      <Type
        title="Side drawer"
        description={`Use for manipulating data on a page or presenting 
        additional information without navigating the user away from their 
        current context.`}
        href="/components/layer/side-drawer-layer"
      >
        <Paragraph>
          Use cases include: filtering, edit object, configure flows.
        </Paragraph>
      </Type>
      <Type
        title="Fullscreen"
        description={`Use when the layer content is dimensionally large or 
        when it is an involved task flow.`}
        href="/components/layer/fullscreen-layer"
      >
        <Paragraph>
          Use cases include: creating/editing an object with a lot of
          attributes, progressive forms revealing inputs based on preceding
          values.
        </Paragraph>
      </Type>
    </Grid>
  );
};

const Type = ({ children, description, href, preview, title }) => (
  <Box>
    <Box gap="xsmall">
      <Heading level={3} margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{description}</Paragraph>
      {children}
      {href ? (
        <Link href={href} passHref>
          <Button
            a11yTitle={`Read ${title} guidance`}
            alignSelf="start"
            margin={{ vertical: 'small' }}
            label="Read guidance"
            icon={<FormNextLink aria-hidden="true" />}
            // size="small"
            reverse
            secondary
          />
        </Link>
      ) : (
        <Paragraph margin="none">Guidance and examples coming soon.</Paragraph>
      )}
    </Box>
    {preview && (
      <Example plain scale={0.5}>
        {preview}
      </Example>
    )}
  </Box>
);

Type.propTypes = {
  children: PropTypes.element,
  preview: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  href: PropTypes.string,
};
