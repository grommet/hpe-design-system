const departments = [
  'Finance',
  'Legal',
  'Engineering',
  'Design',
  'Human Resources',
];

const environments = ['Test', 'Development', 'Production'];

const timezones = ['PST', 'MST', 'EST', 'AET', 'ART', 'BRT', 'GFT'];

const locations = ['NY_US', 'SF_US', 'PAR_FR', 'MD_ES', 'BAR_ES', 'BUD_HU'];

export const tagData = {
  departments: {
    displayName: 'Department',
    options: departments,
  },
  environments: {
    displayName: 'Environment',
    options: environments,
  },
  timezones: {
    displayName: 'Time Zone',
    options: timezones,
  },
  locations: {
    displayName: 'Location',
    options: locations,
  },
};
