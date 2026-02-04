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
      gap="xsmall"
      round="xsmall"
      height={height}
      width={width}
    >
      <ContentArea
        title="Global Header"
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-neutral', opacity: 'weak' }}
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
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-neutral', opacity: 'weak' }}
        flex={false}
      />
    </ContentArea>
  );
};
