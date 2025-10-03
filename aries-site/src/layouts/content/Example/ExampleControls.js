import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext } from 'grommet';
import {
  Document,
  DocumentText,
  Expand,
  Github,
  Grommet,
  Figma,
} from 'grommet-icons';

export const ExampleControls = ({
  componentName,
  designer,
  docs,
  figma,
  grommetSource,
  guidance,
  horizontalLayout,
  setFullscreen,
  showResponsiveControls,
}) => {
  const size = useContext(ResponsiveContext);
  const isSmall = ['xsmall', 'small'].includes(size);
  const buttonSize = isSmall ? 'small' : undefined;
  const fullscreenControl = !(horizontalLayout || showResponsiveControls);

  const boxProps = !horizontalLayout
    ? {
        background: 'background-contrast',
        border: [
          {
            side: 'vertical',
            color: 'border-weak',
          },
          {
            side: 'bottom',
            color: 'border-weak',
          },
        ],
        pad: { horizontal: 'medium', vertical: 'xsmall' },
      }
    : {
        pad: { vertical: 'xsmall' },
      };

  return (
    <Box
      direction={isSmall ? 'column-reverse' : 'row'}
      align="start"
      gap="medium"
      justify="between"
      round={{ corner: 'bottom', size: 'medium' }}
      {...boxProps}
    >
      <Box direction="row" wrap>
        {designer && (
          <Box flex={false}>
            <Button
              a11yTitle="Open in Grommet Designer"
              href={designer}
              icon={<Grommet color="plain" />}
              tip="Open in Grommet Designer"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {figma && (
          <Box flex={false}>
            <Button
              a11yTitle="Open in Figma"
              href={figma}
              icon={<Figma color="plain" />}
              tip="Open in Figma"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {docs && (
          <Box flex={false}>
            <Button
              a11yTitle={`Open ${componentName} docs`}
              href={docs}
              icon={<Document />}
              tip="Open docs"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {grommetSource && (
          <Box flex={false}>
            <Button
              a11yTitle={`View ${componentName} source code`}
              href={grommetSource}
              icon={<Github />}
              tip={`View ${componentName} source code`}
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {guidance && (
          <Box flex={false}>
            <Button
              a11yTitle="Read guidance"
              href={guidance}
              icon={<DocumentText />}
              tip="Read guidance"
              size={buttonSize}
            />
          </Box>
        )}
        {horizontalLayout && (
          <FullscreenButton
            buttonSize={buttonSize}
            horizontalLayout={horizontalLayout}
            setFullscreen={setFullscreen}
          />
        )}
      </Box>
      {fullscreenControl && (
        <Box flex={false} alignSelf={isSmall ? 'end' : 'start'}>
          <FullscreenButton
            buttonSize={buttonSize}
            horizontalLayout={horizontalLayout}
            setFullscreen={setFullscreen}
          />
        </Box>
      )}
    </Box>
  );
};

ExampleControls.propTypes = {
  componentName: PropTypes.string,
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  grommetSource: PropTypes.string,
  guidance: PropTypes.string,
  horizontalLayout: PropTypes.bool,
  setFullscreen: PropTypes.func,
  showResponsiveControls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const FullscreenButton = ({ buttonSize, setFullscreen }) => (
  <Button
    icon={<Expand />}
    a11yTitle="See Fullscreen"
    tip="See Fullscreen"
    onClick={() => setFullscreen(true)}
    size={buttonSize}
  />
);

FullscreenButton.propTypes = {
  buttonSize: PropTypes.string,
  setFullscreen: PropTypes.func,
};
