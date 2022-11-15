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
  medium: ['auto', 'auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto'],
};

export const LayerTypes = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Grid columns={columns[breakpoint]} gap="medium" pad={{ top: 'medium' }}>
      <Type
        title="Center"
        description="Use cases: short forms, double confirmations, etc."
        href="/components/layer/center-layer"
      />
      <Type
        title="Side-drawer"
        description="Use cases: long forms, filtering, etc."
        href="/components/layer/sidedrawer-layer"
      />
      <Type
        title="Full screen"
        description="Use cases: long forms, filtering, etc."
        href="/components/layer/fullscreen-layer"
      />
    </Grid>
  );
};

const Type = ({ description, href, preview, title }) => (
  <Box>
    <Box gap="xsmall">
      <Heading level={3} size="small" margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{description}</Paragraph>
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
  preview: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  href: PropTypes.string,
};
