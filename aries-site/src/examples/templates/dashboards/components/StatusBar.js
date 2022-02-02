import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Menu, NameValueList, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';

export const StatusBar = ({ children, title, ...rest }) => (
  <Card {...rest}>
    <CardHeader>
      <Text size="xlarge" color="text-strong" weight="bold">
        {title}
      </Text>
      <Menu
        icon={<MoreVertical />}
        items={[
          { label: 'Move', onClick: () => {} },
          { label: 'Share', onClick: () => {} },
        ]}
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    </CardHeader>
    <CardBody>
      <NameValueList
        valueProps={{ width: 'xsmall' }}
        pairProps={{ direction: 'column' }}
        layout="grid"
      >
        {children}
      </NameValueList>
    </CardBody>
  </Card>
);

StatusBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
};
