import React, { useContext } from 'react';
import { Box, Button, Grid, ResponsiveContext } from 'grommet';
import { LinkCard } from '../../../components';

const guides = [
  {
    title: 'Complex Images in Software',
    link:
      'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EYWU1LUDz8xLhVu-omWEYpwB9ZcpjszrA0hMC7vjSx5jiA?e=EctwhC',
  },
  {
    title: 'Links and HyperLinks',
    link:
      'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EXN7DvqsNvBEmfKD1ScESIMBBqFCSjtygi79PSQwJ_jWFQ?e=YnAjhe',
  },
  {
    title: 'Evaluation Tools and Toolbars',
    link:
      'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbNhmRbHK6BCsiyLbRRNaE0BQZQlM3D2lVM60cL3nPR67g?e=dgfrFs',
  },
  {
    title: 'Documentation to Inform and Enable',
    link:
      'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbKbkBd8q2NLkmc2KKz5j_4BnuVCs6voFzhH2KwKuqFFIQ?e=ZcMBfn',
  },
];

const videos = [
  {
    title: 'Designing Accessible Software',
    link:
      'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05%2D71a0%2D49cf%2D8daf%2De7bc7c0c920d&vid=7f47a741%2D9bfe%2D40d0%2Db084%2D01f41fe12cc0&from=1',
  },
  {
    title: 'Layout and Page Structure',
    link:
      'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05-71a0-49cf-8daf-e7bc7c0c920d&vid=1edcc9f5-9192-49d3-a139-6b695a098695&from=1',
  },
  {
    title: 'Understanding Keyboard Design',
    link:
      'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05%2D71a0%2D49cf%2D8daf%2De7bc7c0c920d&vid=5989e0ea%2D716e%2D42f0%2Da4f0%2Dca9944b20c07&from=1',
  },
  {
    title: 'Tab Order and on-Screen Focus',
    link:
      'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbKbkBd8q2NLkmc2KKz5j_4BnuVCs6voFzhH2KwKuqFFIQ?e=ZcMBfn',
  },
];

const SectionCards = ({ items, type }) => {
  const size = useContext(ResponsiveContext);
  const href = type === 'guides' ? 
    'https://hpe.sharepoint.com/sites/f5/cto/office/Accessibility/Pages/accessible-web-software-and-hardware-design.aspx' :
    'https://hpe.sharepoint.com/sites/f5/cto/office/Accessibility/Pages/accessible-design-training.aspx';
  
  return (
    <Box gap="large">
      <Grid
        columns={size !== 'small' ? 'medium' : '100%'}
        rows="auto"
        gap="medium"
      >
        {items.map(item => (
          <LinkCard type={type} key={item.title} title={item.title} link={item.link} />
        ))}
      </Grid>
      <Button
        alignSelf="start"
        href={href}
        label={`View all ${type}`}
        size="large"
        target="_blank"
        rel="noreferrer noopener"
        secondary
      />
    </Box>
  );
};

export const GuideSection = () => <SectionCards type="guides" items={guides} />
export const VideoSection = () => <SectionCards type="videos" items={videos} />
