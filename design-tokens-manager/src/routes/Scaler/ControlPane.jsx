import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  RangeInput,
  Select,
  Text,
} from 'grommet';

const RangeWrapper = ({ children, max, min }) => {
  return (
    <Box
      direction="row"
      gap="small"
      align="center"
      justify="between"
      margin={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
    >
      <Text size="small" weight={500}>
        {min}
      </Text>
      {children}
      <Text size="small" weight={500}>
        {max}
      </Text>
    </Box>
  );
};

export const ControlPane = ({ defaultValues, values, setValues, ...rest }) => {
  const onChange = nextValues => {
    setValues(nextValues);
  };

  const BASE_OPTIONS = [4, 6, 8, 12, 16, 18, 24];
  const FACTOR_OPTIONS = [1.2, 1.25, 1.333, 1.414, 1.5, 1.618, 2];
  const STEP_OPTIONS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <Box
      background="background-front"
      flex={false}
      gap="medium"
      pad="medium"
      round="medium"
      {...rest}
    >
      <Heading level={2} margin="none">
        Scale settings
      </Heading>
      <Box width={{ min: 'small', max: 'medium' }}>
        <Form value={values} onChange={onChange}>
          <Box width={{ min: 'xsmall', max: 'small' }}>
            <FormField
              htmlFor="base__input"
              name="base"
              label="Base unit"
              help="Foundation unit for the scale"
            >
              <Select id="base" name="base" options={BASE_OPTIONS} />
            </FormField>
            <FormField
              htmlFor="nearest__input"
              name="nearest"
              label="Grid unit"
              help="Scale steps will be rounded to the nearest grid unit"
            >
              <Select id="nearest" name="nearest" options={BASE_OPTIONS} />
            </FormField>
            <FormField
              htmlFor="factor__input"
              name="factor"
              label="Scale ratio"
            >
              <Select
                id="factor"
                name="factor"
                // TO DO: Make a create option version of this
                options={FACTOR_OPTIONS}
              />
            </FormField>
            <FormField label="Steps" htmlFor="steps__input" name="steps">
              <Select id="steps" name="steps" options={STEP_OPTIONS} />
            </FormField>
          </Box>
          {/* <FormField
            label="Spacing factor"
            htmlFor="spacing-factor"
            name="spacing-factor"
          >
            <RangeWrapper min={-5} max={5}>
              <RangeInput
                id="spacing-factor"
                name="spacing-factor"
                min={-5}
                max={5}
                step={1}
              />
            </RangeWrapper>
          </FormField> */}
          {/* <FormField
            label="Type factor"
            htmlFor="type-factor"
            name="type-factor"
          >
            <RangeWrapper min={-5} max={5}>
              <RangeInput
                id="type-factor"
                name="type-factor"
                min={-5}
                max={5}
                step={1}
              />
            </RangeWrapper>
          </FormField> */}
        </Form>
      </Box>
      <Button
        type="reset"
        label="Reset"
        kind="secondary"
        alignSelf="start"
        onClick={() => setValues(defaultValues)}
      />
    </Box>
  );
};
