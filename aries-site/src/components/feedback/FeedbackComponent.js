import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  Heading,
  Paragraph,
  Layer,
  RadioButtonGroup,
  ResponsiveContext,
} from 'grommet';
import { Like, Dislike, FormClose, Star, StarOutline } from 'grommet-icons';

export const FeedbackComponent = ({
  children,
  kind,
  modal,
  onChange,
  onClose,
  onClickOutside,
  onEsc,
  onSubmit,
  show,
  subTitle,
  title,
  value,
}) => {
  const size = useContext(ResponsiveContext);

  let content = (
    <Box
      fill="vertical"
      overflow="auto"
      width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad="medium"
    >
      <Box gap="small">
        <Identifier
          onClick={onClickOutside}
          title={title}
          subtitle={subTitle}
          modal={modal}
        />
      </Box>
      <Box margin={{ vertical: 'small' }}>
        <Form
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          method="post"
          validate="submit"
        >
          {' '}
          {kind !== 'rating' ? <StarRating /> : <ThumbRating />}
          {children}
        </Form>
      </Box>
      <Box justify="end" gap="medium" direction="row">
        <Button onClick={onClickOutside} label="Cancel" />
        <Button label="Submit" primary type="submit" />
      </Box>
    </Box>
  );

  if (modal)
    content = show && (
      <Layer
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        position="bottom-right"
        modal={modal}
        onClickOutside={onClose}
        onEsc={onEsc}
      >
        {content}
      </Layer>
    );

  return content;
};

const Identifier = ({ onClick, title, subtitle, modal }) => (
  <Box>
    <Box align="center" direction="row" justify="between">
      <Heading level={4} size="small" margin={{ vertical: 'none' }}>
        {title}
      </Heading>
      {modal && (
        <Box justify="center">
          <Button onClick={onClick} icon={<FormClose />} />
        </Box>
      )}
    </Box>
    <Paragraph margin="none">{subtitle}</Paragraph>
  </Box>
);

const ThumbRating = ({ color, value, onChange, ...rest }) => {
  const [rating, setRating] = useState(null);
  return (
    <RadioButtonGroup
      direction="row"
      options={['thumbsUp', 'thumbsDown']}
      value={rating}
      name="ratings"
      onChange={event => {
        setRating(event.target.value);
        if (onChange) onChange(event);
      }}
      {...rest}
    >
      {(option, { checked }) => {
        const Icon = option === 'thumbsUp' ? Like : Dislike;
        return <Icon color={checked ? 'green' : 'border-strong'} />;
      }}
    </RadioButtonGroup>
  );
};

const StarRating = ({ color, value, onChange, ...rest }) => {
  const [rating, setRating] = useState(value);

  const options = [];
  for (let i = 0; i < 5; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      value={rating}
      name="starRating"
      onChange={event => {
        const adjustedRating = parseInt(event.target.value, 10) + 1;
        setRating(adjustedRating);
      }}
      {...rest}
    >
      {option =>
        option < rating ? <Star color={color} /> : <StarOutline color={color} />
      }
    </RadioButtonGroup>
  );
};

Identifier.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
};

FeedbackComponent.propTypes = {
  kind: PropTypes.string,
  modal: PropTypes.bool,
  onChange: PropTypes.func,
  onClickOutside: PropTypes.func,
  onEsc: PropTypes.func,
  onSubmit: PropTypes.func,
  show: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};
