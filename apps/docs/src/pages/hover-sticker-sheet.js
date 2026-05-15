/* eslint-disable */
import React, { useState } from 'react';
import {
  Box,
  CheckBox,
  FormField,
  Grommet,
  Heading,
  PageContent,
  RadioButton,
  Text,
  TextInput,
  ToggleGroup,
} from 'grommet';
import { currentTheme, option1Theme, option2Theme } from '../examples/hover-sticker-sheet/themes';
import { StickerSheet } from '../examples/hover-sticker-sheet/StickerSheet';
import { ExampleForm } from '../examples/hover-sticker-sheet/ExampleForm';

const THEMES = {
  Current: currentTheme,
  'Option 1': option1Theme,
  'Option 2': option2Theme,
};

const DESCRIPTIONS = {
  Current: [
    'Unchecked checkboxes show a background fill on hover.',
    'Form input borders do not change on hover.',
    'RadioButton border darkens on hover (unchecked and checked).',
  ],
  'Option 1': [
    'No background fill on unchecked checkbox hover.',
    'Checkbox border darkens on hover for unchecked state only.',
    'RadioButton border darkens on hover for unchecked state only.',
  ],
  'Option 2': [
    'All inputs get a darker border on hover.',
  ],
};

const HoverStickerSheet = () => {
  const [option, setOption] = useState('Current');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Grommet
      theme={THEMES[option]}
      themeMode={darkMode ? 'dark' : 'light'}
      style={{ width: '100%' }}
    >
      <PageContent>
        <Box pad={{ vertical: 'large' }} gap="xlarge">
          {/* ── Page header ───────────────────────────────────────── */}
          <Box
            direction="row"
            justify="between"
            align="center"
            wrap
            gap="small"
          >
            <Box gap="xsmall">
              <Heading level={1} margin="none">
                Hover State Feedback
              </Heading>
              <Text size="large" color="text-weak">
                Switch between options and hover over components to compare behavior.
              </Text>
            </Box>
            <CheckBox
              toggle
              label="Dark mode"
              checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)}
            />
          </Box>

          {/* ── Option selector ───────────────────────────────────── */}
          <Box gap="small">
            <Text weight="bold">Hover option:</Text>
            <ToggleGroup
              options={['Current', 'Option 1', 'Option 2']}
              value={option}
              onToggle={({ value }) => setOption(value)}
            />
            <Box
              background="background-contrast"
              pad="medium"
              round="small"
              gap="medium"
            >
              <Box gap="xsmall">
                {DESCRIPTIONS[option].map(item => (
                  <Box key={item} direction="row" gap="xsmall">
                    <Text>•</Text>
                    <Text>{item}</Text>
                  </Box>
                ))}
              </Box>
              <Box direction="row" gap="large" align="center" wrap>
                <CheckBox
                  label="Checkbox"
                  checked={false}
                  onChange={() => {}}
                />
                <RadioButton
                  name="preview-rb"
                  label="Radio button"
                  checked={false}
                  onChange={() => {}}
                />
                <Box width={{ min: '180px' }}>
                  <FormField>
                    <TextInput placeholder="Text input" />
                  </FormField>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ── Sticker sheet ─────────────────────────────────────── */}
          <StickerSheet />

          {/* ── Example form ──────────────────────────────────────── */}
          <Box gap="small">
            <Heading level={2} margin="none">
              Example Form
            </Heading>
            <Text color="text-weak">
              A realistic form to experience hover states in context.
            </Text>
            <ExampleForm />
          </Box>
        </Box>
      </PageContent>
    </Grommet>
  );
};

export default HoverStickerSheet;
