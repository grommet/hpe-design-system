// these pages do not necessarily have their own routes but instead
// link to sections of existing pages

const comingSoon = '"Coming Soon" text next to a clock icon.';

export const contentLayouts = [
  {
    name: 'Single Column - Wizard',
    category: 'Single Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
  {
    name: 'Single Column - Chart + Table',
    category: 'Single Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
  {
    name: '2 Column - Dashboard',
    category: '2 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/2col-dashboard.svg',
          dark: '/templateImages/2col-dashboard-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
    href: '/templates/dashboards#two-column-dashboard',
  },
  {
    name: '2 Column - Wizard',
    category: '2 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
  {
    name: '2 Column - Table + NameValueList',
    category: '2 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
  {
    name: '3 Column - Dashboard',
    category: '3 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
  {
    name: 'Multi-column - Dashboard',
    category: 'Multi-column',
    preview: {
      image: {
        src: {
          light: '/templateImages/coming-soon.svg',
          dark: '/templateImages/coming-soon-invert.svg',
        },
        alt: comingSoon,
        fit: 'contain',
      },
    },
  },
];
