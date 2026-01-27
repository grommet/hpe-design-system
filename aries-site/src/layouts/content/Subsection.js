import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Header, Text } from 'grommet';
import { Link as LinkIcon } from '@hpe-design/icons-grommet';
import { Subheading } from '../../components';
import { getPageDetails, nameToSlug } from '../../utils';

// Text size should be based on if its parent heading is an
// h2, h3, etc.
export const TEXT_SIZE = {
  1: 'large', // heading is h1, parapgraph text should be large
  2: 'large', // heading is h2, paragraph text should be large
  3: 'large', // heading is h3, paragraph text should be medium (default size)
};

// Specific Heading size modifications for Subsection
export const HEADING_SIZE = {
  3: 'small', // heading is h3, but should render as the small variant
};

export const Subsection = ({
  children,
  showHeading = true,
  gap = 'medium',
  headingSize,
  level = 2,
  name,
  topic,
  ...rest
}) => {
  const [over, setOver] = useState(false);
  const parent = topic && getPageDetails(topic);
  const id = nameToSlug(name);

  const firstChild = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return React.cloneElement(child, {
        level,
      });
    }
    return undefined;
  });

  // need to filter out children equal to null that occurs if a page
  // doesn't have any status
  const filteredChildren = React.Children.toArray(children).filter(o => o);

  const remainingChildren = React.Children.map(
    filteredChildren,
    (child, index) => {
      if (index === 0) {
        return undefined;
      }
      return React.cloneElement(child, {
        level,
      });
    },
  );

  return (
    <Box
      as="section"
      id={id}
      fill="horizontal"
      gap={gap}
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onFocus={() => setOver(true)}
      onBlur={() => setOver(false)}
      {...rest}
    >
      {/* This condition for gap is needed because the link icon has padding
       * to maintain a big enough touch area for accessibility. This creates
       * a larger than desired gap between h3's and its first child. This
       * removes that extra space.
       */}
      <Box gap={level !== 3 ? 'xsmall' : undefined}>
        {
          showHeading && (
            <Header>
              <Box align="start" gap="xsmall">
                {level === 1 && topic && (
                  <Link
                    href={`/${topic.toLowerCase()}`}
                    passHref
                    legacyBehavior
                  >
                    <Button {...rest}>
                      <Box align="center" direction="row" gap="xsmall">
                        {parent.icon('small', parent.color)}
                        <Text color="text">{parent.name}</Text>
                      </Box>
                    </Button>
                  </Link>
                )}
                <Subheading
                  level={level}
                  headingSize={headingSize || HEADING_SIZE[level]}
                >
                  {name}
                </Subheading>
              </Box>
              {level > 1 && (
                <Button
                  tip="Copy link to clipboard"
                  a11yTitle={`Jump to section titled ${name} 
                            and copy link to clipboard`}
                  icon={
                    <LinkIcon color={over ? 'text-xweak' : 'transparent'} />
                  }
                  onClick={() => {
                    window.location.href = `#${id}`;
                    navigator.clipboard.writeText(window.location.href);
                  }}
                />
              )}
            </Header>
          )
          /* Isolates the first child to ensure the gap between heading and
           * first child is correct size. See comment on line 33 for reasoning.
           */
        }
        {firstChild}
      </Box>
      {remainingChildren}
    </Box>
  );
};

Subsection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  level: PropTypes.number,
  gap: PropTypes.string,
  headingSize: PropTypes.string,
  name: PropTypes.string.isRequired,
  showHeading: PropTypes.bool,
  topic: PropTypes.string,
};
