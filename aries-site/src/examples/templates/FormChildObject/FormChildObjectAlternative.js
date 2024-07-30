import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Grid } from 'grommet';
import { Trash } from 'grommet-icons';
import { ChildHeader } from './ChildHeader';
import { getSummaryString } from './FormChildObject';

export const FormChildObjectAlternative = ({
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
    <Grid
      rows={['auto', 'auto']}
      columns={['flex', 'auto']}
      areas={[
        { name: 'button', start: [0, 0], end: [0, 0] },
        { name: 'trash', start: [1, 0], end: [1, 0] },
        { name: 'collapsible', start: [0, 1], end: [0, 1] },
      ]}
    >
      <Button gridArea="button" onClick={onClick}>
        <ChildHeader
          collectionName={collectionName}
          index={index}
          headingLevel={headingLevel}
          name={name}
          open={open}
          summary={valuesSummary}
        />
      </Button>
      <Collapsible gridArea="collapsible" open={open}>
        <Box pad="small">{children}</Box>
      </Collapsible>
      <Button
        gridArea="trash"
        margin={{ top: 'xsmall' }}
        alignSelf="start"
        icon={<Trash />}
        aria-label={`Remove ${name || index}`}
        onClick={() => onRemove(index)}
      />
    </Grid>
  );
};

FormChildObjectAlternative.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  headingLevel: PropTypes.number.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  open: PropTypes.bool,
  summarize: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string, showName: PropTypes.bool }),
    ]),
  ),
  values: PropTypes.object.isRequired,
};
