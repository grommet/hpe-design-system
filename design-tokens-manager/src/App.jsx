import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Heading,
  Grommet,
  Form,
  FormField,
  TextInput,
  Page,
  Data,
  PageContent,
  Header,
  Grid,
  Button,
  Box,
  Text,
  DataSearch,
  DataFilters,
  DataContext,
  DataSummary,
  Toolbar,
  Anchor,
  SelectMultiple,
  // ToggleGroup,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import tokens from 'design-tokens/tree';
import {
  Github,
  LinkNext,
  Moon,
  Sun,
  Previous,
  Trash,
  // Copy,
} from 'grommet-icons';

const tokensArr = [];
Object.keys(tokens).forEach(mode => {
  Object.keys(tokens[mode]).forEach(token =>
    tokensArr.push({
      name: token,
      mode: mode,
      ...tokens[mode][token],
    }),
  );
});

const StyledBox = styled(Box)`
  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

const TokenValue = ({ value }) => {
  let content;
  if (typeof value === 'string' || typeof value === 'number') content = value;
  if (Array.isArray(value)) content = `[${value.join(', ')}]`;

  return <Text size="small">{content}</Text>;
};
const Tag = ({ name, badge, value, ...rest }) => (
  <StyledBox
    gap="xsmall"
    pad={{ horizontal: 'small', vertical: 'xsmall' }}
    border
    round="xsmall"
    flex={false}
    {...rest}
  >
    <Box direction="row" gap="small" align="center">
      <Text weight={500} color="text-strong">
        {name}
      </Text>
      <Box
        background="background-contrast"
        round="xsmall"
        pad={{ horizontal: 'xsmall' }}
      >
        <Text size="small" weight={500}>
          {badge}
        </Text>
      </Box>
    </Box>
    {value ? <TokenValue value={value} /> : undefined}
  </StyledBox>
);

const FilteredTokens = ({ selected, setSelected }) => {
  const { data } = useContext(DataContext);

  return (
    <Box
      align="start"
      gap="xsmall"
      overflow="auto"
      style={{ height: 'calc(100vh - 196px)' }}
    >
      {data.map(token => (
        <Tag
          key={`${token.name}-${token.mode}`}
          badge={token.mode}
          name={token.name}
          onClick={() =>
            selected.name === token.name && selected.mode === token.mode
              ? setSelected({})
              : setSelected({ name: token.name, mode: token.mode })
          }
          active={selected.name === token.name && selected.mode === token.mode}
        />
      ))}
    </Box>
  );
};

const buildTree = (selectedToken, showValue) => {
  const { mode, name } = selectedToken;
  const usedBy = tokens[mode][name].usedBy;
  return (
    <Box
      key={`${name}-${mode}`}
      direction="row"
      gap="small"
      align="start"
      flex={false}
    >
      <Tag
        name={name}
        badge={mode}
        value={showValue ? tokens[mode][name]['$value'] : undefined}
      />
      {usedBy?.length ? (
        <Box direction="row" gap="small" align="start" flex={false}>
          <Box pad={{ vertical: 'xsmall' }}>
            <LinkNext height="medium" />
          </Box>
          <Box gap="small">{usedBy?.map(t => buildTree(t))}</Box>
        </Box>
      ) : undefined}
    </Box>
  );
};

const Visualizer = () => {
  const [selected, setSelected] = useState({});

  return (
    <Page kind="full">
      <Data
        data={tokensArr}
        properties={{
          mode: { label: 'Mode' },
          name: { filter: false },
          $type: { label: 'Type' },
        }}
      >
        <Grid columns={['medium', 'flex']}>
          <Box gap="small" pad="medium" background="background-front">
            <Box>
              <Toolbar>
                <Box flex>
                  <DataSearch />
                </Box>
                <DataFilters drop />
              </Toolbar>
              <DataSummary />
            </Box>
            <FilteredTokens selected={selected} setSelected={setSelected} />
          </Box>
          <PageContent overflow="auto" flex={false} fill>
            <Box pad={{ vertical: 'medium' }}>
              {selected.name
                ? buildTree(selected, true)
                : 'Select a token to see dependencies.'}
            </Box>
          </PageContent>
        </Grid>
      </Data>
    </Page>
  );
};

const colors = ['background', 'foregroundColor', 'borderColor'];
const dimensions = ['paddingX', 'paddingY', 'borderRadius', 'borderWidth'];

const Builder = () => {
  const [value, setValue] = useState({
    prefix: 'hpe',
    component: '',
    size: ['medium'],
    variants: [{ variant: '' }],
    state: ['enabled', 'disabled', 'hover', 'selected'],
    property: [...dimensions, ...colors],
  });

  // const [view, setView] = useState('compact');
  const [tokens, setTokens] = useState([]);

  const addVariant = () => {
    const newVariant = { variant: '' };
    const newVariants = [...value.variants, newVariant];
    setValue({
      ...value,
      variants: newVariants,
    });
  };

  const removeVariant = index => {
    if (value.variants && value.variants.length > 0) {
      setValue({
        ...value,
        variants: value.variants.filter((v, _idx) => _idx !== index),
      });
    }
  };

  const handleSubmit = ({ value: formValue }) => {
    const nextTokens = [];
    formValue.size.forEach(size => {
      formValue.variants.forEach(variant => {
        formValue.state.forEach(state => {
          dimensions.forEach(property => {
            nextTokens.push(
              `${formValue.prefix}.${formValue.component}.${size}.${
                variant.variant ? `${variant.variant}.` : ''
              }${state}.${property}`,
            );
          });
        });
      });
    });

    formValue.variants.forEach(variant => {
      formValue.state.forEach(state => {
        colors.forEach(property => {
          nextTokens.push(
            `${formValue.prefix}.${formValue.component}.${
              variant.variant ? `${variant.variant}.` : ''
            }${state}.${property}`,
          );
        });
      });
    });
    setTokens(nextTokens);
    // let res = {};
    // nextTokens.forEach(token => {
    //   const parts = token.split('.');
    //   parts.forEach(part => {
    //     if ()
    //   })
    // });
    // console.log(res);
  };

  let VariantGroup = null;
  if (value.variants !== undefined) {
    VariantGroup = value.variants.map((phone, index) => (
      <Box key={index} direction="row" align="end" gap="small">
        <Box flex>
          <FormField
            label={`Variant ${index + 1}`}
            name={`variants[${index}].variant`}
            htmlFor={`variants[${index}].variant`}
          >
            <TextInput
              name={`variants[${index}].variant`}
              id={`variants[${index}].variant`}
            />
          </FormField>
        </Box>
        <Box margin={{ bottom: 'xsmall' }}>
          <Button
            icon={<Trash />}
            aria-label={`Remove variant ${index + 1}`}
            onClick={() => removeVariant(index)}
          />
        </Box>
      </Box>
    ));
  }

  return (
    <Page kind="full">
      <Grid columns={['auto', 'flex']} gap="large">
        <Box gap="small" pad="medium" background="background-front">
          <Box gap="xsmall" flex={false}>
            <Anchor as={Link} to="/" label="Home" icon={<Previous />} />
            <Heading margin="none">Token builder</Heading>
          </Box>

          <Form value={value} onChange={setValue} onSubmit={handleSubmit}>
            <FormField
              name="prefix"
              htmlFor="prefix"
              label="Prefix"
              contentProps={{ width: 'medium' }}
            >
              <TextInput name="prefix" id="prefix" value="hpe" readOnly />
            </FormField>
            <FormField
              name="component"
              htmlFor="component"
              label="Component"
              help="The component or component family (e.g., inputs) these tokens are for."
              contentProps={{ width: 'medium' }}
              required
            >
              <TextInput name="component" id="component" />
            </FormField>
            <FormField
              label="Size"
              name="size"
              htmlFor="size"
              contentProps={{ width: 'medium' }}
            >
              <SelectMultiple
                options={['small', 'medium', 'large', 'xlarge']}
                name="size"
                id="size"
                showSelectedInline
              />
            </FormField>

            <Box gap="small" pad={{ vertical: 'medium' }}>
              <Box>
                <Heading level={3} margin="none">
                  Variants
                </Heading>
              </Box>
              <Box>{VariantGroup}</Box>
              <Button
                alignSelf="end"
                label="Add variant"
                secondary
                onClick={() => addVariant()}
              />
            </Box>
            <FormField
              label="State"
              name="state"
              htmlFor="state"
              contentProps={{ width: 'medium' }}
            >
              <SelectMultiple
                options={[
                  'enabled',
                  'disabled',
                  'hover',
                  'selected',
                  'readOnly',
                ]}
                name="state"
                id="state"
                showSelectedInline
              />
            </FormField>
            <FormField
              label="Property"
              name="property"
              htmlFor="property"
              contentProps={{ width: 'medium' }}
            >
              <SelectMultiple
                options={[...dimensions, ...colors]}
                name="property"
                id="property"
                showSelectedInline
              />
            </FormField>

            <Button
              label="Generate tokens"
              primary
              type="submit"
              margin={{ top: 'medium' }}
            />
          </Form>
        </Box>
        <PageContent>
          <Box pad={{ vertical: 'medium' }} gap="medium">
            {/* <Box direction="row" gap="small">
              <ToggleGroup
                options={[
                  { label: 'Compact view', value: 'compact' },
                  { label: 'Expanded view', value: 'expanded' },
                ]}
                value={view}
                onToggle={({ value: nextValue }) => setView(nextValue)}
              />
              <Button
                label="Copy "
                icon={<Copy />}
                alignSelf="start"
                secondary
              />
            </Box> */}
            <Box>
              {tokens.length ? (
                tokens.map(token => <Text key={token}>{token}</Text>)
              ) : (
                <Text>No tokens have been generated.</Text>
              )}
            </Box>
          </Box>
        </PageContent>
      </Grid>
    </Page>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false,
  );
  useEffect(() => {
    if (darkMode) localStorage.setItem('darkMode', 'true');
    else localStorage.setItem('darkMode', 'false');
  }, [darkMode]);

  return (
    <Grommet
      background="background-back"
      theme={hpe}
      themeMode={darkMode ? 'dark' : 'light'}
      full="min"
    >
      <BrowserRouter>
        <Header
          background="background-front"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          border={{ side: 'bottom', color: 'border-weak' }}
        >
          <Button as={Link} to="/">
            <Text weight={500} color="text-strong">
              Design Token Visualizer
            </Text>
          </Button>
          <Box direction="row" gap="xsmall">
            <Button as={Link} to="/builder" label="Token builder" />
            <Button
              icon={<Github />}
              href="https://github.com/grommet/hpe-design-system/tree/design-tokens/design-tokens/tokens"
              target="_blank"
              rel="noopener noreferrer"
              tip="View tokens in Github"
            />
            <Button
              icon={darkMode ? <Moon /> : <Sun />}
              onClick={() => setDarkMode(!darkMode)}
              tip={`Swith to ${darkMode ? 'light' : 'dark'} mode`}
            />
          </Box>
        </Header>
        <Routes>
          <Route path="/" element={<Visualizer />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
