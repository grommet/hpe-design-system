import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Text } from 'grommet';

// Controls whether matched phrase stays highlighted or fades away
const HighlightedText = styled(Text)`
  ${({ fade, theme }) =>
    fade
      ? 'animation: fadeOut ease-out 3.5s;'
      : `color: ${
          theme.dark
            ? theme.global.colors.yellow.light
            : theme.global.colors.blue.dark
        };
        font-weight: bolder;`}

  @keyframes fadeOut {
    0% {
      color: ${({ theme }) =>
        theme.dark
          ? theme.global.colors.yellow.light
          : theme.global.colors.blue.dark};
    }
    100% {
      color: inherit;
    }
  }
`;

const findMatches = (content, regexp) => {
  let matches = [];
  if (typeof content === 'string') {
    matches = [...content.matchAll(regexp)];
  } else if (Array.isArray(content)) {
    content.forEach(item => {
      const temp = findMatches(item, regexp);
      if (temp.length) {
        matches = [...temp];
      }
    });
  } else {
    console.log(typeof content);
  }
  return matches;
};

export const HighlightPhrase = ({ children, fade = true, phrase, ...rest }) => {
  const { query } = useRouter();
  const nextPhrase = [];

  console.log(phrase, query.q);
  console.log(fade);
  if (phrase || query.q) {
    const regexp = new RegExp(phrase || query.q, 'ig');
    const matches = findMatches(children, regexp);
    console.log(matches);

    let nextIndex = 0;

    if (matches.length > 0) {
      matches.forEach((match, index) => {
        nextPhrase.push(match.input.slice(nextIndex, match.index));
        nextIndex = match.index + match[0].length;
        nextPhrase.push(
          <HighlightedText key={index} fade={fade} {...rest}>
            {match.input.slice(match.index, match.index + match[0].length)}
          </HighlightedText>,
        );
        if (index + 1 === matches.length) {
          nextPhrase.push(match.input.slice(match.index + match[0].length));
        }
      });
    }
  }
  // else nextPhrase.push(children);

  return nextPhrase.length > 0 ? nextPhrase : children;
};

HighlightPhrase.propTypes = {
  children: PropTypes.any,
  fade: PropTypes.bool,
  phrase: PropTypes.string,
};
