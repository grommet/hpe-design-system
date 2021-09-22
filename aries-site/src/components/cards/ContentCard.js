import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Card, CardBody, Image, Text } from 'grommet';
import { Identifier } from 'aries-core';
import { PreviewImageCard } from './PreviewCard';
import { useDarkMode } from '../../utils';

export const StyledCard = styled(Card)`
  transition: all 0.2s ease-in-out;
`;

export const ContentCard = forwardRef(({ topic, minimal, ...rest }, ref) => {
  const { description, name, parent, preview, render } = topic;
  const [isFocused, setIsFocused] = React.useState(false);
  const darkMode = useDarkMode();
  return (
    <StyledCard
      elevation={isFocused ? 'large' : 'medium'}
      fill
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      pad="medium"
      ref={ref}
      {...rest}
    >
      <CardBody gap="large">
        {!minimal && (
          <PreviewImageCard background={preview && preview.background}>
            {preview &&
              (preview.image && preview.image.src ? (
                <Image
                  src={
                    darkMode.value
                      ? preview.image.src.dark || preview.image.src
                      : preview.image.src.light || preview.image.src
                  }
                  alt={preview.image.alt}
                  fit={preview.image.fit || 'cover'}
                />
              ) : (
                preview.component && (
                  <Box
                    style={{ pointerEvents: 'none' }}
                    flex
                    justify={preview.justify || 'center'}
                    align="center"
                  >
                    {preview.component()}
                  </Box>
                )
              ))}
          </PreviewImageCard>
        )}
        <Box gap="small">
          <Identifier
            title={render || name}
            align="start"
            gap="xsmall"
            size="xxlarge"
          >
            {parent && parent.icon && !minimal && (
              <Box direction="row" align="center" gap="xsmall">
                {parent.icon('small', parent.color)}
                <Text>{parent.name}</Text>
              </Box>
            )}
          </Identifier>
          <Text size="small">{description}</Text>
        </Box>
      </CardBody>
    </StyledCard>
  );
});

ContentCard.propTypes = {
  minimal: PropTypes.bool,
  topic: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      color: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
    }),
    preview: PropTypes.shape({
      background: PropTypes.string,
      justify: PropTypes.string,
      component: PropTypes.func,
      image: PropTypes.shape({
        alt: PropTypes.string,
        fit: PropTypes.string,
        src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      }),
    }),
    render: PropTypes.string,
  }),
};
