import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  NameValueList,
  NameValuePair,
  Text,
  type BoxProps,
} from 'grommet';
import { TextEmphasis } from '../../../components';
import type { AdoptionLevelSummary } from './summarizeAdoption';

interface AdoptionLevelCardProps extends BoxProps {
  level: string;
  levelNumber: number;
  summary: AdoptionLevelSummary;
}

export const AdoptionLevelCard = ({ 
  level, 
  levelNumber,
  summary,
  ...rest
}: AdoptionLevelCardProps) => {
  const adoptionPercentage = Math.round(
    ((summary.design + summary.code) / (summary.total * 2)) * 100
  );

  return (
    <Card {...rest}>
      <CardHeader pad={{ horizontal: 'medium', top: 'small' }}>
        <Box>
          <Text size="small" color="text-weak">
            {level}
          </Text>
          <Heading level={3} margin="none">
            Level {levelNumber}
          </Heading>
        </Box>
      </CardHeader>
      <CardBody
        align="center"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        direction="row"
      >
        <Text size="large">
          <TextEmphasis size="xxlarge">
            {`${adoptionPercentage}%`}
          </TextEmphasis>
          {' adoption'}
        </Text>
        <NameValueList
          fill="horizontal"
          gap="xsmall"
          layout="grid"
          pairProps={{ direction: 'column-reverse' }}
          nameProps={{
            align: 'center',
          }}
          valueProps={{
            width: { max: 'xsmall' },
            align: 'center',
          }}
        >
          <NameValuePair name={<Text>Design</Text>}>
            <TextEmphasis>{summary.design} of {summary.total}</TextEmphasis>
          </NameValuePair>
          <NameValuePair name={<Text>Code</Text>}>
            <TextEmphasis>{summary.code} of {summary.total}</TextEmphasis>
          </NameValuePair>
        </NameValueList>
      </CardBody>
    </Card>
  );
};
