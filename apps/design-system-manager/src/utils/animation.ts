const cardAnimation = (index: number) => {
  return {
    type: 'fadeIn',
    delay: index * 75,
    duration: 700
  }
}

const modeTransition = {
  animation: ({ delay }: { delay: number }) => [
    { type: 'fadeIn', delay: delay, duration: 700 },
  ],
  duration: 700
};

const skeletonAnimation = []

for (let index = 0; index < 20; index += 1) {
  const duration = 1000
  skeletonAnimation.push({
    type: index % 2 === 0 ? 'fadeOut' : 'fadeIn',
    delay: index * duration,
    duration
  })
}

const skeleton = {
  animation: skeletonAnimation,
  colors: {
    dark: ['inherit', 'background-front', 'background-back'],
    light: ['inherit', 'background-front', 'background-back']
  },
  depth: 3,
  message: { start: 'Loading...', end: 'Ready' }
}

const tableAnimation = 'fadeIn'

export { cardAnimation, modeTransition, skeleton, tableAnimation }