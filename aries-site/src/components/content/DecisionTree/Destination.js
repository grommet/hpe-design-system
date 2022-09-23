import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Paragraph, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

export const Destination = ({ children, detail, useCases, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box {...rest}>
      <Button onClick={() => setOpen(!open)}>
        <Box
          alignSelf="start"
          round={!open ? 'small' : { corner: 'top', size: 'small' }}
          background={{ color: 'blue', opacity: 'weak' }}
          pad="medium"
        >
          <Box justify="between" direction="row" align="center">
            <Paragraph margin="none">{children}</Paragraph>
            {open ? <FormUp /> : <FormDown />}
          </Box>
        </Box>
      </Button>
      <Collapsible open={open}>
        <Box
          background={{ color: 'blue', opacity: 'weak' }}
          pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
          round={{ corner: 'bottom', size: 'small' }}
          gap="small"
        >
          <Paragraph margin="none">{detail}</Paragraph>
          {useCases && (
            <Box>
              <Text>Example use cases:</Text>
              <Box as="ul" pad="small" margin="none">
                {useCases.map((useCase, index) => (
                  <Paragraph as="li" key={index} margin="none">
                    {useCase}
                  </Paragraph>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Collapsible>
    </Box>
  );
};

Destination.propTypes = {
  children: PropTypes.string,
  detail: PropTypes.string,
  useCases: PropTypes.arrayOf(PropTypes.string),
};
