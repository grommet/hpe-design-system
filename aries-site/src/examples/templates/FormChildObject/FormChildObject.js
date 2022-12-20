import { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible } from 'grommet';
import { useKeyboard } from 'grommet/utils';
import { Trash } from 'grommet-icons';
import { ChildHeader } from './ChildHeader';
import { FormChildObjectsContext } from './FormChildObjects';
// using value names from summarize prop, builds the summary message
// to be displayed beneath the heading
const getSummaryString = (values, keys) => {
  let summary = '';
  const summarize = new Map();
  for (let i = 0; i <= keys.length - 1; i += 1) {
    if (typeof keys[i] === 'object') {
      summarize.set(keys[i].name, keys[i].showName !== false);
    } else {
      summarize.set(keys[i], true);
    }
  }

  // create flat array of just keys from Map
  const flattenedKeys = [...summarize.keys()];
  Object.entries(values).forEach(([key, value]) => {
    summary +=
      flattenedKeys.includes(key) &&
      (value.length > 0 || typeof value === 'number')
        ? // if the showName value for a key is true, include it
          `${summarize.get(key) ? `${key}: ` : ''}${value}, `
        : '';
  });
  summary = summary.slice(0, -2);
  return summary;
};

// determine if focus is within a drop
const dropContainsFocus = event => {
  let dropParent;
  let node = event.relatedTarget;
  // if focused element is contained inside a drop, there will be a parent
  // in the tree that has `data-g-portal-id`
  while (!dropParent && node?.offsetParent) {
    if (node?.attributes.getNamedItem('data-g-portal-id')) dropParent = true;
    node = node.offsetParent;
  }
  if (node?.attributes.getNamedItem('data-g-portal-id')) dropParent = true;

  return dropParent;
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
  const { setActiveIndex } = useContext(FormChildObjectsContext);
  const [open, setOpen] = useState(openProp);
  useEffect(() => setOpen(openProp), [openProp]);
  const valuesSummary = summarize ? getSummaryString(values, summarize) : null;
  const onClick = () => {
    if (onClickProp) onClickProp();
    else {
      if (!open) setActiveIndex(index);
      setOpen(!open);
    }
  };
  const ref = useRef();
  const usingKeyboard = useKeyboard();

  return (
    <Box
      ref={ref}
      onBlur={event => {
        if (usingKeyboard && !ref.current.contains(event.relatedTarget)) {
          setOpen(!!dropContainsFocus(event));
        }
      }}
    >
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
    </Box>
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
  summarize: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string, showName: PropTypes.bool }),
    ]),
  ),
  values: PropTypes.object.isRequired,
};
