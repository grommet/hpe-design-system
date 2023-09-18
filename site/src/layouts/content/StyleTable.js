import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  ResponsiveContext,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { TextEmphasis } from 'library';
import { Annotation } from './Annotation';

const columns = [
  { property: 'label', render: 'Label' },
  { property: 'property', render: 'Property' },
  { property: 'value', render: 'Value' },
];

export const StyleTable = ({ data }) => {
  const breakpoint = useContext(ResponsiveContext);
  return !['large', 'xlarge'].includes(breakpoint) ? (
    <Card
      alignSelf="start"
      elevation="none"
      pad={{ top: 'small', horizontal: 'medium', bottom: 'medium' }}
      width="medium"
    >
      {/* style tag is necessary in order for table not 
    to exceed container width */}
      <Table style={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHeader>
          <TableRow>
            {columns.map(c => (
              <TableCell
                border="bottom"
                key={c.property}
                scope="col"
                pad={{ vertical: 'small' }}
              >
                <TextEmphasis>{c.render}</TextEmphasis>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datum, index) => (
            <TableRow key={index}>
              {columns.map(c => (
                <TableCell key={c.property} pad={{ vertical: 'xsmall' }}>
                  {c.property === 'label' ? (
                    <Annotation target={datum[c.property]} kind="style" />
                  ) : (
                    <Text>{datum[c.property]}</Text>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ) : null;
};

StyleTable.propTypes = {
  data: PropTypes.array,
};
