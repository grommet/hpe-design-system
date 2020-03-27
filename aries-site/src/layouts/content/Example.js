import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Keyboard, Layer, Text, ThemeContext } from 'grommet';
import { Contract, Desktop } from 'grommet-icons';
import Prism from 'prismjs';
import {
  CollapsibleSection,
  IconMobile,
  SubsectionText,
} from '../../components';
import { ExampleControls } from '.';

const syntax = {
  dark: styled.pre`
    background: transparent;
    .string {
      color: #6c9;
    }
    .keyword {
      color: #c9c;
    }
    .function {
      color: #f93;
    }
    .operator {
      color: #6cc;
    }
    .tag {
      color: #f66;
    }
    .script {
      color: #ccc;
    }
    .punctuation {
      color: #ccc;
    }
    .attr-name {
      color: #6c9;
    }
    .attr-value {
      color: #c9c;
    }
  `,
  light: styled.pre`
    background: transparent;
    .string {
      color: #690;
    }
    .keyword {
      color: #069;
    }
    .function {
      color: #c66;
    }
    .operator {
      color: #963;
    }
    .tag {
      color: #906;
    }
    .script {
      color: #333;
    }
    .punctuation {
      color: #999;
    }
    .attr-name {
      color: #690;
    }
    .attr-value {
      color: #069;
    }
  `,
};

export const Example = ({
  children,
  code,
  designer,
  details,
  docs,
  figma,
  template,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const [codeOpen, setCodeOpen] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const [mobile, setMobile] = React.useState(false);
  const [showLayer, setShowLayer] = React.useState(false);
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

  return (
    <>
      <Box margin={{ vertical: 'small' }} gap="large">
        <Box>
          <Box
            align={!template ? 'center' : undefined}
            background="background-front"
            direction="row"
            // Height for template screen needs to be between medium and large
            // to maintain aspect ratio, so this is small + medium
            height={template ? '576px' : { min: '576px' }}
            justify="center"
            pad={template ? { horizontal: 'large', top: 'large' } : 'large'}
            round={
              designer || docs || figma || template
                ? { corner: 'top', size: 'small' }
                : 'small'
            }
            {...rest}
          >
            {children &&
              React.cloneElement(children, {
                mobile,
              })}
          </Box>
          {(designer || docs || figma || template) && (
            <ExampleControls
              designer={designer}
              docs={docs}
              figma={figma}
              template={template}
              setShowLayer={value => setShowLayer(value)}
            />
          )}
        </Box>
        <Box gap="medium">
          {details && (
            <CollapsibleSection label="Show Details">
              {details.map((item, index) => (
                <SubsectionText key={index} level={1}>
                  {item}
                </SubsectionText>
              ))}
            </CollapsibleSection>
          )}
          {code && (
            <CollapsibleSection
              label="Show Code"
              onClick={() => setCodeOpen(true)}
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
        </Box>
      </Box>
      {showLayer && (
        <Keyboard
          onEsc={() => {
            setShowLayer(false);
            setMobile(false);
          }}
        >
          <Layer full animation="fadeIn">
            <Box fill background="background-front">
              <Box
                direction="row"
                justify={template ? 'between' : 'end'}
                pad="xxsmall"
                background="#111"
              >
                {template && (
                  <Box direction="row">
                    <Box
                      title="Desktop layout"
                      background={!mobile ? 'background-contrast' : undefined}
                      direction="row"
                      pad="small"
                      align="center"
                      gap="small"
                      onClick={() => setMobile(false)}
                    >
                      <Desktop />
                      <Text>Desktop</Text>
                    </Box>
                    <Box
                      title="Mobile layout"
                      background={mobile ? 'background-contrast' : undefined}
                      direction="row"
                      pad="small"
                      align="center"
                      gap="small"
                      onClick={() => setMobile(true)}
                    >
                      <IconMobile />
                      <Text>Mobile</Text>
                    </Box>
                  </Box>
                )}
                <Button
                  title="Leave full screen"
                  icon={<Contract />}
                  onClick={() => {
                    setShowLayer(false);
                    setMobile(false);
                  }}
                  hoverIndicator
                />
              </Box>
              <Box
                direction="row"
                justify="center"
                align={!template ? 'center' : undefined}
                flex
                {...rest}
              >
                {children &&
                  React.cloneElement(children, {
                    mobile,
                  })}
              </Box>
            </Box>
          </Layer>
        </Keyboard>
      )}
    </>
  );
};

Example.propTypes = {
  children: PropTypes.element,
  code: PropTypes.string,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  details: PropTypes.arrayOf(PropTypes.string),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  template: PropTypes.bool,
};
