import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useDarkMode } from '../../utils';
import { ContentPreviewCard } from '../cards';

export const ThemeModeToggle = ({ active }) => {
  const darkMode = useDarkMode();
  const label = darkMode.value ? 'Light Mode' : 'Dark Mode';
  const icon = darkMode.value ? <Sun size="large" /> : <Moon size="large" />;
  return (
    <ContentPreviewCard
      id="toggle-card"
      active={active}
      onClick={() => darkMode.toggle()}
      forwardedAs="a"
      style={{ textDecoration: 'none' }}
      pad="medium"
    >
      <Box width="100%" round="xsmall">
        {icon}
      </Box>
      <Text
        weight="bold"
        size="xlarge"
        color="text-strong"
        margin={{ top: 'small' }}
      >
        {label}
      </Text>
      <Paragraph size="small">
        View the design system in both light and dark mode!
      </Paragraph>
    </ContentPreviewCard>
  );
};

ThemeModeToggle.propTypes = {
  active: PropTypes.bool,
};
