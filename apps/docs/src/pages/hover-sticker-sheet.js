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
import { currentTheme, option1Theme, option2Theme, option3Theme, option4Theme, option5Theme, option6Theme, option7Theme, option8Theme, focus3pxTheme } from '../examples/hover-sticker-sheet/themes';
import { StickerSheet } from '../examples/hover-sticker-sheet/StickerSheet';
import { ExampleForm } from '../examples/hover-sticker-sheet/ExampleForm';
import { WizardExample } from '../examples/hover-sticker-sheet/WizardExample';
import { InstanceConfigExample } from '../examples/hover-sticker-sheet/InstanceConfigExample';

const THEMES = {
  Current: currentTheme,
  'Option 1': option1Theme,
  'Option 2': option2Theme,
  'Option 3': option3Theme,
  'Option 4': option4Theme,
  'Option 5': option5Theme,
  'Option 6': option6Theme,
  'Option 7': option7Theme,
  'Option 8': option8Theme,
  'Focus 3px': focus3pxTheme,
};

const DESCRIPTIONS = {
  Current: [
    'Unchecked checkboxes show a background fill on hover.',
    'Form input borders do not change on hover.',
    'RadioButtonGroup border darkens on hover (unchecked and checked).',
  ],
  'Option 1': [
    'No background fill on unchecked checkbox hover.',
    'Checkbox border darkens on hover for unchecked state only.',
    'RadioButtonGroup border darkens on hover for unchecked state only.',
  ],
  'Option 2': [
    'All inputs get a darker border on hover.',
  ],
  'Option 3': [
    'Unchecked checkbox and radio button get a background fill (background-hover) and a darker border on hover.',
    'Other form inputs are unchanged on hover.',
  ],
  'Option 4': [
    'Like Option 2: all inputs get a darker border on hover.',
    'Row-level background fill is suppressed for items inside a CheckboxGroup or RadioButtonGroup.',
    'Checkbox and radio controls look the same on hover whether standalone or inside a group.',
  ],
  'Option 5': [
    'Checkbox and radio control borders use border-strong at rest (3:1 contrast fix).',
    'On hover those borders lighten to border-default.',
    'Text inputs, selects, and other field inputs get a darker border (border-strong) on hover.',
  ],
  'Option 6': [
    'All form input borders (text, select, checkbox, radio) use border-strong at rest (3:1 contrast fix).',
    'On hover all borders lighten to border-default.',
  ],
  'Option 7': [
    'border-default is redefined to base.color.grey.600 (#7D8A92) — meets 3:1 contrast.',
    'Hover continues to darken to border-strong, as in Option 2.',
    'All inputs benefit automatically without per-component overrides.',
  ],
  'Option 8': [
    'Like Option 5: checkbox and radio control borders use border-strong at rest (3:1 contrast fix).',
    'On hover the border stays border-strong (no change); the control background fills with background-hover instead.',
    'Text inputs, selects, and other field inputs get a darker border (border-strong) on hover.',
  ],
  'Focus 3px': [
    'Hover states are identical to Current.',
    'The outer ring of the focus indicator is increased to 3px (from the default 2px).',
    'Tab through interactive elements to compare focus ring thickness.',
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
        <Box pad={{ vertical: 'large' }} gap="64px">
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
              options={['Current', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Focus 3px']}
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
            <Box background="background-back" pad="medium" round="small">
              <ExampleForm />
            </Box>
          </Box>

          {/* ── VM Migration Wizard ───────────────────────────────── */}
          <Box gap="small">
            <Heading level={2} margin="none">
              VM Migration Wizard
            </Heading>
            <Text color="text-weak">
              A multi-step form with selects, text inputs, radio buttons and
              toggles across 3 input steps.
            </Text>
            <WizardExample />
          </Box>

          {/* ── Instance Configuration ────────────────────────────── */}
          <Box gap="small">
            <Heading level={2} margin="none">
              Instance Configuration
            </Heading>
            <Text color="text-weak">
              A detail page with PageHeader, tabs, and a decorative Copilot
              panel — a dense layout to test hover in context.
            </Text>
            <InstanceConfigExample />
          </Box>
        </Box>
      </PageContent>
    </Grommet>
  );
};

export default HoverStickerSheet;
