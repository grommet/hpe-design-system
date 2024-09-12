import { useEffect, useState } from 'react';

const skeletonAnimation = [];

for (let index = 0; index < 20; index += 1) {
  const duration = 1000;
  skeletonAnimation.push({
    type: index % 2 === 0 ? 'fadeOut' : 'fadeIn',
    delay: index * duration,
    duration,
  });
}

const skeleton = {
  // animation: skeletonAnimation,
  colors: {
    dark: ['inherit', 'background-front', 'background-back'],
    light: ['inherit', 'background-front', 'background-back'],
  },
  depth: 3,
};

const cardAnimation = index => {
  return {
    type: 'fadeIn',
    delay: index * 75,
    duration: 700,
  };
};

const tableAnimation = 'fadeIn';

const useLoading = (timeout = 250) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, timeout);
    return () => clearTimeout(timer);
  });

  return loading ? skeletonAnimation : undefined;
};

export { cardAnimation, skeleton, tableAnimation, useLoading };
