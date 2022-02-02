// these pages do not necessarily have their own routes but instead
// link to sections of existing pages
export const contentLayouts = [
  {
    name: 'Single Column - Wizard',
    category: 'Single Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/1col-wizard.svg',
          dark: '/templateImages/1col-wizard-invert.svg',
        },
        alt: `"Coming Soon" text atop low-fidelity wireframe depicting a single 
            column wizard.`,
        fit: 'contain',
      },
    },
  },
  {
    name: 'Single Column - Chart + Table',
    category: 'Single Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/1col-chart-table.svg',
          dark: '/templateImages/1col-chart-table-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a single 
            column layout.`,
        fit: 'contain',
      },
    },
  },
  {
    name: '2 Column - Dashboard',
    category: '2 Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/2col-dashboard.svg',
          dark: '/templateImages/2col-dashboard-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a two 
            column dashboard.`,
        fit: 'contain',
      },
    },
    href: '/templates/dashboards#two-column-dashboard',
  },
  {
    name: '2 Column - Wizard',
    category: '2 Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/2col-wizard.svg',
          dark: '/templateImages/2col-wizard-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a two 
            column wizard.`,
        fit: 'contain',
      },
    },
  },
  {
    name: '2 Column - Table + NameValueList',
    category: '2 Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/2col-nvl.svg',
          dark: '/templateImages/2col-nvl-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a two 
            column layout.`,
        fit: 'contain',
      },
    },
  },
  {
    name: '3 Column - Dashboard',
    category: '3 Column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/3col-dashboard.svg',
          dark: '/templateImages/3col-dashboard-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a three 
            column dashboard.`,
        fit: 'contain',
      },
    },
  },
  {
    name: 'Multi-column - Dashboard',
    category: 'Multi-column',
    preview: {
      background: 'background-front',
      image: {
        src: {
          light: '/templateImages/multicol-dashboard.svg',
          dark: '/templateImages/multicol-dashboard-invert.svg',
        },
        alt: `"Coming soon" text atop a lo-fi wireframe decpicting a multi 
            column dashboard.`,
        fit: 'contain',
      },
    },
  },
];
