import {
  Box,
  Button,
  Card,
  CardBody,
  Footer,
  Heading,
  Paragraph,
} from 'grommet';
import PropTypes from 'prop-types';

export const DoubleConfirmationCard = ({
  title,
  subtitle,
  titleSize,
  cardBodyGap,
  ...rest
}) => (
  <Card
    alignSelf="center"
    round="medium"
    width="medium"
    elevation="large"
    {...rest}
  >
    <CardBody pad="medium" gap={cardBodyGap || 'medium'}>
      <Box gap="3xsmall">
        <Heading level={2} margin="none" size={titleSize}>
          {title}
        </Heading>
        <Paragraph margin="none">{subtitle}</Paragraph>
      </Box>
      <Footer direction="row" gap="xsmall" justify="end" round="small">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Footer>
    </CardBody>
  </Card>
);

DoubleConfirmationCard.propTypes = {
  cardBodyGap: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleSize: PropTypes.string,
};

export const DoubleConfirmationCardPreview = ({ ...rest }) => (
  <Box background="background-back" pad="medium">
    <DoubleConfirmationCard
      title="Discard Changes?"
      subtitle="Your changes will not be applied."
      {...rest}
    />
  </Box>
);
