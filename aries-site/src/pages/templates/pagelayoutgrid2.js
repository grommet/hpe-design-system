import { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

// eslint-disable-next-line max-len
import { ContentArea } from '../../examples/templates/app-layouts/anatomy/components';

const PageLayoutGrid = () => {
  const size = useContext(ResponsiveContext);

  // Would this be better implemented in the theme's edgesize?
  // Depends on whether we'd abstract this implementation.
  const pageContainerPadding = {
    xsmall: 'medium',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  const columns = {
    xsmall: ['auto'],
    small: ['auto'], // Convert to single column layout at small breakpoint
    medium: [
      // Column 1, min width of 'medium' otherwise fill the available width
      ['medium', 'flex'],
      // Column 2, min width of 'small', max width of 'medium'
      ['small', 'medium'],
    ],
    large: [
      'flex', // Column 1, fill the available width
      'medium', // Column 2, fix the width of Column 2 at 'medium'
    ],
    xlarge: [
      'flex', // Column 1, fill the available width
      'medium', // Column 2, fix the width of Column 2 at 'medium'
    ],
  };

  return (
    <ContentArea
      title={`Page Container -- Responsive Breakpoint ${size.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
      )}`}
      gap="small"
      // height="large"
      pad={{ horizontal: pageContainerPadding[size], vertical: 'small' }}
    >
      <ContentArea title="Page Header" background="purple!" />
      <ContentArea title="Page Content" background="orange" pad="xxsmall">
        <Grid columns={columns[size]} gap="medium">
          {/* <ContentArea title="Column 1" border={{ style: 'dotted' }}> */}
          <Grid rows="auto" gap="medium">
            <ContentArea
              title="Content Area 1 -- (e.g. a status summary bar)"
              border={{ style: 'dotted' }}
              // height="xsmall"
            />
            <ContentArea
              title={`Content Area 2 -- (e.g. Data Table with search 
                  and filter controls)`}
              border={{ style: 'dotted' }}
              height="medium"
            />
          </Grid>
          {/* </ContentArea> */}
          {/* <ContentArea title="Column 2" border={{ style: 'dotted' }}> */}
          <ContentArea
            title="Content Area 2 -- (e.g. activity feed)"
            border={{ style: 'dotted' }}
            height="large"
          />
          {/* </ContentArea> */}
        </Grid>
      </ContentArea>
    </ContentArea>
  );
};

export default PageLayoutGrid;
