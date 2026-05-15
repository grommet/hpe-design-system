/* eslint-disable */
import React, { useState } from 'react';
import {
  Box,
  CheckBox,
  CheckBoxGroup,
  DateInput,
  FileInput,
  FormField,
  Grid,
  Heading,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectMultiple,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

// ─── Shared layout helpers ────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
  <Heading level={3} margin={{ top: 'none', bottom: 'small' }} size="small">
    {children}
  </Heading>
);

const ItemHeading = ({ children }) => (
  <Heading level={4} margin={{ top: 'none', bottom: 'xsmall' }} size="xsmall">
    {children}
  </Heading>
);

const ItemCard = ({ title, children }) => (
  <Box background="background-contrast" round="xsmall" pad="small" gap="xsmall">
    <ItemHeading>{title}</ItemHeading>
    {children}
  </Box>
);

// Two-column layout for standalone vs in-FormField comparison
const DualCard = ({ title, standalone, inFormField }) => (
  <Box background="background-contrast" round="xsmall" pad="small" gap="xsmall">
    <ItemHeading>{title}</ItemHeading>
    <Grid columns={['1/2', '1/2']} gap="small">
      <Box gap="xsmall">
        <Text size="xsmall" weight="bold" color="text-weak">
          Control only
        </Text>
        {standalone}
      </Box>
      <Box gap="xsmall">
        <Text size="xsmall" weight="bold" color="text-weak">
          In FormField
        </Text>
        {inFormField}
      </Box>
    </Grid>
  </Box>
);

// ─── Main component ───────────────────────────────────────────────────────────

export const StickerSheet = () => {
  // Input state
  const [textEmpty, setTextEmpty] = useState('');
  const [textAreaVal, setTextAreaVal] = useState('');
  const [selectEmpty, setSelectEmpty] = useState('');
  const [multiVal, setMultiVal] = useState([]);
  const [dateVal, setDateVal] = useState('');

  // Selection control state
  const [checkGroupVal, setCheckGroupVal] = useState(['Design']);
  const [radioGroupVal, setRadioGroupVal] = useState('email');

  const selectOptions = ['Design', 'Development', 'Research', 'QA'];

  return (
    <Box gap="large">
      {/* ── Text inputs ────────────────────────────────────────────── */}
      <Box gap="small">
        <SectionHeading>Inputs (in FormField)</SectionHeading>
        <Grid columns={{ count: 'fill', size: ['260px', '1fr'] }} gap="small">
          <ItemCard title="TextInput empty">
            <FormField htmlFor="ti-empty" label="Label">
              <TextInput
                id="ti-empty"
                placeholder="Placeholder text"
                value={textEmpty}
                onChange={e => setTextEmpty(e.target.value)}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="TextArea empty">
            <FormField htmlFor="ta-empty" label="Label">
              <TextArea
                id="ta-empty"
                placeholder="Enter text..."
                value={textAreaVal}
                onChange={e => setTextAreaVal(e.target.value)}
                rows={2}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="Select empty">
            <FormField htmlFor="sel-empty" label="Label">
              <Select
                id="sel-empty"
                options={selectOptions}
                placeholder="Select..."
                value={selectEmpty}
                onChange={({ value: v }) => setSelectEmpty(v)}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="Select with value">
            <FormField htmlFor="sel-filled" label="Label">
              <Select
                id="sel-filled"
                options={selectOptions}
                value="Design"
                onChange={() => {}}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="SelectMultiple">
            <FormField htmlFor="sm-empty" label="Label">
              <SelectMultiple
                id="sm-empty"
                options={selectOptions}
                placeholder="Select..."
                value={multiVal}
                onChange={({ value: v }) => setMultiVal(v)}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="DateInput">
            <FormField htmlFor="di-empty" label="Label">
              <DateInput
                id="di-empty"
                name="date"
                format="mm/dd/yyyy"
                value={dateVal}
                onChange={({ value: v }) => setDateVal(v)}
              />
            </FormField>
          </ItemCard>

          <ItemCard title="FileInput">
            <FormField label="Label">
              <FileInput name="file" />
            </FormField>
          </ItemCard>
        </Grid>
      </Box>

      {/* ── Selection controls ──────────────────────────────────────── */}
      <Box gap="small">
        <SectionHeading>Selection Controls</SectionHeading>
        <Grid columns={{ count: 'fill', size: ['480px', '1fr'] }} gap="small">
          {/* CheckBox */}
          <DualCard
            title="CheckBox"
            standalone={
              <Box gap="xsmall">
                <CheckBox label="Unchecked" checked={false} onChange={() => {}} />
                <CheckBox label="Checked" checked onChange={() => {}} />
                <CheckBox label="Indeterminate" indeterminate onChange={() => {}} />
              </Box>
            }
            inFormField={
              <Box gap="xsmall">
                <FormField>
                  <CheckBox label="Unchecked" checked={false} onChange={() => {}} />
                </FormField>
                <FormField>
                  <CheckBox label="Checked" checked onChange={() => {}} />
                </FormField>
                <FormField>
                  <CheckBox label="Indeterminate" indeterminate onChange={() => {}} />
                </FormField>
              </Box>
            }
          />

          {/* CheckBoxGroup */}
          <DualCard
            title="CheckBoxGroup"
            standalone={
              <CheckBoxGroup
                options={selectOptions.slice(0, 3)}
                value={checkGroupVal}
                onChange={({ value: v }) => setCheckGroupVal(v)}
              />
            }
            inFormField={
              <FormField label="Preferences">
                <CheckBoxGroup
                  options={selectOptions.slice(0, 3)}
                  value={checkGroupVal}
                  onChange={({ value: v }) => setCheckGroupVal(v)}
                />
              </FormField>
            }
          />

          {/* RadioButton */}
          <DualCard
            title="RadioButton"
            standalone={
              <Box gap="xsmall">
                <RadioButton
                  name="rb-s-1"
                  label="Unchecked"
                  checked={false}
                  onChange={() => {}}
                />
                <RadioButton
                  name="rb-s-2"
                  label="Checked"
                  checked
                  onChange={() => {}}
                />
              </Box>
            }
            inFormField={
              <Box gap="xsmall">
                <FormField>
                  <RadioButton
                    name="rb-ff-1"
                    label="Unchecked"
                    checked={false}
                    onChange={() => {}}
                  />
                </FormField>
                <FormField>
                  <RadioButton
                    name="rb-ff-2"
                    label="Checked"
                    checked
                    onChange={() => {}}
                  />
                </FormField>
              </Box>
            }
          />

          {/* RadioButtonGroup */}
          <DualCard
            title="RadioButtonGroup"
            standalone={
              <RadioButtonGroup
                name="rbg-s"
                options={[
                  { label: 'Email', value: 'email' },
                  { label: 'Phone', value: 'phone' },
                  { label: 'Text', value: 'text' },
                ]}
                value={radioGroupVal}
                onChange={e => setRadioGroupVal(e.target.value)}
              />
            }
            inFormField={
              <FormField label="Contact method">
                <RadioButtonGroup
                  name="rbg-ff"
                  options={[
                    { label: 'Email', value: 'email' },
                    { label: 'Phone', value: 'phone' },
                    { label: 'Text', value: 'text' },
                  ]}
                  value={radioGroupVal}
                  onChange={e => setRadioGroupVal(e.target.value)}
                />
              </FormField>
            }
          />

          {/* Switch */}
          <DualCard
            title="Switch (Toggle)"
            standalone={
              <Box gap="xsmall">
                <CheckBox toggle label="Off" checked={false} onChange={() => {}} />
                <CheckBox toggle label="On" checked onChange={() => {}} />
              </Box>
            }
            inFormField={
              <Box gap="xsmall">
                <FormField>
                  <CheckBox
                    toggle
                    label="Two-factor auth"
                    checked={false}
                    onChange={() => {}}
                  />
                </FormField>
                <FormField>
                  <CheckBox
                    toggle
                    label="Two-factor auth"
                    checked
                    onChange={() => {}}
                  />
                </FormField>
              </Box>
            }
          />
        </Grid>
      </Box>
    </Box>
  );
};
