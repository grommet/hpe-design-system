import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapsible,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Down, Up } from 'grommet-icons';

export const Destination = ({ children, detail, id, useCases, ...rest }) => {
  const [showMore, setShowMore] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const textSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';

  return (
    <Box {...rest}>
      <Box id={id} background={{ color: 'yellow!' }} round="small">
        <Box pad="medium">
          <Text color="text-strong" weight={500} size={textSize}>
            {children}
          </Text>
          <Paragraph
            color="text-strong"
            margin={{ top: 'small', bottom: 'xsmall' }}
            maxLines={showMore ? undefined : 3}
            size={textSize}
          >
            {detail}
          </Paragraph>
          <Collapsible open={showMore}>
            <Text color="text-strong" margin="none" size={textSize}>
              Example use cases:
            </Text>
            {useCases && (
              <Box
                as="ul"
                gap="xsmall"
                pad={{
                  left: ['xsmall', 'small'].includes(breakpoint)
                    ? 'medium'
                    : 'small',
                  top: 'small',
                }}
                margin="none"
              >
                {useCases.map((useCase, index) => (
                  <Paragraph
                    as="li"
                    key={index}
                    color="text-strong"
                    margin="none"
                    size={textSize}
                  >
                    {useCase}
                  </Paragraph>
                ))}
              </Box>
            )}
          </Collapsible>
        </Box>
        <Box pad={{ horizontal: 'small', bottom: 'small' }}>
          <Button
            alignSelf="start"
            label={showMore ? 'Show less' : 'Show all'}
            icon={showMore ? <Up /> : <Down />}
            onClick={() => setShowMore(!showMore)}
            margin={{ left: 'xsmall' }} // align button label with text above
            reverse
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
};

Destination.propTypes = {
  children: PropTypes.string,
  detail: PropTypes.string,
  id: PropTypes.string,
  useCases: PropTypes.arrayOf(PropTypes.string),
};
