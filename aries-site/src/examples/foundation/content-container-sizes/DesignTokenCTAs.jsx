import React from 'react';
import Link from 'next/link';
import { Button } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

// eslint-disable-next-line react/prop-types
const RoutedButton = ({ href, label }) => (
  <Link href={href} passHref >
    <Button
      label={label}
      icon={<LinkNext aria-hidden="true" />}
      reverse
      alignSelf="start"
      secondary
    />
  </Link>
);

export const ContainerTokensCTA = () => (
  <RoutedButton
    href="/design-tokens/layout-and-spacing#container-sizes"
    label="View container size design tokens"
  />
);

export const BorderWidthTokensCTA = () => (
 <RoutedButton
    href="/design-tokens/layout-and-spacing#border-width"
    label="View border width design tokens"
  />
);

export const RadiusTokensCTA = () => (
  <RoutedButton
    href="/design-tokens/layout-and-spacing#radius"
    label="View radius design tokens"
  />
);
