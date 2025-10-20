import { Link as LinkIcon } from '@hpe-design/icons-grommet';
import { SectionCards } from '../../../components/cards';

const guides = [
  {
    icon: LinkIcon,
    title: 'Complex Images in Software',
    link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EYWU1LUDz8xLhVu-omWEYpwB9ZcpjszrA0hMC7vjSx5jiA?e=EctwhC',
  },
  {
    icon: LinkIcon,
    title: 'Links and HyperLinks',
    link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EXN7DvqsNvBEmfKD1ScESIMBBqFCSjtygi79PSQwJ_jWFQ?e=YnAjhe',
  },
  {
    icon: LinkIcon,
    title: 'Evaluation Tools and Toolbars',
    link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbNhmRbHK6BCsiyLbRRNaE0BQZQlM3D2lVM60cL3nPR67g?e=dgfrFs',
  },
  {
    icon: LinkIcon,
    title: 'Documentation to Inform and Enable',
    link: 'https://hpe.sharepoint.com/:b:/s/F5/CTO/Office/Accessibility/EbKbkBd8q2NLkmc2KKz5j_4BnuVCs6voFzhH2KwKuqFFIQ?e=ZcMBfn',
  },
];

const guidesSeeAllContent = {
  buttonLabel: 'View all guides',
  href: 'https://hpe.sharepoint.com/sites/f5/cto/office/Accessibility/Pages/accessible-web-software-and-hardware-design.aspx',
};

export const GuideSection = () => (
  <SectionCards
    headingLevel={3}
    items={guides}
    seeAllContent={guidesSeeAllContent}
  />
);
