import React from 'react';
import Link from 'next/link';
import { Button } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

export const ContainerTokensCTA = () => (
  <Link
    href="/design-tokens/layout-and-spacing#containers"
    passHref
    legacyBehavior
  >
    <Button
      label="View container design tokens"
      icon={<LinkNext aria-hidden="true" />}
      reverse
      alignSelf="start"
      secondary
    />
  </Link>
);

export const BorderWidthTokensCTA = () => (
  <Link
    href="/design-tokens/layout-and-spacing#border-width"
    passHref
    legacyBehavior
  >
    <Button
      label="View border width design tokens"
      icon={<LinkNext aria-hidden="true" />}
      reverse
      alignSelf="start"
      secondary
    />
  </Link>
);

export const RadiusTokensCTA = () => (
  <Link
    href="/design-tokens/layout-and-spacing#radius"
    passHref
    legacyBehavior
  >
    <Button
      label="View radius design tokens"
      icon={<LinkNext aria-hidden="true" />}
      reverse
      alignSelf="start"
      secondary
    />
  </Link>
);
