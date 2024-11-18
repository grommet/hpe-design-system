import Radio from '@mui/material/Radio';
import MUIRadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import MuiCheckBox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--hpe-font-stack-primary)',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'var(--hpe-radio-button-control-enabled-border-color)',
          width: 'var(--hpe-radio-button-medium-control-width)',
          height: 'var(--hpe-radio-button-medium-control-height)',
          '&.Mui-disabled': {
            color: 'var(--hpe-radio-button-control-disabled-border-color)',
          },
          '&.Mui-checked': {
            color:
              'var(--hpe-radio-button-control-selected-enabled-icon-color)',
          },
          '&.Mui-checked.Mui-disabled': {
            color:
              'var(--hpe-radio-button-control-selected-disabled-icon-color)',
          },
        },
      },
    },
    MuiRadioGroup: {
      styleOverrides: {
        root: {
          gap: 'var(--hpe-spacing-xsmall)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // states
          color: 'var(--hpe-checkbox-control-enabled-border-color)',
          '&.Mui-checked': {
            color: 'var(--hpe-checkbox-control-selected-enabled-background)',
          },
          '&.Mui-disabled': {
            color: 'var(--hpe-checkbox-control-disabled-background)',
          },
          // dimensions
          padding: '0',
          borderRadius: 'var(--hpe-checkbox-medium-control-border-radius)',
          width: 'var(--hpe-checkbox-medium-control-width)',
          height: 'var(--hpe-checkbox-medium-control-height)',
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          borderStyle: 'solid',
          // states
          background:
            'var(--hpe-form-field-input-group-container-enabled-background)',
          borderColor:
            'var(--hpe-form-field-input-group-container-enabled-border-color)',
          '&.Mui-error': {
            background:
              'var(--hpe-form-field-input-container-status-critical-background)',
            borderColor:
              'var(--hpe-form-field-input-container-status-critical-border-color)',
          },
          // dimensions
          borderWidth:
            'var(--hpe-form-field-medium-input-group-container-border-width)',
          borderRadius:
            'var(--hpe-form-field-medium-input-group-container-border-radius)',
          paddingBlock:
            'var(--hpe-form-field-medium-input-group-container-padding-y)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          // states
          color: 'var(--hpe-form-field-label-text-enabled-text-color)',
          '&.Mui-error': {
            color:
              'var(--hpe-form-field-label-text-status-critical-text-color)',
          },
          '&.Mui-disabled': {
            color: 'var(--hpe-form-field-label-text-disabled-text-color)',
          },
          // dimensions
          fontSize: 'var(--hpe-form-field-medium-label-text-font-size)',
          lineHeight: 'var(--hpe-form-field-medium-label-text-line-height)',
          fontWeight: 'var(--hpe-form-field-medium-label-text-font-weight)',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          // states
          background:
            'var(--hpe-form-field-input-group-item-enabled-background)',
          '&:hover:not(.Mui-disabled)': {
            background:
              'var(--hpe-form-field-input-group-item-hover-background)',
          },
          // dimension
          gap: 'var(--hpe-radio-button-medium-gap-x)',
          margin: '0',
          borderRadius:
            'var(--hpe-form-field-medium-input-group-item-border-radius)',
          paddingBlock:
            'var(--hpe-form-field-medium-input-group-item-padding-y)',
          paddingInline:
            'var(--hpe-form-field-medium-input-group-item-padding-x)',
        },
        // TO DO there is a singular place for this, rather than separate for Radio, Check
        label: {
          color: 'var(--hpe-radio-button-label-enabled-text-color)',
          '&.Mui-disabled': {
            color: 'var(--hpe-radio-button-label-disabled-text-color)',
          },
          fontFamily: 'var(--hpe-font-stack-primary)', // TO DO make this global?
          fontSize: 'var(--hpe-radio-button-medium-label-font-size)',
          lineHeight: 'var(--hpe-radio-button-medium-label-line-height)',
          fontWeight: 'var(--hpe-radio-button-medium-label-font-weight)',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // state
          color: 'var(--hpe-form-field-help-text-enabled-color)',
          '&.Mui-error': {
            color: 'var(--hpe-form-field-error-text-enabled-color)',
          },
          // dimensions
          marginInline: '0',
          marginTop: 'var(--hpe-spacing-xsmall)', // TO DO no token
          fontSize: 'var(--hpe-form-field-medium-help-text-font-size)',
          lineHeight: 'var(--hpe-form-field-medium-help-text-line-height)',
          fontWeight: 'var(--hpe-form-field-medium-help-text-font-weight)',
        },
      },
    },
  },
});

export const Mui = () => (
  <ThemeProvider theme={theme}>
    <table>
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Enabled</th>
          <th>Disabled</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standalone Checkbox</td>
          <td>
            <Typography as="label" className="MuiFormControlLabel-label">
              <MuiCheckBox defaultChecked />
              Label
            </Typography>
          </td>
          <td>
            <FormControlLabel
              control={<MuiCheckBox defaultChecked />}
              label="Label"
              disabled
            />
          </td>
          <td>--</td>
        </tr>
        <tr>
          <td>Standalone CheckboxGroup</td>
          <td>
            <FormGroup>
              <FormControlLabel
                control={<MuiCheckBox defaultChecked />}
                label="Label"
              />
              <FormControlLabel
                required
                control={<MuiCheckBox />}
                label="Required"
              />
              <FormControlLabel control={<MuiCheckBox />} label="Other" />
            </FormGroup>
          </td>
          <td>
            <FormGroup>
              <FormControlLabel
                control={<MuiCheckBox defaultChecked />}
                label="Label"
              />
              <FormControlLabel
                required
                control={<MuiCheckBox />}
                label="Required"
              />
              <FormControlLabel
                disabled
                control={<MuiCheckBox />}
                label="Disabled"
              />
            </FormGroup>
          </td>
          <td>--</td>
        </tr>
        <tr>
          <td>CheckBoxGroup in FormField</td>
          <td>
            <FormControl>
              <FormLabel>CheckboxGroup label</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<MuiCheckBox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  required
                  control={<MuiCheckBox />}
                  label="Required"
                />
                <FormControlLabel control={<MuiCheckBox />} label="Other" />
              </FormGroup>
            </FormControl>
          </td>
          <td>
            <FormControl disabled>
              <FormLabel>CheckboxGroup label</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<MuiCheckBox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  required
                  control={<MuiCheckBox />}
                  label="Required"
                />
                <FormControlLabel
                  disabled
                  control={<MuiCheckBox />}
                  label="Disabled"
                />
              </FormGroup>
            </FormControl>
          </td>
          <td>
            <FormControl error>
              <FormLabel>CheckboxGroup label</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<MuiCheckBox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  required
                  control={<MuiCheckBox />}
                  label="Required"
                />
                <FormControlLabel
                  disabled
                  control={<MuiCheckBox />}
                  label="Disabled"
                />
              </FormGroup>
              <FormHelperText>There is an error.</FormHelperText>
            </FormControl>
          </td>
        </tr>
        <tr>
          <td>Standalone RadioGroup</td>
          <td>
            <MUIRadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="California"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="California"
                control={<Radio />}
                label="California"
              />
              <FormControlLabel
                value="Colorado"
                control={<Radio />}
                label="Colorado"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </MUIRadioGroup>
          </td>
          <td>
            <MUIRadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="California"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="California"
                control={<Radio />}
                label="California"
              />
              <FormControlLabel
                value="Colorado"
                control={<Radio />}
                label="Colorado"
                disabled
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </MUIRadioGroup>
          </td>
          <td>--</td>
        </tr>
        <tr>
          <td>MUIRadioGroup in FormField</td>
          <td>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
              <MUIRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="California"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="California"
                  control={<Radio />}
                  label="California"
                />
                <FormControlLabel
                  value="Colorado"
                  control={<Radio />}
                  label="Colorado"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </MUIRadioGroup>
            </FormControl>
          </td>
          <td>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
              <MUIRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="California"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="California"
                  control={<Radio />}
                  label="California"
                />
                <FormControlLabel
                  value="Colorado"
                  control={<Radio />}
                  label="Colorado"
                  disabled
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </MUIRadioGroup>
            </FormControl>
          </td>
          <td>
            <FormControl error={true}>
              <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
              <MUIRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="California"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="California"
                  control={<Radio />}
                  label="California"
                />
                <FormControlLabel
                  value="Colorado"
                  control={<Radio />}
                  label="Colorado"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </MUIRadioGroup>
              <FormHelperText>This is a required field.</FormHelperText>
            </FormControl>
          </td>
        </tr>
      </tbody>
    </table>
  </ThemeProvider>
);
