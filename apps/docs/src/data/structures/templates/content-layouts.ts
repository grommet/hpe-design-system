// these pages do not necessarily have their own routes but instead
// link to sections of existing pages

const comingSoon = '"Coming Soon" text next to a clock icon.';

export const contentLayouts = [
  {
    name: 'Single Column - Wizard',
    available: false,
    cardOrder: 2,
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
    available: false,
    cardOrder: 5,
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
    available: true,
    cardOrder: 0,
    category: '2 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/2col-dashboard.svg',
          dark: '/templateImages/2col-dashboard-invert.svg',
        },
        alt: `Boxes of mixed-sizes representing dashboard content, 
        presented in two columns.`,
        fit: 'contain',
      },
    },
    href: '/templates/dashboards#two-column-dashboard',
  },
  {
    name: '2 Column - Wizard',
    available: false,
    cardOrder: 3,
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
    available: false,
    cardOrder: 6,
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
    available: true,
    cardOrder: 1,
    category: '3 Column',
    preview: {
      image: {
        src: {
          light: '/templateImages/3col-dashboard.svg',
          dark: '/templateImages/3col-dashboard-invert.svg',
        },
        alt: `Dashboard content represented by equal-sized boxes 
        organized in a three column by two row grid.`,
        fit: 'contain',
      },
    },
    href: '/templates/dashboards#three-column-dashboard',
  },
  {
    name: 'Multi-column - Dashboard',
    available: false,
    cardOrder: 4,
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
].sort((a, b) => {
  if (a.cardOrder < b.cardOrder) return -1;
  if (a.cardOrder > b.cardOrder) return 1;
  return 0;
});
