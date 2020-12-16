import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Header, Text } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Subheading } from '../../components';
import { getPageDetails, formatName } from '../../utils';

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
  showHeading,
  gap,
  headingSize,
  level,
  name,
  topic,
  ...rest
}) => {
  const [over, setOver] = useState(false);
  const parent = topic && getPageDetails(topic);
  const id = formatName(name);

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
      margin={{ bottom: 'small' }}
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
      <Box gap={level !== 3 ? 'small' : undefined}>
        {showHeading && (
          <Header>
            <Box align="start" gap="small">
              {level === 1 && topic && (
                <Link href={`/${topic.toLowerCase()}`} passHref>
                  <Button {...rest}>
                    <Box align="center" direction="row" gap="small">
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
              <Anchor
                a11yTitle={`Jump to section titled ${name}`}
                href={`#${id}`}
                icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
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

Subsection.defaultProps = {
  children: undefined,
  level: 2,
  gap: 'medium',
  headingSize: undefined,
  showHeading: true,
  topic: undefined,
};
