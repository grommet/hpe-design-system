/* eslint-disable max-len */
import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grid,
  Select,
  Text,
  TextInput,
  Heading,
} from 'grommet';
import { Copy ,
  Add,
  Edit,
  Search,
  Trash,
  Download,
  Upload,
  Settings,
  Notification,
  Filter,
  Refresh,
} from '@hpe-design/icons-grommet';

// --- constants ---
const ICON_OPTIONS = [
  { label: 'None', value: null },
  { label: 'Add', value: 'Add' },
  { label: 'Edit', value: 'Edit' },
  { label: 'Search', value: 'Search' },
  { label: 'Trash', value: 'Trash' },
  { label: 'Download', value: 'Download' },
  { label: 'Upload', value: 'Upload' },
  { label: 'Settings', value: 'Settings' },
  { label: 'Notification', value: 'Notification' },
  { label: 'Filter', value: 'Filter' },
  { label: 'Refresh', value: 'Refresh' },
];

const ICON_MAP = {
  Add, Edit, Search, Trash, Download, Upload, Settings, Notification, Filter, Refresh,
};

const KIND_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Toolbar', value: 'toolbar' },
];

const SIZE_OPTIONS = [
  { label: 'Default', value: null },
  { label: 'xsmall', value: 'xsmall' },
  { label: 'small', value: 'small' },
  { label: 'medium', value: 'medium' },
  { label: 'large', value: 'large' },
  { label: 'xlarge', value: 'xlarge' },
];

const TIP_POSITION_OPTIONS = [
  { label: 'Bottom left', value: { align: { top: 'bottom', left: 'left' } } },
  { label: 'Bottom right', value: { align: { top: 'bottom', right: 'right' } } },
  { label: 'Top left', value: { align: { bottom: 'top', left: 'left' } } },
  { label: 'Top right', value: { align: { bottom: 'top', right: 'right' } } },
];

// --- helpers ---
const kindToProps = (kind) => {
  if (kind === 'primary') return { primary: true };
  if (kind === 'secondary') return { secondary: true };
  if (kind === 'toolbar') return { kind: 'toolbar' };
  return {};
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const toInt = (v, fallback = 0) => {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : fallback;
};

// --- sub-components ---
const SectionDivider = ({ label }) => (
  <Box
    border={{ side: 'top', color: 'border-weak' }}
    pad={{ top: 'small', bottom: 'xsmall' }}
    margin={{ top: 'xsmall' }}
  >
    <Text size="xsmall" weight="bold" color="text-weak">
      {label.toUpperCase()}
    </Text>
  </Box>
);

SectionDivider.propTypes = {
  label: PropTypes.string.isRequired,
};

const NestedBox = ({ children }) => (
  <Box
    pad={{ left: 'small', top: 'xsmall', bottom: 'xsmall' }}
    gap="xsmall"
    border={{ side: 'left', color: 'brand', size: 'xsmall' }}
    margin={{ left: 'xsmall', bottom: 'xxsmall' }}
  >
    {children}
  </Box>
);

NestedBox.propTypes = {
  children: PropTypes.node.isRequired,
};

// --- code generator ---
const generateCode = ({
  label, iconName, reverse, kind, size, active, busy, success, disabled,
  tipEnabled, tipContent, tipPositionIndex, badgeEnabled, badgeMode,
  badgeValue, badgeMax, href, targetBlank, a11yTitle,
}) => {
  const imports = ['import { Button } from \'grommet\';'];
  if (iconName) imports.unshift(`import { ${iconName} } from '@hpe-design/icons-grommet';`);

  const props = [];
  if (label) props.push(`label="${label}"`);
  if (iconName) props.push(`icon={<${iconName} />}`);
  if (iconName && reverse) props.push('reverse');
  if (kind === 'primary') props.push('primary');
  else if (kind === 'secondary') props.push('secondary');
  else if (kind === 'toolbar') props.push('kind="toolbar"');
  if (size) props.push(`size="${size}"`);
  if (active) props.push('active');
  if (disabled) props.push('disabled');
  if (!href && busy) props.push('busy');
  if (!href && success) props.push('success');
  if (href) {
    props.push(`href="${href}"`);
    if (targetBlank) props.push('target="_blank"');
  }
  if (tipEnabled && tipContent) {
    const pos = TIP_POSITION_OPTIONS[tipPositionIndex];
    const dropStr = JSON.stringify(pos.value).replace(/"/g, "'");
    props.push(`tip={{ content: "${tipContent}", dropProps: ${dropStr} }}`);
  } else if (tipEnabled && !tipContent) {
    props.push('tip="Tooltip"');
  }
  if (badgeEnabled) {
    if (badgeMode === 'dot') props.push('badge');
    else props.push(`badge={{ value: ${badgeValue}, max: ${badgeMax} }}`);
  }
  if (a11yTitle) props.push(`a11yTitle="${a11yTitle}"`);

  const lines = ['<Button'];
  props.forEach((p) => lines.push(`  ${p}`));
  lines.push('/>');
  return `${imports.join('\n')}\n\n${lines.join('\n')}`;
};

// --- main component ---
export const ButtonPlaygroundTwo = () => {
  const [label, setLabel] = useState('Button');
  const [iconOnly, setIconOnly] = useState(false);
  const [iconName, setIconName] = useState(null);
  const [reverse, setReverse] = useState(false);
  const [kind, setKind] = useState('default');
  const [size, setSize] = useState(null);
  const [active, setActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tipEnabled, setTipEnabled] = useState(false);
  const [tipContent, setTipContent] = useState('Helpful hint');
  const [tipPositionIndex, setTipPositionIndex] = useState(0);
  const [badgeEnabled, setBadgeEnabled] = useState(false);
  const [badgeMode, setBadgeMode] = useState('dot');
  const [badgeValue, setBadgeValue] = useState(3);
  const [badgeMax, setBadgeMax] = useState(9);
  const [href, setHref] = useState('');
  const [targetBlank, setTargetBlank] = useState(false);
  const [a11yTitle, setA11yTitle] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleBusy = (checked) => { setBusy(checked); if (checked) { setSuccess(false); setDisabled(false); } };
  const toggleSuccess = (checked) => { setSuccess(checked); if (checked) { setBusy(false); setDisabled(false); } };
  const toggleDisabled = (checked) => { setDisabled(checked); if (checked) { setBusy(false); setSuccess(false); setActive(false); } };
  const toggleActive = (checked) => { setActive(checked); if (checked) setDisabled(false); };

  const IconComp = iconName ? ICON_MAP[iconName] : null;
  const tipDropProps = tipEnabled ? TIP_POSITION_OPTIONS[tipPositionIndex].value : undefined;

  const previewProps = useMemo(() => {
    const p = {
      label: iconOnly ? undefined : label || undefined,
      icon: IconComp ? <IconComp /> : undefined,
      reverse: iconName ? reverse : undefined,
      size: size || undefined,
      ...kindToProps(kind),
      active: active || undefined,
      disabled: disabled || undefined,
      busy: !href && busy ? true : undefined,
      success: !href && success ? true : undefined,
      href: href || undefined,
      target: href && targetBlank ? '_blank' : undefined,
      a11yTitle: a11yTitle || undefined,
    };
    if (tipEnabled) p.tip = tipContent ? { content: tipContent, dropProps: tipDropProps } : 'Tooltip';
    if (badgeEnabled) p.badge = badgeMode === 'dot' ? true : { value: badgeValue, max: badgeMax };
    return p;
  }, [label, iconOnly, IconComp, iconName, reverse, kind, size, active, busy, success, disabled,
      tipEnabled, tipContent, tipDropProps, badgeEnabled, badgeMode,
      badgeValue, badgeMax, href, targetBlank, a11yTitle]);

  const code = useMemo(() => generateCode({
    label: iconOnly ? undefined : label, iconName, reverse, kind, size, active, busy, success,
    disabled, tipEnabled, tipContent, tipPositionIndex, badgeEnabled, badgeMode, badgeValue,
    badgeMax, href, targetBlank, a11yTitle,
  }), [label, iconOnly, iconName, reverse, kind, size, active, busy, success, disabled,
      tipEnabled, tipContent, tipPositionIndex, badgeEnabled, badgeMode, badgeValue,
      badgeMax, href, targetBlank, a11yTitle]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <Grid
      fill
      rows={['flex', 'minmax(120px, 160px)']}
      columns={['flex', 'medium']}
      areas={[
        { name: 'main', start: [0, 0], end: [0, 0] },
        { name: 'side', start: [1, 0], end: [1, 1] },
        { name: 'code', start: [0, 1], end: [0, 1] },
      ]}
      style={{ minHeight: 0, minWidth: 0 }}
    >
      {/* LEFT MAIN — centered button preview */}
      <Box gridArea="main" align="center" justify="center" pad="large">
        <Button {...previewProps} />
      </Box>

      {/* RIGHT PANEL — scrollable controls */}
      <Box
        gridArea="side"
        background="background-back"
        border={{ side: 'left', color: 'border-weak' }}
        pad="small"
        overflow="auto"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <Form gap="small" onSubmit={(e) => e.preventDefault()}>
          <Heading level={4} margin={{ top: 'none', bottom: 'none' }}>
            Button
          </Heading>
          <Text size="small" color="text-weak" margin={{ top: 'none' }}>
            Configure the component with available props.
          </Text>

          <SectionDivider label="Content" />
          <FormField label="Label">
            <TextInput value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Button text" disabled={iconOnly} />
          </FormField>
          <NestedBox>
            <CheckBox label="Icon only" checked={iconOnly} onChange={(e) => { const c = e.target.checked; setIconOnly(c); if (c && !iconName) setIconName('Add'); }} />
          </NestedBox>
          <FormField label="Icon">
            <Select
options={ICON_OPTIONS} labelKey="label" valueKey={{ key: 'value', reduce: true }} value={iconName}
              onChange={({ value }) => { setIconName(value); if (!value) setReverse(false); }} />
          </FormField>
          {iconName && !iconOnly && (
            <NestedBox>
              <CheckBox label="Reverse icon position" checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
            </NestedBox>
          )}

          <SectionDivider label="Appearance" />
          <FormField label="Kind">
            <Select options={KIND_OPTIONS} labelKey="label" valueKey={{ key: 'value', reduce: true }} value={kind} onChange={({ value }) => setKind(value)} />
          </FormField>
          <FormField label="Size">
            <Select options={SIZE_OPTIONS} labelKey="label" valueKey={{ key: 'value', reduce: true }} value={size} onChange={({ value }) => setSize(value)} />
          </FormField>

          <SectionDivider label="State" />
          <Box gap="3xsmall">
            <CheckBox label="Disabled" checked={disabled} onChange={(e) => toggleDisabled(e.target.checked)} />
            <CheckBox label="Active" checked={active} onChange={(e) => toggleActive(e.target.checked)} />
            {!href && <CheckBox label="Busy" checked={busy} onChange={(e) => toggleBusy(e.target.checked)} />}
            {!href && <CheckBox label="Success" checked={success} onChange={(e) => toggleSuccess(e.target.checked)} />}
          </Box>

          <SectionDivider label="Enhancements" />
          <CheckBox label="Tip" checked={tipEnabled} onChange={(e) => setTipEnabled(e.target.checked)} />
          {tipEnabled && (
            <NestedBox>
              <FormField label="Content">
                <TextInput value={tipContent} onChange={(e) => setTipContent(e.target.value)} placeholder="Tooltip text" />
              </FormField>
              <FormField label="Position">
                <Select
options={TIP_POSITION_OPTIONS.map((o, i) => ({ label: o.label, value: i }))}
                  labelKey="label" valueKey={{ key: 'value', reduce: true }} value={tipPositionIndex}
                  onChange={({ value }) => setTipPositionIndex(value)} />
              </FormField>
            </NestedBox>
          )}
          <CheckBox label="Badge" checked={badgeEnabled} onChange={(e) => setBadgeEnabled(e.target.checked)} />
          {badgeEnabled && (
            <NestedBox>
              <Box direction="row" gap="xsmall">
                <CheckBox label="Dot only" checked={badgeMode === 'dot'} onChange={() => setBadgeMode('dot')} />
                <CheckBox label="Show value" checked={badgeMode === 'value'} onChange={() => setBadgeMode('value')} />
              </Box>
              {badgeMode === 'value' && (
                <>
                  <FormField label="Value">
                    <TextInput type="number" value={badgeValue} onChange={(e) => setBadgeValue(clamp(toInt(e.target.value, 0), 0, 9999))} />
                  </FormField>
                  <FormField label="Max (displays n+ above this)">
                    <TextInput type="number" value={badgeMax} onChange={(e) => setBadgeMax(clamp(toInt(e.target.value, 1), 1, 9999))} />
                  </FormField>
                </>
              )}
            </NestedBox>
          )}

          <SectionDivider label="Link Behavior" />
          <FormField label="href" help="When set, button renders as a styled <a> tag">
            <TextInput value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://example.com" />
          </FormField>
          {href && (
            <NestedBox>
              <CheckBox label='Open in new tab (target="_blank")' checked={targetBlank} onChange={(e) => setTargetBlank(e.target.checked)} />
            </NestedBox>
          )}

          <SectionDivider label="Accessibility" />
          <FormField label="a11yTitle" help="Custom label for screen readers">
            <TextInput value={a11yTitle} onChange={(e) => setA11yTitle(e.target.value)} />
          </FormField>
        </Form>
      </Box>

      {/* BOTTOM CODE AREA */}
      <Box
        gridArea="code"
        as="pre"
        margin="none"
        pad="small"
        background="dark-1"
        overflow="auto"
        border={{ side: 'top', color: 'border' }}
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <Box direction="row" align="center" justify="between" margin={{ bottom: 'xsmall' }}>
          <Text size="small" color="light-3" weight="bold">Grommet code snippet</Text>
          <Button
icon={<Copy size="small" color="light-3" />} tip={copied ? 'Copied!' : 'Copy to clipboard'}
            plain onClick={handleCopy} a11yTitle="Copy code to clipboard" />
        </Box>
        <Text size="xsmall" color="light-1" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
          {code}
        </Text>
      </Box>
    </Grid>
  );
};
