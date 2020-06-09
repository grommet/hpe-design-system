import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, ResponsiveContext } from 'grommet';
import { Document, Expand, Grommet, Figma } from 'grommet-icons';

export const ExampleControls = ({ designer, docs, figma, setShowLayer }) => {
  const size = useContext(ResponsiveContext);
  const buttonSize = size !== 'small' ? undefined : 'small';

  return (
    <Box
      direction="row"
      align="start"
      background="background-front"
      border={{
        side: 'top',
        color: 'background-back',
        size: 'xsmall',
      }}
      justify="between"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      round={{ corner: 'bottom', size: 'small' }}
    >
      <Grid
        columns={{ count: 'fill', size: ['small', 'auto'] }}
        fill
        gap="xsmall"
        justify="start"
      >
        {designer && (
          <Button
            href={designer}
            icon={<Grommet color="plain" />}
            label="Open in Grommet Designer"
            target="_blank"
            size={buttonSize}
          />
        )}
        {figma && (
          <Button
            href={figma}
            icon={<Figma color="plain" />}
            label="Open in Figma"
            target="_blank"
            size={buttonSize}
          />
        )}
        {docs && (
          <Button
            href={docs}
            icon={<Document />}
            label="Open docs"
            target="_blank"
            size={buttonSize}
          />
        )}
      </Grid>
      <Box flex={false}>
        <Button
          icon={<Expand />}
          a11yTitle="See Fullscreen"
          label={size !== 'small' ? 'See Fullscreen' : undefined}
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
