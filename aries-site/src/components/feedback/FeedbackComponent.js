import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  Heading,
  Paragraph,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { Like, Dislike, FormClose, Star } from 'grommet-icons';

export const FeedbackComponent = ({
  children,
  kind,
  modal,
  onChange,
  onClickOutside,
  onEsc,
  onSubmit,
  show,
  subTitle,
  title,
  value,
}) => {
  return (
    <>
      {!modal ? (
        <Feedback
          onClickOutside={onClickOutside}
          title={title}
          subTitle={subTitle}
          onChange={onChange}
          value={value}
          children={children}
          onSubmit={onSubmit}
          kind={kind}
          modal={modal}
        />
      ) : (
        <>
          {show && (
            <Layer
              margin={{ vertical: 'xlarge', horizontal: 'large' }}
              position="bottom-right"
              modal={modal}
              onClickOutside={onClickOutside}
              onEsc={onEsc}
            >
              <Feedback
                onClickOutside={onClickOutside}
                title={title}
                subTitle={subTitle}
                onChange={onChange}
                value={value}
                children={children}
                onSubmit={onSubmit}
                kind={kind}
                modal={modal}
              />
            </Layer>
          )}
        </>
      )}
    </>
  );
};

const Feedback = ({
  onClickOutside,
  title,
  subTitle,
  onChange,
  value,
  kind,
  children,
  onSubmit,
  modal,
}) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill="vertical"
      overflow="auto"
      width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad="medium"
      gap="medium"
    >
      <Box gap="small">
        <Identifier
          onClick={onClickOutside}
          title={title}
          subtitle={subTitle}
          modal={modal}
        />
        {kind !== 'rating' ? <StarRating /> : <ThumbRating />}
      </Box>
      <Box margin={{ vertical: 'small' }}>
        <Form
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          method="post"
          validate="submit"
        >
          {children}
        </Form>
      </Box>
      <Box justify="end" gap="medium" direction="row">
        <Button onClick={onClickOutside} label="Cancel" />
        <Button label="Submit" primary type="submit" />
      </Box>
    </Box>
  );
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

const ThumbRating = () => {
  const [rating, setRating] = useState(null);
  return (
    <Box direction="row">
      <Button
        icon={<Like color={rating === 'like' ? 'blue' : 'pink'} />}
        onClick={() => setRating('like')}
      />
      <Button
        icon={<Dislike color={rating === 'dislike' ? 'blue' : 'pink'} />}
        onClick={() => setRating('dislike')}
      />
    </Box>
  );
};
const StarRating = ({ value }) => {
  const [rating, setRating] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <Button
            icon={<Star color={onClick ? 'blue' : 'pink'} />}
            onClick={() => setRating(ratingValue)}
          />
        );
      })}
    </div>
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
