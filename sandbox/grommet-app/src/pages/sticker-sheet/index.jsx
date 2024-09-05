/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  RangeInput,
  Menu,
  Grommet,
  Page,
  Heading,
  Tab,
  PageContent,
  PageHeader,
  Text,
  Stack,
  ThemeContext,
  Paragraph,
  Accordion,
  AccordionPanel,
  Notification,
  DateInput,
  Pagination,
  Spinner,
  Tag,
  Select,
  FormField,
  CheckBoxGroup,
  RadioButtonGroup,
  TextInput,
  SelectMultiple,
  Tabs,
  TextArea,
  NameValueList,
  NameValuePair,
  FileInput,
  StarRating,
  ThumbsRating,
  DataTable,
  Meter,
} from 'grommet';
import { User } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../../theme';
import { themes } from '../../theme';

const textSizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
];

const kinds = ['default', 'toolbar', 'secondary', 'primary'];
const states = ['enabled', 'active', 'disabled'];
const sizes = ['small', 'medium', 'large'];

const ModeContext = React.createContext({});

const Compare = ({ children, ...rest }) => {
  const { mode, direction } = React.useContext(ModeContext);

  if (direction === 'row') {
    return (
      <Box direction="row" gap="medium">
        <ThemeContext.Extend value={hpe}>
          <Box align="start">{children}</Box>
        </ThemeContext.Extend>
        <Grommet theme={hpeCurrent}>
          <Box align="start">{children}</Box>
        </Grommet>
      </Box>
    );
  }

  return (
    <Stack {...rest} guidingChild="last">
      <ThemeContext.Extend value={themes.alpha}>
        <Box
          align="start"
          style={
            // eslint-disable-next-line no-nested-ternary
            mode === 'Compare diffs'
              ? { opacity: 0.5, filter: 'invert(1)', color: 'green' }
              : mode === 'metric2'
              ? { visibility: 'hidden' }
              : {}
          }
        >
          {children}
        </Box>
      </ThemeContext.Extend>

      <Grommet background="transparent" theme={hpeCurrent}>
        <Box
          align="start"
          style={mode === 'alpha' ? { visibility: 'hidden' } : {}}
        >
          {children}
        </Box>
      </Grommet>
    </Stack>
  );
};

Compare.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
};

const StickerSheet = () => {
  const [mode, setMode] = React.useState('Compare diffs');
  const [direction, setDirection] = React.useState('row');

  const contextValue = useMemo(() => {
    return {
      mode,
      direction,
    };
  }, [mode, direction]);
  return (
    <Grommet theme={themes.alpha}>
      <ModeContext.Provider value={contextValue}>
        <Page kind="full" pad={{ bottom: 'xlarge' }}>
          <PageContent align="start" gap="medium">
            <PageHeader
              title="Theme upgrade testing"
              subtitle={`To be used for visual regression comparisons from 
            current theme to the next.`}
              actions={
                // eslint-disable-next-line max-len
                <Box direction="row" gap="xsmall">
                  <FormField label="Layout">
                    <CheckBox
                      label="View side-by-side"
                      onChange={e =>
                        setDirection(e.target.checked ? 'row' : '')
                      }
                      checked={direction === 'row' ? true : false}
                      toggle
                    />
                  </FormField>
                  <FormField label="View mode">
                    <Select
                      options={['alpha', 'metric2', 'Compare diffs']}
                      value={mode}
                      onChange={({ option }) => setMode(option)}
                    />
                  </FormField>
                </Box>
              }
              width="100%"
            />
            <Box gap="small">
              {textSizes.map(size => (
                <Compare>
                  <Anchor size={size} key={size}>
                    Anchor {size}
                  </Anchor>
                </Compare>
              ))}
            </Box>
            <Box gap="small">
              {textSizes.map(size => (
                <Compare guidingChild="last">
                  <Text size={size} key={size}>
                    Text {size}
                  </Text>
                </Compare>
              ))}
            </Box>
            <Box gap="small">
              {['small', 'medium', 'large', 'xlarge', 'xxlarge'].map(size => (
                <Compare>
                  <Paragraph size={size} key={size} margin="none">
                    Paragraph {size} with some extra text so we can see how it
                    is when it wraps
                  </Paragraph>
                </Compare>
              ))}
            </Box>
            <Box gap="medium">
              {[1, 2, 3, 4, 5, 6].map(level => (
                <Box gap="small">
                  {['small', 'medium', 'large', 'xlarge'].map(size => (
                    <Compare guidingChild="last">
                      <Heading
                        size={size}
                        key={`${level} ${size}`}
                        level={level}
                        margin="none"
                        style={{ color: 'inherit' }}
                      >
                        Heading {level} {size}
                      </Heading>
                    </Compare>
                  ))}
                </Box>
              ))}
            </Box>
            <Box gap="small">
              {kinds.map(kind =>
                sizes.map(size =>
                  states.map(state => (
                    <Compare>
                      <Button
                        key={`${kind} ${size} ${state}`}
                        label={`${kind} ${size} ${state}`}
                        size={size}
                        kind={kind}
                        active={state === 'active'}
                        disabled={state === 'disabled'}
                      />
                    </Compare>
                  )),
                ),
              )}
            </Box>
            <Box gap="small">
              <Compare>
                <Button secondary icon={<User />} size="small" />
              </Compare>
              <Compare>
                <Button secondary icon={<User />} />
              </Compare>
              <Compare>
                <Button secondary icon={<User />} size="large" />
              </Compare>
              <Compare>
                <Button secondary icon={<User />} size="xlarge" />
              </Compare>
            </Box>
            <Box gap="small">
              <Compare>
                <User size="small" />
              </Compare>
              <Compare>
                <User />
              </Compare>
              <Compare>
                <User size="large" />
              </Compare>
              <Compare>
                <User size="xlarge" />
              </Compare>
            </Box>
            <Box>
              <Compare guidingChild="last">
                <Accordion>
                  <AccordionPanel label="Panel 1">hi</AccordionPanel>
                  <AccordionPanel label="Panel 2">hi</AccordionPanel>
                </Accordion>
              </Compare>
            </Box>
            {/* <Box>
          <Avatar background="blue!" size="small">
            <Text weight={500}>TS</Text>
          </Avatar>
          <Avatar background="blue!">
            <Text weight={500}>TS</Text>
          </Avatar>
          <Avatar background="blue!" size="large">
            <Text weight={500}>TS</Text>
          </Avatar>
        </Box> */}

            <Compare>
              <CheckBox label="Checkbox label" />
            </Compare>
            <Compare guidingChild="last">
              <FormField label="Label">
                <CheckBox label="Checkbox label" />
              </FormField>
            </Compare>
            <Compare guidingChild="last">
              <FormField label="Label" error="There is an error.">
                <CheckBox label="Checkbox label" />
              </FormField>
            </Compare>
            <Compare guidingChild="last">
              <FormField
                label="Label"
                help="Here is help text"
                info="Here is info text"
              >
                <TextInput />
              </FormField>
            </Compare>
            <Compare guidingChild="last">
              <FormField label="Label" disabled>
                <TextInput disabled />
              </FormField>
            </Compare>
            <Compare>
              <CheckBox label="Switch label" toggle checked />
            </Compare>
            <Compare guidingChild="last">
              <CheckBoxGroup
                options={['Option 1', 'Option 2', 'Option 3']}
                value={['Option 2']}
              />
            </Compare>
            <Compare>
              <FormField label="Label">
                <CheckBoxGroup
                  options={['Option 1', 'Option 2', 'Option 3']}
                  value={['Option 2']}
                />
              </FormField>
            </Compare>
            <Compare>
              <DateInput
                format="mm/dd/yyyy"
                inline
                value={new Date().toISOString()}
              />
            </Compare>
            <Compare>
              <FileInput />
            </Compare>
            {/* <Compare>
                <MaskedPhoneExample />
              </Compare> */}
            <Compare>
              <Menu
                label="Menu"
                items={[
                  [{ label: 'Item 1' }, { label: 'Item 2' }],
                  [{ label: 'Delete' }],
                ]}
              />
            </Compare>
            <Compare>
              <Menu
                label="Menu"
                kind="toolbar"
                items={[
                  [{ label: 'Item 1' }, { label: 'Item 2' }],
                  [{ label: 'Delete' }],
                ]}
              />
            </Compare>
            <Compare>
              <NameValueList>
                <NameValuePair name="City">San Francisco</NameValuePair>
                <NameValuePair name="State">California</NameValuePair>
              </NameValueList>
            </Compare>
            <Compare>
              <Notification
                status="warning"
                message="this is a message"
                title="this is a title"
              />
            </Compare>
            <Compare>
              <PageHeader
                title="Page title"
                subtitle="Here is a subtitle for the page."
              />
            </Compare>
            <Compare>
              <Pagination numberItems={100} size="small" />
            </Compare>
            <Compare>
              <Pagination numberItems={100} />
            </Compare>
            <Compare>
              <Pagination numberItems={100} size="large" />
            </Compare>
            <Compare guidingChild="last">
              <RadioButtonGroup
                options={['Option 1', 'Option 2', 'Option 3']}
                value="Option 2"
              />
            </Compare>
            <Compare>
              <RangeInput value={60} />
            </Compare>
            <Compare>
              <Select
                options={['Option 1', 'Option 2', 'Option 3']}
                placeholder="Select option"
              />
            </Compare>
            <Compare>
              <SelectMultiple
                options={['Option 1', 'Option 2', 'Option 3']}
                value={['Option 1']}
              />
            </Compare>
            <Compare>
              <Spinner size="small" />
            </Compare>
            <Compare>
              <Spinner size="medium" />
            </Compare>
            <Compare>
              <Spinner size="large" />
            </Compare>
            <Compare>
              <StarRating value={2} />
            </Compare>
            <Compare>
              <Tabs>
                <Tab title="Tab 1" active />
                <Tab title="Tab 2" active />
                <Tab title="Tab 3" active />
              </Tabs>
            </Compare>
            <Compare>
              <Tag value="Value" name="Name" />
            </Compare>
            <Compare>
              <TextArea placeholder="Type something" />
            </Compare>
            <Compare>
              <TextInput placeholder="Placeholder" />
            </Compare>
            <Compare>
              <ThumbsRating value="like" />
            </Compare>
            <Compare>
              <DataTable
                columns={[
                  {
                    property: 'id',
                    header: 'ID',
                  },
                  {
                    property: 'firstName',
                    header: 'First name',
                  },
                  {
                    property: 'lastName',
                    header: 'Last name',
                    units: 'GB',
                  },
                ]}
                data={[
                  {
                    id: '2341234',
                    firstName: 'Taylor',
                    lastName: 'Seamans',
                  },
                  {
                    id: '4352351',
                    firstName: 'Oliver',
                    lastName: 'Plunkett',
                  },
                  {
                    id: '6439201',
                    firstName: 'Joelle',
                    lastName: 'Gregory',
                  },
                ]}
                sort={{
                  property: 'firstName',
                  direction: 'asc',
                }}
              />
            </Compare>
            <Compare>
              <Meter
                type="circle"
                values={[
                  {
                    value: 40,
                  },
                  {
                    value: 30,
                  },
                  {
                    value: 10,
                  },
                  {
                    value: 10,
                  },
                  {
                    value: 10,
                  },
                ]}
                max={100}
                size="small"
                thickness="medium"
              />
            </Compare>
          </PageContent>
        </Page>
      </ModeContext.Provider>
    </Grommet>
  );
};

export default StickerSheet;
