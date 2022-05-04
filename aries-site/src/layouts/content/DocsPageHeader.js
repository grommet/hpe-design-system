import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Button, Heading, PageHeader, Text } from 'grommet';
import { getPageDetails } from '../../utils';
import { Status, SubsectionText } from '../../components';

export const DocsPageHeader = ({ title, topic, render }) => {
  const page = getPageDetails(title);
  const parent = topic && getPageDetails(topic);

  return (
    <PageHeader
      title={
        <Heading size="medium" margin="none" fill>
          {render || title}
        </Heading>
      }
      parent={
        <Link href={`/${topic.toLowerCase()}`} passHref>
          <Button>
            <Box align="center" direction="row" gap="small">
              {parent.icon('small', parent.color)}
              <Text color="text">{parent.name}</Text>
            </Box>
          </Button>
        </Link>
      }
      subtitle={<SubsectionText>{page.description}</SubsectionText>}
      margin={{ bottom: 'small' }}
    >
      {page.status && <Status status={page.status} />}
    </PageHeader>
  );
};

DocsPageHeader.propTypes = {
  render: PropTypes.string,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
};
