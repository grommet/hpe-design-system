import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, CardBody, Image, Tag, Text } from 'grommet';
import { Identifier } from 'aries-core';
import { PreviewImageCard } from './PreviewCard';
import { LinkCard } from './LinkCard';
import { useDarkMode } from '../../utils';

export const ContentCard = forwardRef(
  ({ topic, developer, minimal, ...rest }, ref) => {
    const { description, name, parent, preview, render, topics } = topic;
    const darkMode = useDarkMode();
    return (
      <LinkCard fill pad="medium" ref={ref} {...rest}>
        <CardBody gap="large" pad={!developer ? 'small' : undefined}>
          {!minimal && !developer && (
            <PreviewImageCard
              pad={preview?.pad || 'none'}
              background={preview?.background}
            >
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
              size={developer ? 'medium' : 'xxlarge'}
              developer={developer}
            >
              {parent && parent.icon && !minimal && !developer && (
                <Box direction="row" align="center" gap="xsmall">
                  {parent.icon('small', parent.color)}
                  <Text>{parent.name}</Text>
                </Box>
              )}
            </Identifier>
            {description && (
              <Text size="small" color={developer ? 'text-weak' : 'text'}>
                {description}
              </Text>
            )}
            {developer && (
              <Box direction="row" gap="xsmall" wrap>
                {topics?.map(t => (
                  <Tag
                    alignSelf="start"
                    value={t}
                    size="xsmall"
                    margin={{ bottom: 'xsmall' }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </CardBody>
      </LinkCard>
    );
  },
);

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

ContentCard.propTypes = {
  developer: PropTypes.bool,
  minimal: PropTypes.bool,
  topic: PropTypes.shape({
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
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
      pad: PropTypes.oneOfType([
        PropTypes.oneOf(['none', ...PAD_SIZES]),
        PropTypes.shape({
          bottom: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          end: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          horizontal: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          left: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          right: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          start: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          top: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
          vertical: PropTypes.oneOfType([
            PropTypes.oneOf(PAD_SIZES),
            PropTypes.string,
          ]),
        }),
        PropTypes.string,
      ]),
    }),
    render: PropTypes.string,
  }),
};
