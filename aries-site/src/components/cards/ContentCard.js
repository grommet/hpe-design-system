import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, CardBody, Paragraph, ThemeContext } from 'grommet';
import { Identifier } from 'aries-core';
import { LinkCard } from './LinkCard';
import { pageVisitTracker } from '../../utils/pageVisitTracker';
import { NotificationTag } from '../../layouts/content/NotificationTag';
import { ViewContext } from '../../pages/_app';

export const ContentCard = forwardRef(
  ({ level, topic, minimal, ...rest }, ref) => {
    const { description, name, parent, render } = topic;

    const { contentHistory } = useContext(ViewContext);
    let showUpdate = false;
    let changeKind;
    if (contentHistory && name in contentHistory) {
      // still run pageVisitTracker on it
      showUpdate = pageVisitTracker(name, contentHistory);
      changeKind = contentHistory[name].changeKind;
    }

    return (
      <ThemeContext.Extend
        value={{
          card: {
            container: {
              elevation: 'none',
            },
            hover: {
              container: {
                background: 'background-hover',
                elevation: 'none',
              },
            },
          },
        }}
      >
        <LinkCard fill ref={ref} {...rest}>
          <CardBody gap="large">
            <Box gap="small">
              <Identifier
                title={render || name}
                align="start"
                gap="xsmall"
                level={level}
              >
                {parent && parent.icon && !minimal && showUpdate && (
                  <Box
                    direction="row"
                    align="center"
                    fill="horizontal"
                    justify="between"
                  >
                    {showUpdate && changeKind === 'Update' && (
                      <NotificationTag
                        backgroundColor="teal"
                        a11yTitle={`There have been updates for ${
                          render || name
                        }`}
                        value="Updated"
                        size="small"
                      />
                    )}
                    {showUpdate && changeKind === 'New' && (
                      <NotificationTag
                        backgroundColor="purple"
                        a11yTitle={`There's a new item called ${
                          render || name
                        }`}
                        value="New!"
                        size="small"
                      />
                    )}
                  </Box>
                )}
              </Identifier>
              {description && (
                <Paragraph maxLines={2} size="small">
                  {description}
                </Paragraph>
              )}
            </Box>
          </CardBody>
        </LinkCard>
      </ThemeContext.Extend>
    );
  },
);

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

ContentCard.propTypes = {
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
