import React from 'react';
import Link from 'next/link';
import { Button } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

export const ContainerTokensCTA = () => (
  <Link
    href="/design-tokens/layout-and-spacing#content-container-sizes"
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
