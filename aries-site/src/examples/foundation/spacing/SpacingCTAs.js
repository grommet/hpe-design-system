import React from 'react';
import Link from 'next/link';
import { Anchor, Button } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

export const SpacingTokensCTA = () => (
  <Link
    href="/design-tokens/layout-and-spacing#spacing"
    passHref
    legacyBehavior
  >
    <Button
      label="View spacing design tokens"
      icon={<LinkNext aria-hidden="true" />}
      reverse
      alignSelf="start"
      secondary
    />
  </Link>
);

export const ElementTokensCTA = () => (
  <Link
    href="/design-tokens/element"
    passHref
    legacyBehavior
  >
    <Anchor>element tokens</Anchor>
  </Link>
);
