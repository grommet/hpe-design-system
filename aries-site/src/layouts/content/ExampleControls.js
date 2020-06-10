import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext } from 'grommet';
import { Document, Expand, Grommet, Figma } from 'grommet-icons';

export const ExampleControls = ({ designer, docs, figma, setShowLayer }) => {
  const size = useContext(ResponsiveContext);
  const isSmall = size === 'small';
  const buttonSize = isSmall ? 'small' : undefined;

  return (
    <Box
      direction={isSmall ? 'column-reverse' : 'row'}
      align="start"
      background="background-front"
      border={{
        side: 'top',
        color: 'background-back',
        size: 'xsmall',
      }}
      gap="medium"
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      round={{ corner: 'bottom', size: 'small' }}
    >
      <Box direction="row" wrap>
        {designer && (
          <Box flex={false}>
            <Button
              href={designer}
              icon={<Grommet color="plain" />}
              label="Open in Grommet Designer"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {figma && (
          <Box flex={false}>
            <Button
              href={figma}
              icon={<Figma color="plain" />}
              label="Open in Figma"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
        {docs && (
          <Box flex={false}>
            <Button
              href={docs}
              icon={<Document />}
              label="Open docs"
              target="_blank"
              size={buttonSize}
            />
          </Box>
        )}
      </Box>
      <Box flex={false} alignSelf={isSmall ? 'end' : 'start'}>
        <Button
          icon={<Expand />}
          a11yTitle="See Fullscreen"
          label="See Fullscreen"
          onClick={() => setShowLayer(true)}
          size={buttonSize}
        />
      </Box>
    </Box>
  );
};

ExampleControls.propTypes = {
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  setShowLayer: PropTypes.func,
};
