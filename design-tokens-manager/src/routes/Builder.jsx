import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Form,
  FormField,
  TextInput,
  Page,
  PageContent,
  Grid,
  Button,
  Box,
  Text,
  Anchor,
  SelectMultiple,
  // ToggleGroup,
} from 'grommet';

import {
  Previous,
  Trash,
  // Copy,
} from 'grommet-icons';

const colors = ['background', 'foregroundColor', 'borderColor'];
const dimensions = [
  'paddingX',
  'paddingY',
  'borderRadius',
  'borderWidth',
  'minHeight',
];

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
  const [tokenObject, setTokenObject] = useState({});

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
    const nextTokenObj = {};
    const nextTokens = [];
    if (!(formValue.component in tokenObject))
      nextTokenObj[formValue.component] = {};
    formValue.size.forEach(size => {
      nextTokenObj[formValue.component][size] = {};
      formValue.variants.forEach(variant => {
        nextTokenObj[formValue.component][size][variant.variant] = {};
        formValue.state.forEach(state => {
          nextTokenObj[formValue.component][size][variant.variant][state] = {};
          dimensions.forEach(property => {
            nextTokenObj[formValue.component][size][variant.variant][state][
              property
            ] = {
              $type: 'number',
              $value:
                variant.variant === 'default' && state === 'enabled'
                  ? 0
                  : `{${formValue.component}.${size}.${
                      variant.variant ? `default.` : ''
                    }enabled.${property}}`,
            };

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
      nextTokenObj[formValue.component][variant.variant] = {};
      formValue.state.forEach(state => {
        nextTokenObj[formValue.component][variant.variant][state] = {};
        colors.forEach(property => {
          nextTokenObj[formValue.component][variant.variant][state][property] =
            {
              $type: 'color',
              $value:
                variant.variant === 'default' && state === 'enabled'
                  ? '#FFF'
                  : `{${formValue.component}.${
                      variant.variant
                        ? `${state === 'enabled' ? 'default' : variant}.`
                        : ''
                    }enabled.${property}}`,
            };
          nextTokens.push(
            `${formValue.prefix}.${formValue.component}.${
              variant.variant ? `${variant.variant}.` : ''
            }${state}.${property}`,
          );
        });
      });
    });
    setTokens(nextTokens);
    setTokenObject(nextTokenObj);
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
              {/* {JSON.stringify(tokenObject)} */}
            </Box>
          </Box>
        </PageContent>
      </Grid>
    </Page>
  );
};

export { Builder };
