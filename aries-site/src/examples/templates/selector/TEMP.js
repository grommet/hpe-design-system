import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Heading, List, Text } from 'grommet';
import { User, SettingsOption, Analytics, Grow, Spa, Gem } from 'grommet-icons';
import { SelectorGroup, Selector } from 'aries-core';

const data = [
  {
    value: 'option 1',
    title: 'Option 1',
    description: 'This is a description.',
    icon: <User height="medium" />,
  },
  {
    value: 'option 2',
    title: 'Option 2',
    description: 'This is a description.',
    icon: <SettingsOption height="medium" />,
  },
  {
    value: 'option 3',
    title: 'Option 3',
    description: 'This is a description.',
    icon: <Analytics height="medium" />,
  },
];

const supportOptions = [
  {
    value: 'option 1',
    title: 'Support request',
  },
  {
    value: 'option 2',
    title: 'Question',
  },
  {
    value: 'option 3',
    title: 'Email me',
  },
];

const MiniSelector = ({ value, title, indicator = false }) => {
  return (
    <Selector
      value={value}
      title={<Text size="small">{title}</Text>}
      indicator={indicator}
      pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
      round="xxlarge"
      margin={{ bottom: '3xsmall' }}
    />
  );
};

MiniSelector.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const ProductSelector = ({ children, value, title, icon, price }) => {
  return (
    <Selector value={value} indicator={false}>
      <Box
        align="center"
        justify="between"
        gap="medium"
        pad="xsmall"
        flex="grow"
      >
        <Box align="center" gap="3xsmall">
          {icon}
          <Text color="text-strong" weight={500} size="xxlarge">
            {title}
          </Text>
          <Box>{children}</Box>
        </Box>
        <Text color="text-strong" weight={500} size="large">
          {price}
        </Text>
      </Box>
    </Selector>
  );
};

ProductSelector.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  price: PropTypes.string,
};

export const TEMP = () => {
  const [selected, setSelected] = useState();
  return (
    <Box pad="xlarge" gap="xlarge">
      <Text>uncontrolled configurable</Text>
      <SelectorGroup>
        {data.map(datum => (
          <Selector
            key={datum.value}
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          />
        ))}
      </SelectorGroup>
      <Text>uncontrolled configurable with children</Text>
      <SelectorGroup>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <Text>controlled</Text>
      <SelectorGroup
        defaultValue="option 2"
        value={selected}
        onSelect={e => setSelected(e.value)}
      >
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <Text>multiple</Text>
      <SelectorGroup multiple>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <SelectorGroup multiple>
        <Selector value="option4">Option 1</Selector>
        <Selector value="option5">Option 2</Selector>
        <Selector value="option6">Option 3</Selector>
      </SelectorGroup>
      <Text>Without indicator</Text>
      <SelectorGroup multiple>
        {data.map(datum => (
          <Selector
            value={datum.value}
            icon={datum.icon}
            title={datum.title}
            description={datum.description}
            indicator={false}
          >
            <Box border={{ style: 'dashed' }} fill>
              Children
            </Box>
          </Selector>
        ))}
      </SelectorGroup>
      <SelectorGroup>
        <Selector indicator={false} value="option4">
          Option 1
        </Selector>
        <Selector indicator={false} value="option5">
          Option 2
        </Selector>
        <Selector indicator={false} value="option6">
          Option 3
        </Selector>
      </SelectorGroup>
      <>
        <Heading level={4}>
          Menu of dynamic options within a support chat experience
        </Heading>
        <SelectorGroup layout="fit" gap="3xsmall">
          {supportOptions.map(datum => (
            <MiniSelector
              key={datum.value}
              value={datum.value}
              title={datum.title}
            />
          ))}
        </SelectorGroup>
      </>
      <>
        <Heading level={4}>
          Menu of many dynamic options within a support chat experiencew which
          we wouldn't want to do but we are stress testing
        </Heading>
        <SelectorGroup layout="fit" gap="3xsmall">
          {supportOptions.map((datum, index) => (
            <MiniSelector key={index} value={datum.value} title={datum.title} />
          ))}
          {supportOptions.map((datum, index) => (
            <MiniSelector
              key={index * 2}
              value={datum.value}
              title={datum.title}
            />
          ))}
          {supportOptions.map((datum, index) => (
            <MiniSelector
              key={index * 3}
              value={datum.value}
              title={datum.title}
            />
          ))}
        </SelectorGroup>
      </>
      <>
        <Heading level={4}>
          Choice chips, perhaps for filtering in a space with limited real
          estate (this needs some work, but hopefully you get the idea where we
          might go. Don't let it hold up PR)
        </Heading>
        <SelectorGroup multiple layout="fit" gap="3xsmall">
          {supportOptions.map(datum => (
            <MiniSelector
              key={datum.value}
              value={datum.value}
              title={datum.title}
              indicator={{ round: 'full', size: 'medium' }}
            />
          ))}
        </SelectorGroup>
      </>
      <>
        <Heading level={4}>Rich menu, such as selecting a product tier</Heading>
        <SelectorGroup>
          <ProductSelector
            value="option1"
            title="Sprout"
            icon={<Grow size="xxlarge" />}
            price="Free forever"
          >
            <List
              data={['Some features', '1,000 API credits per month']}
              defaultItemProps={{ pad: 'none', align: 'center' }}
            >
              {item => <Text>{item}</Text>}
            </List>
          </ProductSelector>
          <ProductSelector
            value="option2"
            title="Zen"
            icon={<Spa size="xxlarge" />}
            price="$20/month per user"
          >
            <List
              data={[
                'All Sprout features',
                'Increased API credits',
                'Preferred support',
              ]}
              defaultItemProps={{ pad: 'none', align: 'center' }}
            >
              {item => <Text>{item}</Text>}
            </List>
          </ProductSelector>
          <ProductSelector
            value="option3"
            title="Enlightenment"
            icon={<Gem size="xxlarge" />}
            price="Contact us*"
          >
            <List
              data={[
                'All Zen features',
                'Quarterly business review',
                'Custom onboarding',
                'Dedicated support',
              ]}
              defaultItemProps={{ pad: 'none', align: 'center' }}
            >
              {item => <Text>{item}</Text>}
            </List>
          </ProductSelector>
        </SelectorGroup>
      </>
    </Box>
  );
};
