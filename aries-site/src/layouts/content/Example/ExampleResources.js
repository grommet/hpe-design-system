import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import { Box, Button, Text, ThemeContext } from 'grommet';
import { Github } from 'grommet-icons';
import {
  CardGrid,
  CollapsibleSection,
  SubsectionText,
} from '../../../components';
import { getPageDetails } from '../../../utils';
import { syntax } from '.';

const getRelatedCards = names =>
  names.sort().map(pattern => getPageDetails(pattern));

const getFileName = file => {
  const adjustedFileName = file.split('/');
  return adjustedFileName[adjustedFileName.length - 1];
};

export const ExampleResources = ({
  code,
  details,
  github,
  horizontalLayout,
  relevantComponents,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  const [codeOpen, setCodeOpen] = React.useState(
    horizontalLayout ? true : undefined,
  );
  const [activeCode, setActiveCode] = React.useState(
    Array.isArray(code) ? code[0] : code,
  );
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const codeRef = React.useRef();

  const fetchCode = file => {
    setCodeText('loading');
    fetch(file)
      .then(response => response.text())
      .then(text => setCodeText(text));
  };

  React.useEffect(() => {
    if (codeOpen) {
      fetchCode(activeCode);
    }
  }, [activeCode, codeOpen]);

  React.useEffect(() => {
    if (codeOpen && !codeText && activeCode) {
      fetchCode(activeCode);
    } else if (codeOpen && codeText) {
      // https://betterstack.dev/blog/code-highlighting-in-react-using-prismjs/
      // setTimeout runs this after the DOM has updated which ensures
      // ref is defined
      setTimeout(() => {
        Prism.highlightElement(codeRef.current);
      }, 0);
    }
  }, [activeCode, codeText, codeOpen, Syntax]);

  // Set the Syntax component after highlightElement. This will cause
  // highlightElement to be re-run when Sytanx changes. This is needed
  // so the styling change is rendered.
  React.useEffect(() => setSyntax(syntax[theme.dark ? 'dark' : 'light']), [
    theme.dark,
  ]);

  if (horizontalLayout && code) {
    return (
      <Box
        background="background-contrast"
        height={{ max: 'medium' }}
        overflow="auto"
        pad="medium"
        round="small"
        {...rest}
      >
        <Text size="xsmall" color="text">
          <Syntax>
            <code ref={codeRef} className="language-jsx">
              {codeText}
            </code>
          </Syntax>
        </Text>
      </Box>
    );
  }
  return (
    <Box gap="medium" margin={{ top: 'large' }}>
      {details && (
        <CollapsibleSection
          label={{ closed: 'Show Details', open: 'Hide Details' }}
        >
          {details.map((item, index) => (
            <SubsectionText key={index} level={1}>
              {item}
            </SubsectionText>
          ))}
        </CollapsibleSection>
      )}
      {code && (
        <CollapsibleSection
          label={{ closed: 'Show Code', open: 'Hide Code' }}
          onClick={() => setCodeOpen(!codeOpen)}
        >
          {Array.isArray(code) && (
            <Box direction="row" gap="small" flex={false} wrap>
              {code.map((file, index) => (
                <Button
                  active={activeCode === file}
                  key={index}
                  label={getFileName(file)}
                  onClick={() => setActiveCode(file)}
                />
              ))}
              {github && (
                <Button
                  label="View in Github"
                  icon={<Github />}
                  href={github}
                  target="_blank"
                />
              )}
            </Box>
          )}
          <Text size="xsmall" color="text">
            <Syntax>
              <code ref={codeRef} className="language-jsx">
                {codeText}
              </code>
            </Syntax>
          </Text>
        </CollapsibleSection>
      )}
      {relevantComponents && (
        <CollapsibleSection
          label={{
            closed: 'Show Relevant Components',
            open: 'Hide Relevant Components',
          }}
        >
          <CardGrid cards={getRelatedCards(relevantComponents)} minimal />
        </CollapsibleSection>
      )}
    </Box>
  );
};

ExampleResources.propTypes = {
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  details: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  horizontalLayout: PropTypes.bool,
  github: PropTypes.string,
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
};
