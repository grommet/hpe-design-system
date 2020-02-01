import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Drop, Text } from 'grommet';
import { Code, Document, Template } from 'grommet-icons';
import Prism from 'prismjs';

import { colors } from '../../themes/aries';

const IconButton = ({ title, ...rest }) => {
  const ref = React.useRef();
  const [hover, setHover] = React.useState();

  React.useEffect(() => {
    if (!hover) return undefined;
    const timer = setTimeout(() => setHover(false), 2000);
    return () => clearTimeout(timer);
  }, [hover]);

  return (
    <>
      <Button
        ref={ref}
        hoverIndicator
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={hover ? undefined : title}
        {...rest}
      />
      {hover && (
        <Drop
          target={ref.current}
          align={{ bottom: 'top', right: 'right' }}
          plain
          stretch={false}
        >
          <Box
            background={colors['background-contrast']}
            border="bottom"
            round="xsmall"
            pad="small"
          >
            <Text truncate>{title}</Text>
          </Box>
        </Drop>
      )}
    </>
  );
};

IconButton.propTypes = {
  title: PropTypes.string,
};

export const Example = ({
  code,
  docs,
  figma,
  ...rest
}) => {
  const [showCode, setShowCode] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const codeRef = React.useRef();

  React.useEffect(() => {
    if (showCode && !codeText) {
      setCodeText('loading');
      fetch(code)
        .then(response => response.text())
        .then(text => setCodeText(text));
    } else if (showCode && codeText) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, codeText, showCode]);

  return (
    <Box margin={{ vertical: 'small' }}>
      <Box
        direction="row"
        background={colors['background-front']}
        pad="large"
        {...rest}
      />
      {(code || docs || figma) && (
        <Box direction="row" justify="end" gap="xsmall">
          {figma && (
            <IconButton
              title="Design Templates"
              icon={<Template />}
              hoverIndicator
              href={figma}
              target="_blank"
            />
          )}
          {docs && (
            <IconButton
              title="Component Properties"
              icon={<Document />}
              hoverIndicator
              href={docs}
              target="_blank"
            />
          )}
          {code && (
            <IconButton
              title="Code"
              icon={<Code />}
              hoverIndicator
              onClick={() => setShowCode(!showCode)}
            />
          )}
        </Box>
      )}
      {showCode && (
        <Box border background="background-contrast" pad="medium">
          <Text size="xsmall" color="text">
            <pre style={{ background: 'transparent' }}>
              <code ref={codeRef} className="language-jsx">
                {showCode && codeText}
              </code>
            </pre>
          </Text>
        </Box>
      )}
    </Box>
  );
};

Example.propTypes = {
  code: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
};
