// these pages do not necessarily have their own routes but instead
// link to sections of existing pages

const comingSoon = '"Coming Soon" text next to a clock icon.';

export const formLayouts = [
  {
    name: 'Full Page Form Example',
    available: false,
    cardOrder: 1,
    category: 'Forms',
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
