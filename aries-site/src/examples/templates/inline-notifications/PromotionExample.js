import { Page, PageContent, PageHeader } from 'grommet';

import { Card } from '../../templates/Card';

export const PromotionExample = () => {
  return (
    <Page>
      <PageContent>
        <PageHeader title="Services" />
      </PageContent>
    </Page>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <Card
      title={service.title}
      description={service.description}
      icon={service.icon}
      actions={service.actions}
    />
  );
};
