import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Anchor,
  Box,
  Button,
  Keyboard,
  Layer,
  RadioButtonGroup,
  Text,
  ThemeContext,
} from 'grommet';
import { Contract, Desktop, Expand, FormDown, FormUp } from 'grommet-icons';
import Prism from 'prismjs';
import { IconMobile } from '../../components';

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
  docs,
  figma,
  template,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const [mobile, setMobile] = React.useState(false);
  const [showLayer, setShowLayer] = React.useState(false);
  const codeRef = React.useRef();

  React.useEffect(() => {
    if (open && !codeText) {
      setCodeText('loading');
      fetch(code)
        .then(response => response.text())
        .then(text => setCodeText(text));
    } else if (open && codeText) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, codeText, open, Syntax]);

  // Set the Syntax component after highlightElement. This will cause
  // highlightElement to be re-run when Sytanx changes. This is needed
  // so the styling change is rendered.
  React.useEffect(() => setSyntax(syntax[theme.dark ? 'dark' : 'light']), [
    theme.dark,
  ]);

  return (
    <>
      <Box margin={{ vertical: 'small' }}>
        <Box
          direction="row"
          background="background-front"
          pad="large"
          // Height for template screen needs to be between medium and large
          // to maintain aspect ratio, so this is small + medium
          height={template ? '576px' : undefined}
          {...rest}
        >
          {children &&
            React.cloneElement(children, {
              mobile,
            })}
        </Box>
        {(code || designer || docs || figma) && (
          <>
            <Box
              background="background-contrast"
              direction="row"
              justify="between"
            >
              <RadioButtonGroup
                name="radio"
                direction="row"
                gap="none"
                options={['Desktop', 'Mobile']}
                value={mobile ? 'Mobile' : 'Desktop'}
                onChange={event => setMobile(event.target.value === 'Mobile')}
              >
                {(option, { checked, hover }) => {
                  const Icon = option === 'Desktop' ? Desktop : IconMobile;
                  let background;
                  if (checked) background = 'background-front';
                  else if (hover) background = 'active-background';
                  else background = undefined;
                  const color = !checked ? 'text-xweak' : 'text';
                  return (
                    <Box
                      title={`${option} layout`}
                      background={background}
                      direction="row"
                      pad="small"
                      align="center"
                      gap="small"
                    >
                      <Icon color={color} />
                      <Text color={color}>{option}</Text>
                    </Box>
                  );
                }}
              </RadioButtonGroup>
              <Box direction="row">
                <Button
                  title="Expand full screen"
                  icon={<Expand />}
                  onClick={() => {
                    setShowLayer(true);
                  }}
                  hoverIndicator
                />
                <Button
                  title="More details"
                  plain
                  hoverIndicator
                  onClick={() => setOpen(!open)}
                >
                  <Box
                    pad={{ vertical: 'xsmall', horizontal: 'small' }}
                    direction="row"
                    gap="xsmall"
                    width="xsmall"
                    justify="end"
                  >
                    <Text>{open ? 'less' : 'more'}</Text>
                    {open ? <FormUp /> : <FormDown />}
                  </Box>
                </Button>
              </Box>
            </Box>
            {open && (
              <Box animation="fadeIn">
                <Box
                  border="top"
                  background="background-contrast"
                  pad="medium"
                  height={{ max: 'medium' }}
                  overflow="auto"
                >
                  <Text size="xsmall" color="text">
                    <Syntax>
                      <code ref={codeRef} className="language-jsx">
                        {codeText}
                      </code>
                    </Syntax>
                  </Text>
                </Box>
                <Box
                  direction="row"
                  justify="end"
                  border="between"
                  gap="medium"
                  pad={{ horizontal: 'medium', vertical: 'small' }}
                >
                  {figma && (
                    <Anchor label="figma" href={figma} target="_blank" />
                  )}
                  {designer && (
                    <Anchor label="designer" href={designer} target="_blank" />
                  )}
                  {docs && (
                    <Anchor label="properties" href={docs} target="_blank" />
                  )}
                </Box>
              </Box>
            )}
          </>
        )}
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
              <Box direction="row" justify="between" background="#111">
                <RadioButtonGroup
                  name="radio"
                  direction="row"
                  gap="none"
                  options={['Desktop', 'Mobile']}
                  value={mobile ? 'Mobile' : 'Desktop'}
                  onChange={event => setMobile(event.target.value === 'Mobile')}
                >
                  {(option, { checked, hover }) => {
                    const Icon = option === 'Desktop' ? Desktop : IconMobile;
                    let background;
                    if (checked) background = 'background-contrast';
                    else if (hover) background = 'background-contrast';
                    else background = undefined;
                    return (
                      <Box
                        title={`${option} layout`}
                        background={background}
                        direction="row"
                        pad="small"
                        align="center"
                        gap="small"
                      >
                        <Icon />
                        <Text>{option}</Text>
                      </Box>
                    );
                  }}
                </RadioButtonGroup>
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
              <Box direction="row" justify="center" flex {...rest}>
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
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  template: PropTypes.bool,
};
