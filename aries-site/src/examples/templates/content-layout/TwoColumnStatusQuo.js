import { Children, useContext } from 'react';
import { Box, Grid, Header, Main, ResponsiveContext } from 'grommet';
import { ContentArea } from '../../../components';

const demoContentStyle = {
  border: {
    style: 'dashed',
  },
};

const pageContainer = {
  wide: {
    align: 'center',
    width: {
      max: 'xxlarge', // 1536 --> needs to adjust to 1536 + 72
    },
  },
  narrow: {
    align: 'center',
    width: {
      max: 'large', // 768
    },
  },
  full: {
    align: 'start',
    width: {
      max: '100%',
    },
  },
  gap: {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'medium',
    xlarge: 'medium',
  },
  pad: {
    xsmall: { horizontal: 'medium', vertical: 'medium' },
    small: { horizontal: 'large', vertical: 'medium' },
    medium: { horizontal: 'medium', vertical: 'medium' },
    large: { horizontal: 'large', vertical: 'medium' },
    xlarge: { horizontal: 'large', vertical: 'medium' },
  },
};

const gridGap = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'small',
  large: 'medium',
  xlarge: 'medium',
};

const columns = {
  xsmall: 'auto',
  small: 'auto',
  medium: [
    ['medium', 'flex'],
    ['small', 'medium'],
  ],
  large: [
    ['medium', 'flex'],
    ['medium', 'auto'],
  ],
  xlarge: [
    ['medium', 'flex'],
    ['medium', 'auto'],
  ],
};

const contents = {
  xsmall: {
    column1: [
      <ContentArea title="1" border />,
      <ContentArea title="2" border />,
      <ContentArea title="3" border />,
      <ContentArea title="4" border />,
      <ContentArea title="5" border />,
    ],
  },
  small: {
    column1: [
      <ContentArea title="1" border />,
      <ContentArea title="2" border />,
      <ContentArea title="3" border />,
      <ContentArea title="4" border />,
      <ContentArea title="5" border />,
    ],
  },
  medium: {
    column1: [
      <ContentArea title="2" border />,
      <ContentArea title="3" border />,
    ],
    column2: [
      <ContentArea title="1" border />,
      <ContentArea title="4" border />,
      <ContentArea title="5" border />,
    ],
  },
  large: {
    column1: [
      <ContentArea title="2" border />,
      <ContentArea title="3" border />,
    ],
    column2: [
      <ContentArea title="1" border />,
      <ContentArea title="4" border />,
      <ContentArea title="5" border />,
    ],
  },
  xlarge: {
    column1: [
      <ContentArea title="2" border />,
      <ContentArea title="3" border />,
    ],
    column2: [
      <ContentArea title="1" border />,
      <ContentArea title="4" border />,
      <ContentArea title="5" border />,
    ],
  },
};

export const TwoColumnStatusQuo = () => {
  const pageContainerWidth = 'wide';
  const size = useContext(ResponsiveContext);
  const { align, width } = pageContainer[pageContainerWidth];
  const gap = pageContainer.gap[size];
  const pageContentPad = { horizontal: pageContainer.pad[size].horizontal };

  return (
    <Box
      alignSelf={align}
      fill
      gap={gap}
      margin="auto"
      width={width}
      {...demoContentStyle}
    >
      <Header pad={pageContentPad} {...demoContentStyle}>
        <ContentArea title={`Page Header - ${size}`} border fill />
      </Header>
      <Main pad={pageContentPad} {...demoContentStyle} flex>
        <Grid columns={columns[size]} gap={gridGap[size]} {...demoContentStyle}>
          <Box gap={gridGap[size]} {...demoContentStyle}>
            {contents[size] && Children.toArray(contents[size].column1)}
          </Box>
          <Box gap={gridGap[size]} {...demoContentStyle}>
            {contents[size] && Children.toArray(contents[size].column2)}
          </Box>
        </Grid>
      </Main>
    </Box>
  );
};
