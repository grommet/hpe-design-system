import {
  Box,
  Heading,
  Paragraph,
  type BoxProps,
  type HeadingProps,
  Text,
} from 'grommet';

interface IdentifierProps extends BoxProps {
  description?: string;
  heading: string;
  icon?: React.ReactNode;
  level: HeadingProps['level'];
  pretitle?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

const sizeMap = {
  xsmall: { heading: 'xsmall', description: 'small', pretitle: 'xsmall' },
  small: { heading: 'small', description: 'medium', pretitle: 'small' },
  medium: { heading: 'medium', description: 'large', pretitle: 'medium' },
  large: { heading: 'large', description: 'xlarge', pretitle: 'large' },
  xlarge: { heading: 'xlarge', description: 'xxlarge', pretitle: 'xlarge' },
};

export const Identifier = ({
  description,
  heading,
  icon,
  level,
  pretitle,
  size = 'medium',
  ...rest
}: IdentifierProps) => {
  return (
    <Box direction="row" gap="small" {...rest}>
      {icon && <Box pad={{ top: 'xsmall' }}>{icon}</Box>}
      <Box flex={false}>
        {pretitle && <Text size={sizeMap[size].pretitle}>{pretitle}</Text>}
        <Heading level={level} margin="none" size={sizeMap[size].heading}>
          {heading}
        </Heading>
        {description && (
          <Paragraph margin="none" size={sizeMap[size].description}>
            {description}
          </Paragraph>
        )}
      </Box>
    </Box>
  );
};
