import React, { useContext } from 'react';
import { Button, Grid, ResponsiveContext } from 'grommet';
import { LinkCard } from '../../../components';

export const GuideCards = () => {
    const size = useContext(ResponsiveContext);

    const guides = [
      {
        title: 'Complex Images in Software',
        link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EYWU1LUDz8xLhVu-omWEYpwB9ZcpjszrA0hMC7vjSx5jiA?e=EctwhC',
      },
      {
        title: 'Links and HyperLinks',
        link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EXN7DvqsNvBEmfKD1ScESIMBBqFCSjtygi79PSQwJ_jWFQ?e=YnAjhe',
      },
      {
        title: 'Evaluation Tools and Toolbars',
        link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbNhmRbHK6BCsiyLbRRNaE0BQZQlM3D2lVM60cL3nPR67g?e=dgfrFs',
      },
      {
        title: 'Documentation to Inform and Enable ',
        link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbKbkBd8q2NLkmc2KKz5j_4BnuVCs6voFzhH2KwKuqFFIQ?e=ZcMBfn',
      },
    ];
    return (
      <>
        <Grid
          columns={size !== 'small' ? ['medium', 'auto'] : '100%'}
          rows="auto"
          gap="medium"
          pad={{ bottom: 'large' }}
        >
            {
                guides.map((item) => 
                    <LinkCard key={item.title} title={item.title} link={item.link}/>
                )
            }
        </Grid>
        <Button
          alignSelf="start"
          href="https://hpe.sharepoint.com/sites/f5/cto/office/Accessibility/Pages/accessible-web-software-and-hardware-design.aspx"
          label="View all guides"
          size="large"
          target="_blank"
          rel="noreferrer noopener"
          secondary
        />
      </>
    );
  };