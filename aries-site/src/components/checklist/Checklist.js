import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormDown, FormUp } from 'grommet-icons';
import {
  AnnounceContext,
  Anchor,
  Box,
  CheckBox,
  CheckBoxGroup,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';

export const Checklist = ({ optionsObjects }) => (
  <CheckBoxGroup options={optionsObjects}>
    {(option, { checked }) => {
      const [expanded, setExpanded] = useState(false);

      const setChecked = (value) => checked === value;
      const announce = useContext(AnnounceContext);
      const size = useContext(ResponsiveContext);

      const Icon = expanded ? FormUp : FormDown;

      return (
        <Box direction="row">
          <Box direction="row" gap="medium" pad="xsmall">
            <CheckBox checked={checked} onChange={() => setChecked(false)} />
            <Icon
              onClick={() => {
                announce('Expanded content');
                setExpanded(!expanded);
              }}
              size="medium"
            />
          </Box>
          <Box direction="row">
            <Box
              onClick={() => {
                announce('Expanded content');
                setExpanded(!expanded);
              }}
              focusIndicator={false}
              pad={
                size === 'small'
                  ? { vertical: 'large' }
                  : { vertical: 'xsmall' }
              }
            >
              <Text size="large" weight="bold">
                {option.value}
              </Text>
              {expanded && (
                <>
                  <Paragraph>{option.description}</Paragraph>
                  <Anchor
                    label={`See Success Criterion ${option.number}`}
                    target="_blank"
                    href={option.link}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
      );
    }}
  </CheckBoxGroup>
);

Checklist.propTypes = {
  optionsOjects: PropTypes.array,
};
