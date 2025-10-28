import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, CardBody, Image, Text } from 'grommet';
import { Identifier } from 'aries-core';
import { PreviewImageCard } from './PreviewCard';
import { LinkCard } from './LinkCard';
import { useDarkMode } from '../../utils';
import { pageVisitTracker } from '../../utils/pageVisitTracker';
import { NotificationTag } from '../../layouts/content/NotificationTag';
import { ViewContext } from '../../pages/_app';

export const ContentCard = forwardRef(
  ({ level, topic, minimal, size, ...rest }, ref) => {
    const { description, name, parent, preview, render } = topic;
    const darkMode = useDarkMode();

    const { contentHistory } = useContext(ViewContext);
    let showUpdate = false;
    let changeKind;
    if (contentHistory && name in contentHistory) {
      // still run pageVisitTracker on it
      showUpdate = pageVisitTracker(name, contentHistory);
      changeKind = contentHistory[name].changeKind;
    }

    return (
      <LinkCard fill pad="medium" ref={ref} {...rest}>
        <CardBody gap="xlarge">
          {!minimal && (
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
          <Box gap="xsmall">
            <Identifier
              title={render || name}
              align="start"
              gap="3xsmall"
              level={level}
              size="small"
            >
              {parent && parent.icon && !minimal && (
                <Box
                  direction="row"
                  align="center"
                  fill="horizontal"
                  justify="between"
                >
                  <Box gap="3xsmall" direction="row" align="center">
                    {parent.icon('small', parent.color)}
                    <Text>{parent.name}</Text>
                  </Box>
                  {showUpdate && changeKind === 'Update' && (
                    <NotificationTag
                      backgroundColor="decorative-cyan"
                      a11yTitle={`There have been updates for ${
                        render || name
                      }`}
                      value="Updated"
                      size="small"
                    />
                  )}
                  {showUpdate && changeKind === 'New' && (
                    <NotificationTag
                      backgroundColor="decorative-purple"
                      a11yTitle={`There's a new item called ${render || name}`}
                      value="New!"
                      size="small"
                    />
                  )}
                </Box>
              )}
            </Identifier>
            {description && <Text size="small">{description}</Text>}
          </Box>
        </CardBody>
      </LinkCard>
    );
  },
);

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

ContentCard.propTypes = {
  size: PropTypes.string,
  level: PropTypes.number,
  minimal: PropTypes.bool,
  topic: PropTypes.shape({
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
