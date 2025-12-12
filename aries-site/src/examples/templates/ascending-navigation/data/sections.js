import { Announce, Help, Template } from '@hpe-design/icons-grommet';

export const sections = [
  { id: 'overview', label: 'Overview', icon: <Announce size="small" /> },
  { id: 'components', label: 'Components', icon: <Template size="small" /> },
  { id: 'help', label: 'Help', icon: <Help size="small" /> },
];

export const sectionConfig = {
  home: { label: 'Home', subtitle: 'HPE Design System demo.' },
  overview: { label: 'Overview', subtitle: 'This is the overview section.' },
  components: {
    label: 'Components',
    subtitle: 'This is the components section.',
  },
  help: { label: 'Help', subtitle: 'This is the help section.' },
};
