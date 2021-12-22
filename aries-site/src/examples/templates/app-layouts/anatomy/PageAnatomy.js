import { useContext } from 'react';
import { ThemeContext } from 'grommet';

import { ContentArea } from './components';

export const PageAnatomy = () => {
  const theme = useContext(ThemeContext);
  const height = theme.global.size.medium;
  const width = `${(height.replace('px', '') * 4) / 3}px`;

  return (
    <ContentArea
      title="Page Container"
      border
      gap="small"
      round="xsmall"
      height={height}
      width={width}
    >
      <ContentArea title="Page Header" background="purple!" flex={false} />
      <ContentArea title="Page Content" background="orange" fill />
    </ContentArea>
  );
};
