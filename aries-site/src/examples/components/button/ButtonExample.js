import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grommet,
  Box,
  Button,
  CheckBox,
  Select,
  FormField,
  TextInput,
} from 'grommet';
import { Add } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';

const kindOptions = ['primary', 'secondary', 'default', 'toolbar'];
const sizeOptions = [
  { label: 'xsmall', value: 'xsmall' },
  { label: 'small', value: 'small' },
  { label: 'medium', value: 'medium' },
  { label: 'large', value: 'large' },
  { label: 'xlarge', value: 'xlarge' },
];

const getKindProps = (kind) => {
  switch (kind) {
    case 'primary':
      return { primary: true };
    case 'secondary':
      return { secondary: true };
    case 'default':
      return { default: true };
    case 'toolbar':
      return { kind: 'toolbar' };
    default:
      return {};
  }
};

 const ButtonExample = () => {
  const [kind, setKind] = useState('primary');
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [badge, setBadge] = useState(false);
  const [badgeValue, setBadgeValue] = useState(3);
  const [badgeMax, setBadgeMax] = useState(9);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [label, setLabel] = useState('Click me');
  const [size, setSize] = useState('medium');
  const [showIcon, setShowIcon] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [a11yTitle, setA11yTitle] = useState('');
  const [href, setHref] = useState('');

  const generateButtonJSX = () => {
    const props = [];

    props.push(`label='${label}'`);
    if (size) props.push(`size='${size}'`);
    if (active) props.push(`active`);
    if (disabled) props.push(`disabled`);
    if (badge) {
      props.push(`badge={{ value: ${badgeValue}, max: ${badgeMax} }}`);
    }
    if (busy) props.push(`busy`);
    if (showIcon) props.push(`icon={<Add />}`);
    if (reverse) props.push(`reverse`);
    if (a11yTitle) props.push(`a11yTitle='${a11yTitle}'`);
    if (href) props.push(`href='${href}'`);
    if (success || busy) {
      props.push(
        `messages={{ busy: 'button is in a busy state', success: 'button action succeeded' }}`
      );
    }

    switch (kind) {
      case 'primary':
        props.push(`primary`);
        break;
      case 'secondary':
        props.push(`secondary`);
        break;
      case 'default':
        props.push(`default`);
        break;
      case 'toolbar':
        props.push(`kind='toolbar'`);
        break;
    }

    return `<Button ${props.join(' ')} />`;
  };

  return (
    <Grommet theme={hpe} >
      <Box direction='row' width='1200px' responsive pad='medium' gap='medium' >
        {/* LEFT: Button Preview */}
        <Box flex align='center' justify='center' background='background'>
          <Button
            label={label}
            size={size}
            icon={showIcon ? <Add /> : undefined}
            {...getKindProps(kind)}
            active={active}
            disabled={disabled}
            busy={busy}
            success={success}
            messages={{
              busy: 'button is in a busy state',
              success: 'button action succeeded',
            }}
            reverse={reverse}
            a11yTitle={a11yTitle || undefined}
            badge={badge ? { value: badgeValue, max: badgeMax } : undefined}
            href={href || undefined} // ✅ This makes it optional
          />
        </Box>

        {/* RIGHT: Control Panel */}
        <Box
          width='medium'
          gap='xxsmall'
          background='background-back'
          pad='small'
          round='small'
        >
          <FormField label='Button Label'>
            <TextInput
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </FormField>
          <FormField label='Button Kind'>
            <Select
              options={kindOptions}
              value={kind}
              onChange={({ option }) => setKind(option)}
            />
          </FormField>
          <FormField label='Size'>
            <Select
              options={sizeOptions}
              labelKey='label'
              valueKey={{ key: 'value', reduce: true }}
              value={size}
              onChange={({ option }) => {
                if (!option.disabled) setSize(option.value);
              }}
            />
          </FormField>

          <FormField label='a11yTitle'>
            <TextInput
              value={a11yTitle}
              onChange={(e) => setA11yTitle(e.target.value)}
            />
          </FormField>

          <CheckBox
            label='Show Icon'
            checked={showIcon}
            onChange={(e) => setShowIcon(e.target.checked)}
          />

          {showIcon && (
            <Box pad={{ left: 'large' }} gap='xsmall'>
              <CheckBox
                label='Reverse icon order'
                checked={reverse}
                onChange={(e) => setReverse(e.target.checked)}
              />
            </Box>
          )}

          <CheckBox
            label='Active'
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />

          <CheckBox
            label='Disabled'
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />

          <CheckBox
            label='Busy'
            checked={busy}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setBusy(isChecked);
              if (isChecked) setSuccess(false); // mutually exclusive
            }}
          />

          <CheckBox
            label='Success'
            checked={success}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setSuccess(isChecked);
              if (isChecked) setBusy(false); // mutually exclusive
            }}
          />

          <CheckBox
            label='Show Badge'
            checked={badge}
            onChange={(e) => setBadge(e.target.checked)}
          />

          {badge && (
            <Box pad={{ left: 'large' }} gap='xsmall' direction='row'>
              <FormField label='Badge value'>
                <TextInput
                  type='number'
                  value={badgeValue}
                  onChange={(e) => setBadgeValue(Number(e.target.value))}
                />
              </FormField>
              <FormField
                label='Max value (default is 9)'
                //info='Default max value in HPE theme is 9'
              >
                <TextInput
                  type='number'
                  value={badgeMax}
                  onChange={(e) => setBadgeMax(Number(e.target.value))}
                />
              </FormField>
            </Box>
          )}
          <Box pad='xsmall' round='small'>
            <FormField
              label='href (link)'
              help='converts button to styled link'
            >
              <TextInput
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder='https://example.com'
              />
            </FormField>
          </Box>
        </Box>
      </Box>
      <Box pad='medium' background='dark-1' round='small' margin='medium'>
        <code style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {generateButtonJSX()}
        </code>
      </Box>
    </Grommet>
  );
  
}

ButtonExample.propTypes = {};

export { ButtonExample };