import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Drop, Text, ThemeContext } from 'grommet';
import { Briefcase, Code, Document, Template } from 'grommet-icons';
import Prism from 'prismjs';

const syntax = {
  dark: styled.pre`
    background: transparent;
    .string { color: #6c9; }
    .keyword { color: #c9c; }
    .function { color: #f93; }
    .operator { color: #6cc; }
    .tag { color: #f66; }
    .script { color: #ccc; }
    .punctuation { color: #ccc; }
    .attr-name { color: #6c9; }
    .attr-value { color: #c9c; }
  `,
  light: styled.pre`
    background: transparent;
    .string { color: #690; }
    .keyword { color: #069; }
    .function { color: #c66; }
    .operator { color: #963; }
    .tag { color: #906; }
    .script { color: #333; }
    .punctuation { color: #999; }
    .attr-name { color: #690; }
    .attr-value { color: #069; }
  `,
};

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
            background="background-contrast"
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

export const Example = ({ code, designer, docs, figma, ...rest }) => {
  const theme = React.useContext(ThemeContext);
  const [showCode, setShowCode] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
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
  }, [code, codeText, showCode, Syntax]);

  // Set the Syntax component after highlightElement. This will cause
  // highlightElement to be re-run when Sytanx changes. This is needed
  // so the styling change is rendered.
  React.useEffect(() => setSyntax(syntax[theme.dark ? 'dark' : 'light']), [
    theme.dark,
  ]);

  return (
    <Box margin={{ vertical: 'small' }}>
      <Box
        direction="row"
        background="background-front"
        pad="large"
        {...rest}
      />
      {(code || designer || docs || figma) && (
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
          {figma && (
            <IconButton
              title="Designer"
              icon={<Briefcase />}
              hoverIndicator
              href={designer}
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
            <Syntax>
              <code ref={codeRef} className="language-jsx">
                {showCode && codeText}
              </code>
            </Syntax>
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
