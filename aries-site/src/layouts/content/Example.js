import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  Button,
  defaultProps,
  Keyboard,
  Layer,
  Text,
  ThemeContext,
  ResponsiveContext,
} from 'grommet';
import { Contract } from 'grommet-icons';
import Prism from 'prismjs';
import { CardGrid, CollapsibleSection, SubsectionText } from '../../components';
import { ExampleControls, ResponsiveControls } from '.';
import { getPageDetails } from '../../utils';

const getRelatedCards = names =>
  names.sort().map(pattern => getPageDetails(pattern));

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

export const screens = {
  desktop: 'desktop',
  mobile: 'mobile',
  laptop: 'laptop',
};

const BrowserWrapper = ({ screen, ...rest }) => {
  let width;
  if (screen === screens.laptop) width = 'large';
  else if (screen === screens.desktop) width = '100%';
  else width = 'medium';

  return (
    <Box
      margin={{ bottom: 'medium' }}
      elevation={screen !== screens.mobile ? 'medium' : undefined}
      round="xsmall"
      overflow="hidden"
      width={width}
    >
      {screen !== screens.mobile && (
        <Box
          direction="row"
          gap="xsmall"
          background="background-back"
          align="center"
          pad="small"
        >
          <Box round pad="xsmall" background="red" />
          <Box round pad="xsmall" background="yellow" />
          <Box round pad="xsmall" background="green" />
        </Box>
      )}
      <Box
        width={screen === screens.desktop ? 'large' : '100%'}
        margin="auto"
        {...rest}
      />
    </Box>
  );
};

BrowserWrapper.propTypes = {
  screen: PropTypes.string.isRequired,
};

export const Example = ({
  children,
  code,
  designer,
  details,
  docs,
  figma,
  height,
  layout,
  relevantComponents,
  showResponsiveControls,
  template,
  width,
  ...rest
}) => {
  const theme = React.useContext(ThemeContext);
  const [codeOpen, setCodeOpen] = React.useState();
  const [codeText, setCodeText] = React.useState();
  const [Syntax, setSyntax] = React.useState(syntax.dark);
  const [screen, setScreen] = React.useState(screens.laptop);
  const [showLayer, setShowLayer] = React.useState(false);
  const codeRef = React.useRef();

  const { small, medium } = defaultProps.theme.global.size;
  // Height for template screen needs to be between medium and large
  // to maintain aspect ratio, so this is small + medium
  const laptopHeight = `${parseInt(medium, 10) + parseInt(small, 10)}px`;
  // To demonstrate really wide displays, we need to cut the height slightly
  const desktopHeight = `${
    (parseInt(medium, 10) + parseInt(small, 10)) * 0.9
  }px`;

  let exampleHeight;
  if (template || layout) {
    if (screen !== screens.desktop) exampleHeight = laptopHeight;
    else exampleHeight = desktopHeight;
  } else {
    exampleHeight = height;
  }

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
          {/* For use with templates or page layouts to toggle between laptop,
           ** desktop, and mobile views */}
          {showResponsiveControls && (
            <ResponsiveControls onSetScreen={setScreen} screen={screen} />
          )}
          <Box
            align={!template && !layout ? 'center' : undefined}
            background="background-front"
            direction="row"
            height={exampleHeight}
            justify="center"
            margin={showResponsiveControls ? { top: 'xsmall' } : undefined}
            pad={
              template || layout
                ? { horizontal: 'large', top: 'large' }
                : 'large'
            }
            round={
              designer || docs || figma || layout || template
                ? { corner: 'top', size: 'small' }
                : 'small'
            }
            {...rest}
          >
            {layout ? (
              // show page layouts inside of mock browser screen to demonstrate
              // how content fills or is restricted at various widths
              <BrowserWrapper screen={screen}>
                <ResponsiveContext.Provider
                  value={screen === screens.mobile && 'small'}
                >
                  {children}
                </ResponsiveContext.Provider>
              </BrowserWrapper>
            ) : (
              <Box width={width}>
                <ResponsiveContext.Provider
                  value={screen === screens.mobile && 'small'}
                >
                  {children}
                </ResponsiveContext.Provider>
              </Box>
            )}
          </Box>
          {(designer || docs || figma || layout || template) && (
            <ExampleControls
              designer={designer}
              docs={docs}
              figma={figma}
              setShowLayer={value => setShowLayer(value)}
            />
          )}
        </Box>
        <Box gap="medium">
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
      </Box>
      {showLayer && (
        <Keyboard
          onEsc={() => {
            setShowLayer(false);
            setScreen(screens.laptop);
          }}
        >
          <Layer full animation="fadeIn">
            <Box fill background="background-front">
              <Box
                direction="row"
                justify={template || layout ? 'between' : 'end'}
                pad="xxsmall"
                background="#111"
              >
                {(template || layout) && (
                  <ResponsiveControls onSetScreen={setScreen} screen={screen} />
                )}
                <Button
                  title="Leave full screen"
                  icon={<Contract />}
                  onClick={() => {
                    setShowLayer(false);
                    setScreen(screens.laptop);
                  }}
                  hoverIndicator
                />
              </Box>
              <Box
                direction="row"
                justify="center"
                align={!template && !layout ? 'center' : undefined}
                flex
                {...rest}
              >
                {layout ? (
                  <Box width={screen === screens.mobile ? 'medium' : '100%'}>
                    <ResponsiveContext.Provider
                      value={screen === screens.mobile && 'small'}
                    >
                      {children}
                    </ResponsiveContext.Provider>
                  </Box>
                ) : (
                  <ResponsiveContext.Provider
                    value={screen === screens.mobile && 'small'}
                  >
                    {children}
                  </ResponsiveContext.Provider>
                )}
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
  details: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  layout: PropTypes.bool,
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
  showResponsiveControls: PropTypes.bool,
  template: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Example.defaultProps = {
  height: { min: 'medium' },
};
