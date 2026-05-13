import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Box,
  FormField,
  Grommet,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Select,
  Text,
  ThemeContext,
} from 'grommet';
import { Left } from '@hpe-design/icons-grommet';
import { THEME_OPTIONS, themeMap } from './themes';
import { InputStickerSheet } from './InputStickerSheet';
import { ExampleForm } from './ExampleForm';

// Per-option descriptions shown below the Select switcher.
const DESCRIPTIONS = {
  Current: [
    'Form field containers: border unchanged on hover',
    'Unchecked checkbox control: border darkens + background fill on hover',
    'Radio button control: border darkens on hover',
  ],
  'Option 2': [
    'Form field containers: border unchanged on hover',
    'Unchecked checkbox control: border darkens on hover — no fill',
    'Radio button control: border darkens on hover',
  ],
  'Option 3': [
    'Form field containers: border darkens on hover',
    'Unchecked checkbox control: border darkens on hover — no fill',
    'Radio button control: border darkens on hover',
  ],
};

const ThemeSwitcher = ({ value, onChange }) => (
  <Box gap="small">
    <FormField
      label="Hover theme"
      htmlFor="hover-theme-select__input"
      name="hover-theme"
      margin="none"
    >
      <Select
        id="hover-theme-select"
        name="hover-theme"
        options={THEME_OPTIONS}
        value={value}
        onChange={({ option }) => onChange(option)}
      />
    </FormField>
    <Box gap="xxsmall">
      {DESCRIPTIONS[value].map(line => (
        <Text key={line}>• {line}</Text>
      ))}
    </Box>
  </Box>
);

const HoverStaging = () => {
  // Read dark/light mode from the outer app Grommet context
  const outerTheme = useContext(ThemeContext);
  const themeMode = outerTheme.dark ? 'dark' : 'light';

  const [activeOption, setActiveOption] = useState('Current');
  const activeTheme = useMemo(() => themeMap[activeOption], [activeOption]);

  return (
    // Scoped Grommet wrapper — only this subtree is affected by the selected theme.
    // Switching the Select applies the theme override instantly without touching
    // the rest of the app or modifying theme.jsx.
    <Grommet theme={activeTheme} themeMode={themeMode} background="background-back">
      <Page kind="full" pad={{ bottom: 'xlarge' }}>
        <PageContent align="start" gap="large">
          <PageHeader
            title="Hover State Staging"
            subtitle="Compare hover behaviour across theme options. Switch themes and test with a real mouse."
            parent={
              <Anchor as={Link} to="/" label="Home" icon={<Left />} />
            }
            width="100%"
          />

          {/* ── Theme Switcher ────────────────────────────────────── */}
          <ThemeSwitcher
            value={activeOption}
            onChange={setActiveOption}
          />

          {/* ── Sticker Sheet ─────────────────────────────────────── */}
          <Box gap="small" width="100%">
            <Box>
              <Heading level={2} margin={{ bottom: 'xxsmall' }}>
                Input Components
              </Heading>
              <Text color="text-weak">
                All interactive states — hover over inputs to observe border
                behaviour. Disabled inputs should show no hover change.
              </Text>
            </Box>
            <InputStickerSheet />
          </Box>

          {/* ── Example Form ──────────────────────────────────────── */}
          <Box width="100%">
            <ExampleForm />
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default HoverStaging;
