import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Text } from 'grommet';

// Controls whether matched phrase stays highlighted or fades away
// TODO change color
const HighlightedText = styled(Text)`
  ${({ fade, theme }) =>
    fade
      ? 'animation: fadeOut ease-out 4s;'
      : `color: ${
          theme.dark ? theme.global.colors.cyan : theme.global.colors.blue.dark
        };
        font-weight: bolder;`}

  @keyframes fadeOut {
    0% {
      color: inherit;
    }
    10% {
      color: ${({ theme }) =>
        theme.dark
          ? theme.global.colors['cyan!']
          : theme.global.colors.blue.light};
    }
    40% {
      color: ${({ theme }) =>
        theme.dark ? theme.global.colors.cyan : theme.global.colors.blue.dark};
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
  }
  return matches;
};

const formatMatchedPhrase = (matchObj, highlightProps) => {
  const { fade, ...rest } = highlightProps;
  const nextPhrase = [];
  let nextIndex = 0;

  if (Array.isArray(matchObj)) {
    matchObj.forEach((match, index) => {
      nextPhrase.push(match.input.slice(nextIndex, match.index));
      nextIndex = match.index + match[0].length;
      nextPhrase.push(
        <HighlightedText key={index} fade={fade} {...rest}>
          {match.input.slice(match.index, match.index + match[0].length)}
        </HighlightedText>,
      );
      if (index + 1 === matchObj.length) {
        nextPhrase.push(match.input.slice(match.index + match[0].length));
      }
    });
  } else {
    console.warn(
      `Expecting matchObj to be an array, received ${typeof matchObj} instead.`,
    );
  }
  return nextPhrase;
};

const highlight = (children, regexp, highlightProps) => {
  let nextPhrase;

  if (typeof children === 'string') {
    const matches = findMatches(children, regexp);
    nextPhrase =
      matches.length > 0
        ? formatMatchedPhrase(matches, highlightProps)
        : children;
  }

  if (Array.isArray(children)) {
    nextPhrase = children.map(child =>
      highlight(child, regexp, highlightProps),
    );
  }

  if (children?.props?.children) {
    nextPhrase = {
      ...children,
      props: {
        ...children.props,
        children: highlight(children.props.children, regexp, highlightProps),
      },
    };
  }

  return nextPhrase;
};

export const HighlightPhrase = ({ children, fade = true, phrase, ...rest }) => {
  const { query } = useRouter();
  let nextPhrase;
  const highlightProps = { fade, ...rest };

  if (phrase || query.q) {
    const regexp = new RegExp(phrase || query.q, 'ig');
    nextPhrase = highlight(children, regexp, highlightProps);
  }

  return nextPhrase || children;
};

HighlightPhrase.propTypes = {
  children: PropTypes.any,
  fade: PropTypes.bool,
  phrase: PropTypes.string,
};

findMatches.propTypes = {
  content: PropTypes.string,
};
