/* eslint-disable grommet/button-icon-a11ytitle */
/* eslint-disable grommet/spinner-message */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Menu,
  Grommet,
  Page,
  Heading,
  PageContent,
  PageHeader,
  Text,
  Stack,
  ThemeContext,
  Paragraph,
  Accordion,
  AccordionPanel,
  DateInput,
  Pagination,
  Spinner,
  Tag,
  Select,
  FormField,
} from 'grommet';
import { User } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { current as hpeCurrent } from '../themes/testTheme';
import { Meta } from '../components';
import {
  BannerNotificationInfo,
  CheckBoxGroupSimpleExample,
  CheckBoxSimpleExample,
  MaskedPhoneExample,
  NameValueListSimpleExample,
  RadioButtonGroupExample,
  RangeInputExample,
  SearchExample,
  SelectExample,
  SelectMultipleSimpleExample,
  TabsExample,
  TextAreaExample,
  TextInputExample,
} from '../examples';

const title = 'Sticker Sheet';

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
const sizes = ['small', 'medium', 'large', 'xlarge'];

const ModeContext = React.createContext({});

const Compare = ({ children, ...rest }) => {
  const { mode } = React.useContext(ModeContext);
  return (
    <Stack {...rest}>
      <ThemeContext.Extend value={hpe}>
        <Box
          align="start"
          style={
            // eslint-disable-next-line no-nested-ternary
            mode === 'Compare diffs'
              ? { opacity: 0.5, filter: 'invert(1)', color: 'green' }
              : mode === 'tokens'
              ? { visibility: 'hidden' }
              : {}
          }
        >
          {children}
        </Box>
      </ThemeContext.Extend>

      <ThemeContext.Extend value={hpeCurrent}>
        <Box
          align="start"
          style={mode === 'v3' ? { visibility: 'hidden' } : {}}
        >
          {children}
        </Box>
      </ThemeContext.Extend>
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

  const contextValue = useMemo(() => {
    return {
      mode,
    };
  }, [mode]);
  return (
    <Grommet>
      <ThemeContext.Extend value={hpeCurrent}>
        <Meta
          title={title}
          canonicalUrl="https://design-system.hpe.design/theme-test"
        />
        <ModeContext.Provider value={contextValue}>
          <Page kind="full" pad={{ bottom: 'xlarge' }}>
            <PageContent align="start" gap="medium">
              <PageHeader
                title="Theme upgrade testing"
                subtitle={`To be used for visual regression comparisons from 
            current theme to the next.`}
                actions={
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line grommet/formfield-htmlfor-id, grommet/formfield-name
                  <FormField label="View mode">
                    <Select
                      options={['v3', 'tokens', 'Compare diffs']}
                      value={mode}
                      onChange={({ option }) => setMode(option)}
                    />
                  </FormField>
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
                {[
                  'xsmall',
                  'small',
                  'medium',
                  'large',
                  'xlarge',
                  'xxlarge',
                ].map(size => (
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
                <Compare>
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
                <CheckBoxSimpleExample />
              </Compare>
              <Compare>
                <CheckBoxGroupSimpleExample />
              </Compare>
              <Compare>
                <DateInput format="mm/dd/yyyy" inline />
              </Compare>
              <Compare>
                <MaskedPhoneExample />
              </Compare>
              <Compare>
                <Menu
                  label="Menu"
                  items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
                />
              </Compare>
              <Compare>
                <Menu
                  label="Menu"
                  kind="toolbar"
                  items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
                />
              </Compare>
              <Compare>
                <NameValueListSimpleExample />
              </Compare>
              <Compare>
                <BannerNotificationInfo />
              </Compare>
              <Compare>
                <PageHeader
                  title="Page title"
                  subtitle="Here is a subtitle for the page."
                />
              </Compare>
              <Compare>
                <Pagination numberItems={100} />
              </Compare>
              <Compare>
                <RadioButtonGroupExample />
              </Compare>
              <Compare>
                <RangeInputExample />
              </Compare>
              <Compare>
                <SearchExample />
              </Compare>
              <Compare>
                <SelectExample />
              </Compare>
              <Compare>
                <SelectMultipleSimpleExample />
              </Compare>
              <Compare>
                <Spinner />
              </Compare>
              <Compare>
                <Spinner size="medium" />
              </Compare>
              <Compare>
                <Spinner size="large" />
              </Compare>
              <Compare>
                <TabsExample />
              </Compare>
              <Compare>
                <Tag value="Value" name="Name" />
              </Compare>
              <Compare>
                <TextAreaExample />
              </Compare>
              <Compare>
                <TextInputExample />
              </Compare>
            </PageContent>
          </Page>
        </ModeContext.Provider>
      </ThemeContext.Extend>
    </Grommet>
  );
};

export default StickerSheet;
