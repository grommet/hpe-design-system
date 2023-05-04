import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Anchor, PageHeader } from 'grommet';
import { FormPrevious } from 'grommet-icons';
import { getPageDetails, nameToPath } from '../../utils';
import { Status, SubsectionText } from '../../components';

export const DocsPageHeader = ({ title, topic, render }) => {
  const page = getPageDetails(title);
  const parent = topic && getPageDetails(topic);

  return (
    <PageHeader
      title={render || title}
      parent={
        page.parentPage ? (
          <Link href={nameToPath(page.parentPage)} passHref>
            <Anchor label={parent.name} icon={<FormPrevious />} />
          </Link>
        ) : (
          <Link href={`/${topic.toLowerCase()}`} passHref>
            <Anchor
              icon={parent.icon('small', parent.color)}
              label={parent.name}
            />
          </Link>
        )
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
