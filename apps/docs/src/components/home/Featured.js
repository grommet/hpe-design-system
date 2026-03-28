import React, { useContext } from 'react';

import {
  Box,
  Heading,
  PageContent,
  Paragraph,
  Button,
  ResponsiveContext,
} from 'grommet';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <PageContent {...rest}>
      <Box
        pad={{ bottom: '3xlarge' }}
        align="center"
        justify="center"
        fill={false}>
        <Box
          direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
          gap="medium"
          margin={{ bottom: '3xlarge' }}
          justify="center"
          align="center"
        >
          {featured.map(({ name, description, icon }) => (
            <Box
              key={name}
              width={!['xsmall', 'small'].includes(size) ? 'medium' : 'large'}
              round="xlarge"
              align="center"
              justify="center"
              pad="xlarge"
              background="background-front"
            >
              {/* Icon with background color */}
              <Box
                background="background-contrast"
                pad="medium"
                round="small"
                margin={{ bottom: 'small' }}
                justify="center"
              >
                {icon}
              </Box>
              <Heading
                size="small"
                level={2}
                margin={{ top: 'xsmall', bottom: 'none' }}
              >
                {name}
              </Heading>
              <Paragraph size="xlarge" textAlign="center">
                {description}
              </Paragraph>
              <Box align="center" margin={{ top: 'medium' }}>
                {/* Only buttons are clickable now */}
                {name === 'Design' && (
                  <Button
                    secondary
                    size="large"
                    label="Start designing"
                    href="/foundation/designer-guidance"
                  />
                )}
                {name === 'Develop' && (
                  <Button
                    secondary
                    size="large"
                    label="Start coding"
                    href="/foundation/developer-guidance"
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </PageContent>
  );
};

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
