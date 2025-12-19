import { Play } from '@hpe-design/icons-grommet';
import { SectionCards } from '../../../components/cards';

const videos = [
  {
    icon: Play,
    title: 'Designing Accessible Software',
    link: 'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05%2D71a0%2D49cf%2D8daf%2De7bc7c0c920d&vid=7f47a741%2D9bfe%2D40d0%2Db084%2D01f41fe12cc0&from=1',
  },
  {
    icon: Play,
    title: 'Layout and Page Structure',
    link: 'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05-71a0-49cf-8daf-e7bc7c0c920d&vid=1edcc9f5-9192-49d3-a139-6b695a098695&from=1',
  },
  {
    icon: Play,
    title: 'Understanding Keyboard Design',
    link: 'https://hpe.sharepoint.com/portals/hub/_layouts/15/PointPublishing.aspx?app=video&p=p&chid=33203c05%2D71a0%2D49cf%2D8daf%2De7bc7c0c920d&vid=5989e0ea%2D716e%2D42f0%2Da4f0%2Dca9944b20c07&from=1',
  },
  {
    icon: Play,
    title: 'Tab Order and on-Screen Focus',
    link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbKbkBd8q2NLkmc2KKz5j_4BnuVCs6voFzhH2KwKuqFFIQ?e=ZcMBfn',
  },
];

const videosSeeAllContent = {
  buttonLabel: 'View all videos',
  href: 'https://hpe.sharepoint.com/sites/f5/cto/office/Accessibility/Pages/accessible-design-training.aspx',
};

export const VideoSection = () => (
  <SectionCards
    headingLevel={3}
    headingSize="small"
    items={videos}
    seeAllContent={videosSeeAllContent}
  />
);
