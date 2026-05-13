import {
  Box,
  CheckBox,
  CheckBoxGroup,
  DateInput,
  FileInput,
  FormField,
  Heading,
  RadioButton,
  RadioButtonGroup,
  Select,
  SelectMultiple,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

const NOOP = () => {};

// Small descriptive label shown above each state variant
const StateLabel = ({ children }) => (
  <Text size="xsmall" color="text-weak" weight={500}>
    {children}
  </Text>
);

// Wrapper that pairs a label with a single state variant
const StateCard = ({ label, children }) => (
  <Box gap="xsmall" width={{ min: 'small', max: 'medium' }} flex={false}>
    <StateLabel>{label}</StateLabel>
    {children}
  </Box>
);

// One component section: heading + row of state variants
const Section = ({ title, children }) => (
  <Box>
    <Heading level={3} margin={{ top: 'medium', bottom: 'small' }} size="small">
      {title}
    </Heading>
    <Box direction="row" wrap gap="medium" align="start">
      {children}
    </Box>
  </Box>
);

export const InputStickerSheet = () => (
  <Box gap="none">
    {/* ── TextInput ─────────────────────────────────────────── */}
    <Section title="TextInput">
      <StateCard label="Rest (empty)">
        <FormField label="Name">
          <TextInput placeholder="Enter name" />
        </FormField>
      </StateCard>
      <StateCard label="Filled">
        <FormField label="Name">
          <TextInput value="John Smith" onChange={NOOP} />
        </FormField>
      </StateCard>
    </Section>

    {/* ── TextArea ──────────────────────────────────────────── */}
    <Section title="TextArea">
      <StateCard label="Rest (empty)">
        <FormField label="Description">
          <TextArea placeholder="Enter description" />
        </FormField>
      </StateCard>
      <StateCard label="Filled">
        <FormField label="Description">
          <TextArea value="Some description text." onChange={NOOP} />
        </FormField>
      </StateCard>
    </Section>

    {/* ── Select ────────────────────────────────────────────── */}
    <Section title="Select">
      <StateCard label="Rest (empty)">
        <FormField label="Category">
          <Select
            options={['Design', 'Engineering', 'Research']}
            placeholder="Select category..."
          />
        </FormField>
      </StateCard>
      <StateCard label="Filled">
        <FormField label="Category">
          <Select
            options={['Design', 'Engineering', 'Research']}
            value="Engineering"
            onChange={NOOP}
          />
        </FormField>
      </StateCard>
    </Section>

    {/* ── SelectMultiple ────────────────────────────────────── */}
    <Section title="SelectMultiple">
      <StateCard label="Rest (empty)">
        <FormField label="Tags">
          <SelectMultiple
            options={['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']}
            placeholder="Select tags..."
          />
        </FormField>
      </StateCard>
      <StateCard label="With selection">
        <FormField label="Tags">
          <SelectMultiple
            options={['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']}
            value={['Tag 1', 'Tag 3']}
            onChange={NOOP}
          />
        </FormField>
      </StateCard>
    </Section>

    {/* ── DateInput ─────────────────────────────────────────── */}
    <Section title="DateInput">
      <StateCard label="Rest (empty)">
        <FormField label="Start date">
          <DateInput format="mm/dd/yyyy" />
        </FormField>
      </StateCard>
      <StateCard label="Filled">
        <FormField label="Start date">
          <DateInput
            format="mm/dd/yyyy"
            value="2026-05-13T00:00:00"
            onChange={NOOP}
          />
        </FormField>
      </StateCard>
    </Section>

    {/* ── FileInput ─────────────────────────────────────────── */}
    <Section title="FileInput">
      <StateCard label="Rest">
        <FormField label="Attachment">
          <FileInput name="file-rest" />
        </FormField>
      </StateCard>
    </Section>

    {/* ── CheckBox ──────────────────────────────────────────── */}
    <Section title="CheckBox">
      <StateCard label="Unchecked">
        <CheckBox label="Option label" checked={false} onChange={NOOP} />
      </StateCard>
      <StateCard label="Checked">
        <CheckBox label="Option label" checked onChange={NOOP} />
      </StateCard>
      <StateCard label="Indeterminate">
        <CheckBox label="Option label" indeterminate onChange={NOOP} />
      </StateCard>
    </Section>

    {/* ── CheckBoxGroup ─────────────────────────────────────── */}
    <Section title="CheckBoxGroup">
      <StateCard label="Rest">
        <FormField label="Preferences">
          <CheckBoxGroup
            options={['Email', 'SMS', 'Push notifications']}
            value={['Email']}
            onChange={NOOP}
          />
        </FormField>
      </StateCard>
    </Section>

    {/* ── RadioButton ───────────────────────────────────────── */}
    <Section title="RadioButton">
      <StateCard label="Unselected">
        <RadioButton
          name="rb-unselected"
          label="Option A"
          value="a"
          checked={false}
          onChange={NOOP}
        />
      </StateCard>
      <StateCard label="Selected">
        <RadioButton
          name="rb-selected"
          label="Option A"
          value="a"
          checked
          onChange={NOOP}
        />
      </StateCard>
    </Section>

    {/* ── RadioButtonGroup ──────────────────────────────────── */}
    <Section title="RadioButtonGroup">
      <StateCard label="Rest">
        <FormField label="Billing frequency">
          <RadioButtonGroup
            name="rbg-rest"
            options={['Monthly', 'Quarterly', 'Annually']}
            value="Monthly"
            onChange={NOOP}
          />
        </FormField>
      </StateCard>
    </Section>

    {/* ── Switch (Toggle) ───────────────────────────────────── */}
    <Section title="Switch (Toggle)">
      <StateCard label="Off">
        <CheckBox label="Email alerts" toggle checked={false} onChange={NOOP} />
      </StateCard>
      <StateCard label="On">
        <CheckBox label="Email alerts" toggle checked onChange={NOOP} />
      </StateCard>
    </Section>
  </Box>
);
