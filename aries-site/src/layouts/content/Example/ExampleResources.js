import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, ThemeContext } from 'grommet';
import { Copy } from '@hpe-design/icons-grommet';
// TODO replace with DS icon package when available
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

const defaultCopyTip = 'Copy code to clipboard';

const CopyCodeButton = ({ activeCode, code }) => {
  const [copyTip, setCopyTip] = React.useState(defaultCopyTip);

  const onCopy = () => {
    const duration = 2000;
    navigator.clipboard.writeText(`// ${getFileName(activeCode)}\n${code}`);
    setCopyTip('Copied!');
    const timer = setTimeout(() => {
      setCopyTip(defaultCopyTip);
    }, duration);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      a11yTitle={copyTip}
      tip={copyTip}
      icon={<Copy />}
      onClick={onCopy}
    />
  );
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

  const fetchCode = file => {
    setCodeText('loading...');
    fetch(file)
      .then(response => response.text())
      .then(text => setCodeText(text));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (codeOpen) {
        fetchCode(activeCode);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [activeCode, codeOpen]);

  if (horizontalLayout && code) {
    return (
      <Box height={{ max: 'medium' }} {...rest}>
        <Stack anchor="top-right">
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
          <CopyCodeButton activeCode={activeCode} code={codeText} />
        </Stack>
      </Box>
    );
  }
  return (
    <Box gap="medium" margin={{ top: 'xlarge' }}>
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
          label={{ closed: 'Show example code', open: 'Hide example code' }}
          onClick={() => setCodeOpen(!codeOpen)}
        >
          {Array.isArray(code) && (
            <Box direction="row" gap="xsmall" flex={false} wrap>
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
          <Stack anchor="top-right">
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
            <CopyCodeButton activeCode={activeCode} code={codeText} />
          </Stack>
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

CopyCodeButton.propTypes = {
  activeCode: PropTypes.string,
  code: PropTypes.string,
};
