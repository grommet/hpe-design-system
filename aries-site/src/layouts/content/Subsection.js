import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Header } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Subheading } from '../../components';
import { getPageDetails } from '../../utils';

export const Subsection = ({
  children,
  showHeading,
  level,
  name,
  topic,
  ...rest
}) => {
  const [over, setOver] = useState(false);
  const parent = getPageDetails(topic);

  const id = name
    .split(' ')
    .join('-')
    .toLowerCase();

  const firstChild = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return React.cloneElement(child, {
        level,
      });
    }
    return undefined;
  });

  const remainingChildren = React.Children.map(children, (child, index) => {
    if (index === 0) {
      return undefined;
    }
    return React.cloneElement(child, {
      level,
    });
  });

  return (
    <Box
      as="section"
      id={id}
      margin={{ bottom: 'small' }}
      fill="horizontal"
      gap="medium"
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onFocus={() => setOver(true)}
      onBlur={() => setOver(false)}
      {...rest}
    >
      <Box gap={level !== 3 ? 'small' : undefined}>
        {showHeading && (
          <Header>
            <Box align="start" gap="small">
              {level === 1 && topic && (
                <Link href={`/${topic.toLowerCase()}`} passHref>
                  <Button plain {...rest}>
                    {({ hover }) => (
                      <Box
                        direction="row"
                        align="center"
                        gap="small"
                        pad={{ vertical: 'xsmall', horizontal: 'small' }}
                        round="small"
                        background={hover ? 'active-background' : undefined}
                      >
                        {parent.icon('small', parent.color)}
                        {parent.name}
                      </Box>
                    )}
                  </Button>
                </Link>
              )}
              <Subheading level={level}>{name}</Subheading>
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
  name: PropTypes.string.isRequired,
  showHeading: PropTypes.bool,
  topic: PropTypes.string,
};

Subsection.defaultProps = {
  children: undefined,
  level: 2,
  showHeading: true,
  topic: undefined,
};
