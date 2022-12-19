import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible } from 'grommet';
import { Trash } from 'grommet-icons';
import { ChildHeader } from './ChildHeader';

// using value names from summarize prop, builds the summary message
// to be displayed beneath the heading
const getSummaryString = (values, keys) => {
  let summary = '';
  Object.entries(values).forEach(([key, value]) => {
    summary +=
      keys.includes(key) && (value.length > 0 || typeof value === 'number')
        ? `${key}: ${value}, `
        : '';
  });
  summary = summary.slice(0, -2);
  return summary;
};

export const FormChildObject = ({
  children,
  collectionName,
  index,
  headingLevel,
  name,
  onClick: onClickProp,
  onRemove,
  open: openProp = false,
  summarize,
  values,
}) => {
  const [open, setOpen] = useState(openProp);
  const valuesSummary = summarize ? getSummaryString(values, summarize) : null;
  const onClick = () => onClickProp || setOpen(!open);

  return (
    <>
      <Button onClick={onClick}>
        <ChildHeader
          collectionName={collectionName}
          index={index}
          headingLevel={headingLevel}
          name={name}
          open={open}
          summary={valuesSummary}
        />
      </Button>
      <Collapsible open={open}>
        <Box pad="small">{children}</Box>
        <Box pad={{ bottom: 'medium' }}>
          {onRemove && (
            <Button
              alignSelf="end"
              icon={<Trash />}
              aria-label={`Remove ${name || index}`}
              onClick={() => onRemove(index)}
            />
          )}
        </Box>
      </Collapsible>
    </>
  );
};

FormChildObject.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  headingLevel: PropTypes.number.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  open: PropTypes.bool,
  summarize: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.object.isRequired,
};
