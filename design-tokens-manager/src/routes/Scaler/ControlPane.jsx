import { Box, Button, Form, FormField, Heading, Select } from 'grommet';

export const ControlPane = ({
  defaultValues,
  values,
  setValues,
  scale,
  ...rest
}) => {
  const onChange = nextValues => {
    setValues(nextValues);
  };

  const BASE_OPTIONS = [4, 6, 8, 12, 16, 18, 24];
  const GRID_OPTIONS = [1, 2, ...BASE_OPTIONS];
  const FACTOR_OPTIONS = [1, 1.2, 1.25, 1.333, 1.414, 1.5, 1.618, 2];
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
              <Select id="nearest" name="nearest" options={GRID_OPTIONS} />
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
            <FormField
              label="Content base"
              htmlFor="content-base__input"
              name="steps"
              help="Choose a unit from the current scale to serve as 'medium' content size"
            >
              <Select id="content-base" name="content-base" options={scale} />
            </FormField>
          </Box>
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
