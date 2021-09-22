import React, { useContext } from 'react';
import {
  Box,
  Button,
  CheckBoxGroup,
  DateInput,
  Form,
  FormField,
  Header,
  Heading,
  Text,
  TextInput,
  ResponsiveContext,
  Select,
  RangeInput,
} from 'grommet';

export const RangeInputInFormExample = () => {
  const [guests, setGuests] = React.useState();
  const [price, setPrice] = React.useState('200');
  const [dates, setDates] = React.useState([
    '2020-07-31T15:27:42.920Z',
    '2020-08-07T15:27:42.920Z',
  ]);
  const size = useContext(ResponsiveContext);

  const onChange = event => {
    const nextDates = event.value;
    setDates(nextDates);
  };
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <Box gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Book a Hotel
        </Heading>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          validate="blur"
          messages={{
            required: 'This is a required field.',
          }}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
        >
          <FormField label="Dates" htmlFor="date-hotel" name="date">
            <DateInput
              value={dates}
              name="dateinput-range"
              id="dateinput-range"
              format="mm/dd/yyyy-mm/dd/yyyy"
              onChange={onChange}
            />
          </FormField>
          <FormField
            required
            label="Location"
            htmlFor="location"
            name="location"
          >
            <TextInput
              placeholder="Los Angeles"
              id="location"
              name="location"
            />
          </FormField>
          <FormField
            label="Guests"
            htmlFor="guests-hotel"
            name="guests"
            required
          >
            <Select
              options={['1', '2', '3', '4', '5']}
              value={guests}
              onChange={({ option }) => setGuests(option)}
              id="guests"
              name="guests"
            />
          </FormField>
          <FormField htmlFor="price" name="price" label="Price">
            <Box
              align="center"
              pad={{ horizontal: '11px', vertical: '5px' }}
              direction="row"
              gap="medium"
              width="large"
            >
              <Text weight={600}>1</Text>
              <RangeInput
                max={500}
                min={1}
                value={price}
                onChange={event => setPrice(event.target.value)}
              />
              <Text weight={600}>500</Text>
            </Box>
          </FormField>
          <FormField label="Offers" name="hotel-offers" htmlFor="hotel-offers">
            <CheckBoxGroup
              options={[
                'Free Cancelations',
                'WIFI',
                'Free Breakfast',
                'Pool',
                'Jacuzzi',
              ]}
              name="checkbox-offers"
              id="offers-checkboxgroup"
            />
          </FormField>
          <Box
            align={size !== 'small' ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Book" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
