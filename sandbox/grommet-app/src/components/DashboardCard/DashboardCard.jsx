// import { useContext } from 'react';
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  //   ThemeContext,
  Text,
} from 'grommet';
import { LinkNext } from 'grommet-icons';

export const DashboardCard = ({
  icon,
  level,
  title,
  subtitle,
  children,
  href,
  footer,
  ...rest
}) => {
  //   const { heading } = useContext(ThemeContext);

  //   const cardHeadingStyle = {
  //     1: heading.level[2],
  //     2: heading.level[2],
  //     3: heading.level[2],
  //     4: heading.level[2],
  //     5: heading.level[2],
  //     6: heading.level[2],
  //   };
  return (
    <Card {...rest}>
      <CardHeader align="start">
        <Box direction="row" gap="small" align="start">
          {icon}
          <Box gap="xsmall">
            <Heading level={level} margin="none">
              {title}
            </Heading>

            <Text size="small">{subtitle}</Text>
          </Box>
        </Box>

        <LinkNext a11yTitle={`Go to ${title}`} color="brand" />
      </CardHeader>
      <CardBody pad={{ horizontal: 'medium' }}>{children}</CardBody>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
