import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Text,
  TextArea,
  StarRating,
} from 'grommet';
import { ModalBody, ModalFooter } from '../ModalDialog';

export const PowerDeviceFeedback = ({
  showConfirmation,
  onChange,
  onSubmit,
  onClose,
  rating,
}) => (
  <Form
    method="post"
    validate="submit"
    kind="survey"
    onChange={onChange}
    onSubmit={onSubmit}
  >
    <Box gap="medium">
      <ModalBody>
        <FormField
          // remove border when using StarRating & ThumbRating
          contentProps={{
            border: false,
          }}
          label="How easy was it for you to power off your selected devices?"
          htmlFor="power-rating"
          name="power-rating-example"
        >
          <StarRating id="power-rating" name="power-rating-example" />
        </FormField>
        {rating && (
          <Box gap="medium">
            <FormField
              name="power-textArea-example"
              htmlFor="power-text-area-example"
              label="How satisfied were you with this process?"
            >
              <TextArea
                name="power-textArea-example"
                id="power-text-area-example"
                placeholder="i.e. ideas, inspirations, or concerns"
              />
            </FormField>
          </Box>
        )}
      </ModalBody>
      <ModalFooter justify="end">
        {!showConfirmation ? (
          <Box direction="row" gap="small">
            <Button label="Cancel" onClick={onClose} />
            <Button label="Submit Feedback" primary type="submit" />
          </Box>
        ) : (
          <Text weight='bold'>Thank you for your response!</Text>
        )}
      </ModalFooter>
    </Box>
  </Form>
);

PowerDeviceFeedback.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  rating: PropTypes.object,
};