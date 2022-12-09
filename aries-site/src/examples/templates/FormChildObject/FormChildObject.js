import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapsible,
  Footer,
  Heading,
  Header,
  Text,
} from 'grommet';
import { useKeyboard } from 'grommet/utils';
import { FormUp, FormDown } from 'grommet-icons';

const getSummaryString = (values, keys) => {
  let summary = '';
  Object.entries(values).forEach(([key, value]) => {
    summary +=
      keys.includes(key) && value.length > 0 ? `${key}: ${value}, ` : '';
  });
  summary = summary.slice(0, -2);
  return summary;
};

export const FormChildObject = ({
  children,
  collectionName,
  index,
  level,
  name,
  onRemove,
  open: openProp = false,
  summarize,
  values,
}) => {
  const [open, setOpen] = useState(openProp);
  const [background, setBackground] = useState(null);
  const usingKeyboard = useKeyboard();

  const borderStyle = { side: 'top', color: 'border-weak' };

  const valuesSummary = summarize ? getSummaryString(values, summarize) : null;

  return (
    <Box
      border={borderStyle}
      onBlur={event => {
        if (usingKeyboard && !event.currentTarget.contains(event.relatedTarget))
          setOpen(false);
      }}
    >
      <Button onClick={() => setOpen(!open)}>
        <ChildHeader
          background={background}
          collectionName={collectionName}
          height={{ min: 'xxsmall' }}
          index={index}
          level={level}
          name={name}
          open={open}
          summary={valuesSummary}
          onMouseEnter={() => setBackground('background-contrast')}
          onMouseLeave={() => setBackground(null)}
          pad={{
            horizontal: 'small',
            vertical: 'small',
          }}
        />
      </Button>
      <Collapsible open={open}>
        <Box pad={{ horizontal: 'small' }}>{children}</Box>
        <Footer
          pad={{
            horizontal: 'xsmall',
            vertical: 'small',
          }}
        >
          <></>
          <Button
            label="Remove"
            aria-label={`Remove ${name ? name : index}`}
            onClick={() => onRemove(index)}
          />
        </Footer>
      </Collapsible>
    </Box>
  );
};

FormChildObject.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  open: PropTypes.bool,
  summarize: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.object.isRequired,
};

const ChildHeader = ({
  collectionName,
  index,
  level,
  name,
  open,
  summary,
  ...rest
}) => {
  return (
    <Header {...rest}>
      <>
        <Heading
          level={level}
          size="small"
          margin="none"
          color="text"
          weight={500}
        >
          {name || `${collectionName} ${index}`}
        </Heading>
        {summary && <Text truncate>{summary}</Text>}
      </>
      {open ? (
        <FormUp a11yTitle="Hide detail" />
      ) : (
        <FormDown a11yTitle="Show detail and edit" />
      )}
    </Header>
  );
};

ChildHeader.propTypes = {
  collectionName: PropTypes.string,
  index: PropTypes.number,
  level: PropTypes.number,
  name: PropTypes.string,
  open: PropTypes.bool,
  summary: PropTypes.string,
};
