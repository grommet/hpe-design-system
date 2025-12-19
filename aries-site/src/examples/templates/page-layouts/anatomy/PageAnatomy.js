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
        <ContentArea
          title="Page Header"
          // TODO: Using opacity weak is a temporary solution until
          // we have a wider range of colors in the theme.
          background={{ color: 'decorative-purple', opacity: 'weak' }}
          flex={false}
        />
        <ContentArea
          title="Other Content"
          // TODO: Using opacity weak is a temporary solution until
          // we have a wider range of colors in the theme.
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          flex
        />
      </ContentArea>
    </ContentArea>
  );
};
