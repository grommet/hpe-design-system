import { Box, Card, CardBody, Text } from 'grommet';
import PropTypes from 'prop-types';
import Link from 'next/link';

export const LinkCard = ({ link, title, icon }) => {
  const Wrapper = Link;
  const wrapperProps = {
    href: link,
    passHref: true,
  };
  const Icon = icon;

  return (
    <Wrapper {...wrapperProps}>
      <Card forwardedAs="a" target="_blank" style={{ textDecoration: 'none' }}>
        <CardBody direction="row" gap="small">
          <Box
            pad="small"
            justify="center"
            round="small"
            background="background-back"
            flex={false}
          >
            <Icon size="large" />
          </Box>
          <Text color="text-strong" weight="bold" size="xlarge">
            {title}
          </Text>
        </CardBody>
      </Card>
    </Wrapper>
  );
};

LinkCard.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};
