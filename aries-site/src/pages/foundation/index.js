import React from 'react';
import { Box } from 'grommet';

import { PageLayout, NavPage, SideBarItemList } from '../../layouts';
import { DescriptiveHeader } from '../../components/headings';

import { data } from '../../components/home';

const title = 'Foundation';
const prefix = title.toLowerCase();

const Foundation = () => {
  const titleObject = data[title];
  return (
    <PageLayout title={title} isLanding>
      <Box margin="large">
        <DescriptiveHeader
          background={titleObject.color}
          subText={titleObject.subTitle}
          icon={titleObject.icon}
          title={title}
        />
        <NavPage items={SideBarItemList[prefix]} prefix={prefix} />
      </Box>
    </PageLayout>
  );
};

export default Foundation;
