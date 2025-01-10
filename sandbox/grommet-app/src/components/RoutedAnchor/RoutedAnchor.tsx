import React from 'react';
import { Anchor } from 'grommet';

interface RoutedAnchorProps extends React.ComponentProps<typeof Anchor> {
  to: string;
}

export const RoutedAnchor = ({ ...rest }: RoutedAnchorProps) => (
  <Anchor {...rest} />
);
