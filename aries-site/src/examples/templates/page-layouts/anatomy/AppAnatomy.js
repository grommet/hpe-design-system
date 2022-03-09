import { useContext } from 'react';
import { ThemeContext } from 'grommet';

import { ContentArea } from './components';

export const AppAnatomy = () => {
  const theme = useContext(ThemeContext);
  const height = theme.global.size.medium;
  const width = `${(height.replace('px', '') * 4) / 3}px`;

  return (
    <ContentArea
      title="App Container"
      border
      gap="small"
      round="xsmall"
      height={height}
      width={width}
    >
      <ContentArea
        title="Global Header"
        background="status-unknown"
        flex={false}
      />
      <ContentArea title="Page" border flex>
        <ContentArea
          alignSelf="center"
          title="PageContent"
          border
          flex
          width="80%"
        />
      </ContentArea>
      <ContentArea
        title="Global Footer"
        background="status-unknown"
        flex={false}
      />
    </ContentArea>
  );
};
