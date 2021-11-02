import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Paragraph, ThemeContext } from 'grommet';
import { Github } from 'grommet-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'grommet-theme-hpe';
import {
  CardGrid,
  CollapsibleSection,
  SubsectionText,
} from '../../../components';
import { getPageDetails } from '../../../utils';

const getRelatedCards = names =>
  names.sort().map(pattern => getPageDetails(pattern));

const getFileName = file => {
  const adjustedFileName = file.split('/');
  return adjustedFileName[adjustedFileName.length - 1];
};

export const ExampleResources = ({
  caption,
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

  const fetchCode = file => {
    setCodeText('loading...');
    fetch(file)
      .then(response => response.text())
      .then(text => setCodeText(text));
  };

  React.useEffect(() => {
    if (codeOpen) {
      fetchCode(activeCode);
    }
  }, [activeCode, codeOpen]);

  if (horizontalLayout && code) {
    return (
      <Box margin="0px" height={{ max: 'medium' }} round="small" {...rest}>
        <SyntaxHighlighter
          tabIndex="0"
          style={theme.dark ? prism.dark : prism.light}
          codeTagProps={{
            style: {
              fontSize: theme.text.small.size,
            },
          }}
          wrapLongLines
          language="javascript"
        >
          {codeText || 'loading...'}
        </SyntaxHighlighter>
      </Box>
    );
  }
  return (
    <Box gap="medium" margin={caption ? { top: 'small' } : { top: 'large' }}>
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
          label={{ closed: 'Show Example Code', open: 'Hide Example Code' }}
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
          <SyntaxHighlighter
            tabIndex="0"
            style={theme.dark ? prism.dark : prism.light}
            codeTagProps={{
              style: {
                fontSize: theme.text.small.size,
              },
            }}
            wrapLongLines
            language="javascript"
          >
            {codeText || 'loading...'}
          </SyntaxHighlighter>
        </CollapsibleSection>
      )}
      {caption && (
        <Box margin={{ bottom: 'medium' }}>
          <Paragraph size="small" margin="none">
            {caption}
          </Paragraph>
        </Box>
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
  caption: PropTypes.string,
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
