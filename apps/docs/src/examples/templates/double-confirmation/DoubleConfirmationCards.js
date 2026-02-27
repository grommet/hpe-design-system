import { Box, Button, Card, CardBody, Heading, Paragraph } from 'grommet';
import PropTypes from 'prop-types';

export const DoubleConfirmationCard = ({
  ids,
  title,
  subtitle,
  titleSize,
  footerBorder,
  ...rest
}) => (
  <Card
    alignSelf="center"
    round="medium"
    width="medium"
    elevation="large"
    {...rest}
  >
    <CardBody pad="medium" gap="medium">
      <Box gap="3xsmall">
        <Heading id={ids?.title} level={2} margin="none" size={titleSize}>
          {title}
        </Heading>
        <Paragraph id={ids?.subtitle} margin="none">
          {subtitle}
        </Paragraph>
      </Box>
      <Box
        id={ids?.footer}
        direction="row"
        border={footerBorder ? { style: 'dashed' } : undefined}
        gap="xsmall"
        justify="end"
        round="small"
      >
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
    </CardBody>
  </Card>
);

DoubleConfirmationCard.propTypes = {
  footerBorder: PropTypes.bool,
  ids: PropTypes.objectOf(PropTypes.string),
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

export const DoubleConfirmationExample = () => (
  <DoubleConfirmationCard
    title='Discard "Add application"?'
    subtitle="Your changes will not be applied."
  />
);

export const DoubleConfirmationCardAnatomy = ({ ...rest }) => (
  <DoubleConfirmationCard
    title='Discard "Add application"?'
    subtitle="Your changes will not be applied."
    footerBorder
    ids={{
      title: 'confirmation-title',
      subtitle: 'confirmation-subtitle',
      footer: 'confirmation-footer',
    }}
    {...rest}
  />
);
