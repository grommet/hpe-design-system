import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Footer } from 'grommet';
import { ChildHeader } from './ChildHeader';

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
  level,
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
          level={level}
          name={name}
          open={open}
          summary={valuesSummary}
        />
      </Button>
      <Collapsible open={open}>
        <Box pad={{ horizontal: 'small' }}>{children}</Box>
        <Footer
          justify="end"
          pad={{
            horizontal: 'xsmall',
            vertical: 'small',
          }}
        >
          {onRemove && (
            <Button
              label="Remove"
              aria-label={`Remove ${name || index}`}
              onClick={() => onRemove(index)}
            />
          )}
        </Footer>
      </Collapsible>
    </>
  );
};

FormChildObject.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  open: PropTypes.bool,
  summarize: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.object.isRequired,
};
