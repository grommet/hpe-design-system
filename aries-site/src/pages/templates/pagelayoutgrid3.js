import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';

// eslint-disable-next-line max-len
import { ContentArea } from '../../examples/templates/app-layouts/anatomy/components';
import { LayoutContainer } from '../../components';

const PageLayoutGrid = () => (
  <PageContainer kind="narrow" border={{ style: 'dashed' }}>
    <LayoutContainer gap="medium" columns={['small', ['small', 'flex']]}>
      <ContentArea title="1" />
      <ContentArea title="2" />
      <ContentArea title="3" />
    </LayoutContainer>
  </PageContainer>
);

// This pageContainer could/would/should be an object in a theme file.
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
  pad: {
    xsmall: { horizontal: 'medium', vertical: 'medium' },
    small: { horizontal: 'large', vertical: 'medium' },
    medium: { horizontal: 'medium', vertical: 'medium' },
    large: { horizontal: 'large', vertical: 'medium' },
    xlarge: { horizontal: 'large', vertical: 'medium' },
  },
};

const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);
  const { align, width } = pageContainer[kind];
  const { pad } = pageContainer;

  return (
    <Box
      alignSelf={align}
      pad={pad[size]}
      width={width}
      margin="auto"
      {...rest}
    />
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['wide', 'narrow', 'full']),
};

// const PageHeader = () => <Box>

// </Box>

export default PageLayoutGrid;
