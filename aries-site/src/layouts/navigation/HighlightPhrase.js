import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text, ThemeContext } from 'grommet';

export const HighlightPhrase = ({ children, phrase, ...rest }) => {
  const theme = useContext(ThemeContext);
  const regexp = new RegExp(phrase, 'ig');
  const matches = [...children.matchAll(regexp)];
  const nextPhrase = [];
  let nextIndex = 0;

  if (matches.length) {
    matches.forEach((match, index) => {
      nextPhrase.push(match.input.slice(nextIndex, match.index));
      nextIndex = match.index + match[0].length;
      nextPhrase.push(
        <Text
          key={index}
          weight="bolder"
          color={
            theme.dark
              ? theme.global.colors.yellow.light
              : theme.global.colors.blue.dark
          }
          {...rest}
        >
          {match.input.slice(match.index, match.index + match[0].length)}
        </Text>,
      );
      if (index + 1 === matches.length) {
        nextPhrase.push(match.input.slice(match.index + match[0].length));
      }
    });
  } else nextPhrase.push(children);

  return nextPhrase;
};

HighlightPhrase.propTypes = {
  children: PropTypes.string,
  phrase: PropTypes.string,
};
