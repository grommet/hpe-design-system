import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import { Box, Text, ThemeContext } from 'grommet';
import {
  CardGrid,
  CollapsibleSection,
  SubsectionText,
} from '../../../components';
import { getPageDetails } from '../../../utils';
import { syntax } from '.';

const getRelatedCards = names =>
  names.sort().map(pattern => getPageDetails(pattern));

export const ExampleResources = ({
  code,
  details,
  horizontalLayout,
  relevantComponents,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  const [codeOpen, setCodeOpen] = React.useState(
    horizontalLayout ? true : undefined,
  );
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const codeRef = React.useRef();

  React.useEffect(() => {
    if (codeOpen && !codeText) {
      setCodeText('loading');
      fetch(code)
        .then(response => response.text())
        .then(text => setCodeText(text));
    } else if (codeOpen && codeText) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, codeText, codeOpen, Syntax]);

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
          onClick={() => setCodeOpen(!codeOpen)}
        >
          <CardGrid cards={getRelatedCards(relevantComponents)} minimal />
        </CollapsibleSection>
      )}
    </Box>
  );
};

ExampleResources.propTypes = {
  code: PropTypes.string,
  details: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  horizontalLayout: PropTypes.bool,
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
};
