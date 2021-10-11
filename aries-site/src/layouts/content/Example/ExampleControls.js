import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext } from 'grommet';
import {
  Code,
  Document,
  DocumentText,
  Expand,
  Grommet,
  Figma,
} from 'grommet-icons';

export const ExampleControls = ({
  componentCode,
  designer,
  docs,
  figma,
  guidance,
  horizontalLayout,
  setShowLayer,
}) => {
  const size = useContext(ResponsiveContext);
  const isSmall = size === 'small';
  const buttonSize = isSmall ? 'small' : undefined;

  const boxProps = !horizontalLayout
    ? {
        background: 'background-front',
        border: {
          side: 'top',
          color: 'background-back',
          size: 'xsmall',
        },
        pad: { horizontal: 'medium', vertical: 'small' },
      }
    : {
        pad: { vertical: 'small' },
      };

  return (
    <Box
      direction={isSmall ? 'column-reverse' : 'row'}
      align="start"
      gap="medium"
      justify="between"
      round={{ corner: 'bottom', size: 'small' }}
      {...boxProps}
    >
      <Box direction="row" wrap>
        {designer && (
          <Box flex={false}>
            <Button
              title="Open in Grommet Designer"
              a11yTitle="Open in Grommet Designer"
              href={designer}
              icon={<Grommet color="plain" />}
              label={!horizontalLayout && 'Open in Grommet Designer'}
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {figma && (
          <Box flex={false}>
            <Button
              title="Open in Figma"
              a11yTitle="Open in Figma"
              href={figma}
              icon={<Figma color="plain" />}
              label={!horizontalLayout && 'Open in Figma'}
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {docs && (
          <Box flex={false}>
            <Button
              title="Open docs"
              a11yTitle="Open docs"
              href={docs}
              icon={<Document />}
              label={!horizontalLayout && 'Open docs'}
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {componentCode && (
          <Box flex={false}>
            <Button
              title="View component code"
              a11yTitle="View component code"
              href={componentCode}
              icon={<Code />}
              label={!horizontalLayout && 'View component code'}
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {guidance && (
          <Box flex={false}>
            <Button
              title="Read guidance"
              a11yTitle="Read guidance"
              href={guidance}
              icon={<DocumentText />}
              label={!horizontalLayout && 'Read guidance'}
              size={buttonSize}
            />
          </Box>
        )}
        {horizontalLayout && (
          <FullscreenButton
            buttonSize={buttonSize}
            horizontalLayout={horizontalLayout}
            setShowLayer={setShowLayer}
          />
        )}
      </Box>
      {!horizontalLayout && (
        <Box flex={false} alignSelf={isSmall ? 'end' : 'start'}>
          <FullscreenButton
            buttonSize={buttonSize}
            horizontalLayout={horizontalLayout}
            setShowLayer={setShowLayer}
          />
        </Box>
      )}
    </Box>
  );
};

ExampleControls.propTypes = {
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  guidance: PropTypes.string,
  horizontalLayout: PropTypes.bool,
  setShowLayer: PropTypes.func,
};

const FullscreenButton = ({ buttonSize, horizontalLayout, setShowLayer }) => (
  <Button
    icon={<Expand />}
    a11yTitle="See Fullscreen"
    label={!horizontalLayout && 'See Fullscreen'}
    title="See Fullscreen"
    onClick={() => setShowLayer(true)}
    size={buttonSize}
  />
);

FullscreenButton.propTypes = {
  buttonSize: PropTypes.string,
  horizontalLayout: PropTypes.bool,
  setShowLayer: PropTypes.func,
};
