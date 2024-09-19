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
import { EventPromotionCard, NavigationalCardPreview } from '.';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto'],
};

export const CardTypes = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Grid columns={columns[breakpoint]} gap="medium">
      <Type
        title="Call to action"
        description="Entice the user down a desired path."
        preview={<EventPromotionCard />}
        href="/components/card/call-to-action-card"
      />
      <Type
        title="Navigational"
        description="Provide the user with a means of wayfinding."
        preview={<NavigationalCardPreview />}
        href="/components/card/navigational-card"
      />
      <Type
        title="Status-based navigation"
        description={`Quickly assist the user to navigate to resources, tasks, 
      or processes requiring their attention and/or action.`}
      />
      <Type
        title="Resource"
        description={`Allow a user to scan a set of resource options and choose 
      one based on their needs.`}
      />
      <Type
        title="Analytic"
        description={`Present measures and metrics in short, digestible content 
      pieces and allow a user to navigate to underlying detail is needed.`}
      />
    </Grid>
  );
};

const Type = ({ description, href, preview, title }) => (
  <Box>
    <Box gap="xsmall">
      <Heading level={3} margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{description}</Paragraph>
      {href ? (
        <Link href={href} passHref legacyBehavior>
          <Button
            a11yTitle={`Read ${title} guidance`}
            alignSelf="start"
            margin={{ vertical: 'small' }}
            label="Read guidance"
            icon={<LinkNext aria-hidden="true" />}
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
