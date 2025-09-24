import { useContext } from 'react';
import { ThemeContext } from 'grommet';

import { ContentArea } from './components';

export const PageAnatomy = () => {
  const theme = useContext(ThemeContext);
  const height = theme.global.size.medium;
  const width = `${(height.replace('px', '') * 4) / 3}px`;

  return (
    <ContentArea
      title="Page"
      border
      round="xsmall"
      height={height}
      width={width}
    >
      <ContentArea
        title="PageContent"
        alignSelf="center"
        border
        flex
        gap="xsmall"
        width="80%"
      >
        <ContentArea title="Page Header" background="purple!" flex={false} />
        <ContentArea title="Other Content" background="orange" border flex />
      </ContentArea>
    </ContentArea>
  );
};
